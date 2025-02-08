import {create} from 'zustand'
import { IMessage, IUser } from '../interfaces/interface'
import { axiosInstance } from '../configs/axios';
import {io} from 'socket.io-client'

interface ChatStore{
    users : IUser[],
    getUsers : ()=>Promise<void>
    error : null | string;
    isLoading: boolean;
    socket : any;
    isConnected : boolean;
    onlineUsers : Set<string>;
    getOnlineUsers : ()=>Promise<void>,
    userActivities : Map<string , string>,
    messages : IMessage[],
    initSocket : (userId : string)=>void,
    disconnectSocket : ()=>void
    sendMessage : (senderId : string, receiverId : string , content : string) => void
}

const baseURL = "http://localhost:5000"

const socket = io(baseURL , {
    autoConnect : false,
    withCredentials : true
})

export const useChatStore = create<ChatStore>((set , get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: null,
    isConnected: false,
    onlineUsers: new Set<string>(),
    userActivities: new Map<string, string>(),
    messages: [],
    getUsers: async () => {
        try {
            set({ isLoading: true });
            const res = await axiosInstance.get('/users' , {
                withCredentials: true,
            });
            if (!res.data.success) throw new Error('Failed To Fetch Users');
            set({ users: res.data.data, error: null, isLoading: false });
        } catch (error : any) {
            set({ error: error.message });
        }finally{
            set({ isLoading: false });
        }
    },
    getOnlineUsers: async () => {},
    initSocket: (userId : string) => {
        if (!get().isConnected){
            socket.auth = {userId}
            socket.connect();
            socket.emit('user_connected', userId);
            socket.on('online_users' , (users : string[])=>{
                set({onlineUsers : new Set(users)})
            })
            socket.on('activities', (activities: [string , string][]) => {
                set({userActivities : new Map(activities)})
            })
            socket.on('user_connected' , (userId : string)=>{
                set((state)=>({
                    onlineUsers : new Set([...state.onlineUsers , userId])
                }))
            })
            socket.on('user_disconnected' , (userId : string)=>{
              set((state)=>{
                const newOnlineUsers = new Set(state.onlineUsers)
                newOnlineUsers.delete(userId)
                return {
                  onlineUsers : newOnlineUsers
                }
              })
            })
            socket.on('receive_message' , (message : IMessage) => {
                set((state)=>({
                  messages : [...state.messages, message]
                }))
            })
            socket.on('message_sent' , (message : IMessage)=>{
                set((state)=>({
                  messages : [...state.messages, message]
                }))
            })
            socket.on('activity_updated' , ({userId , activity})=>{
                set((state)=>{
                  const newActivities = new Map(state.userActivities)
                  newActivities.set(userId, activity)
                  return {
                    userActivities : newActivities
                  }
                })
            })
            set({ isConnected: true });
        }
    },

    disconnectSocket: () => {
        if (get().isConnected){
            socket.disconnect();
            set({ isConnected: false });
        }
    },
    sendMessage: async (senderId : string, receiverId : string, content : string) => {
        const socket = get().socket
        if (!socket) return
        socket.emit('send_message', { senderId, receiverId, content });
    }
}))