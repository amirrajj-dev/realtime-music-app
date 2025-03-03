import { create } from "zustand";
import { IMessage, IUser } from "../interfaces/interface";
import { axiosInstance } from "../configs/axios";
import { io, Socket } from "socket.io-client";

interface ChatStore {
  users: IUser[];
  getUsers: () => Promise<void>;
  error: null | string;
  isLoading: boolean;
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  getOnlineUsers: () => Promise<void>;
  userActivities: Map<string, string>;
  selectedUser: IUser | null;
  setSelectedUser: (user: IUser) => void;
  messages: IMessage[];
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
}

const baseURL = import.meta.env.MODE === "production" 
  ? "https://realtime-music-app.onrender.com"
  : "http://localhost:5000";

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,

  setSelectedUser: (user) => set(() => ({ selectedUser: user })),

  getUsers: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/users", { withCredentials: true });
      if (!res.data.success) throw new Error("Failed To Fetch Users");

      set({ users: res.data.data, error: null, isLoading: false }); 
    } catch (error: any) {
      set({ error: error.message, isLoading: false }); 
    }
  },

  getOnlineUsers: async () => {},

  initSocket: (userId: string) => {
    if (get().isConnected) return;
  
    const socket = io(baseURL, { autoConnect: false, withCredentials: true });
  
    socket.auth = { userId } as { userId: string };
  
    socket.connect();
    socket.emit("user_connected", userId);
  
    socket.on("online_users", (users: string[]) => {
      set(() => ({ onlineUsers: new Set(users) }));
    });
  
    socket.on("activities", (activities: [string, string][]) => {
      console.log(activities);
      set({ userActivities: new Map(activities) });
    });
  
    socket.on("user_connected", (newUserId: string) => {
      set((state) => {
        const updatedUsers = new Set(state.onlineUsers);
        updatedUsers.add(newUserId);
        return { onlineUsers: updatedUsers };
      });
    });
  
    socket.on("user_disconnected", (disconnectedUserId: string) => {
      set((state) => {
        const updatedUsers = new Set(state.onlineUsers);
        updatedUsers.delete(disconnectedUserId);
        return { onlineUsers: updatedUsers };
      });
    });
  
    socket.on("new_message", (newMessage: IMessage) => {
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  
    socket.on("activities_updated", ({ userId, activity }) => {
      console.log(activity);
      set((state) => {
        const updatedActivities = new Map(state.userActivities);
        updatedActivities.set(userId, activity);
        return { userActivities: updatedActivities };
      });
    });
  
    set({ socket, isConnected: true });
  },  

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ isConnected: false, socket: null });
    }
  },

  sendMessage: (senderId: string, receiverId: string, content: string) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("send_message", { senderId, receiverId, content });
  },

  fetchMessages: async (userId: string) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/users/messages/${userId}`, {
        withCredentials: true,
      });
      console.log('get messges =>' , res);
      if (!res.data.success) throw new Error("Failed To Fetch Messages");
      set(() => ({
        messages: res.data.data,
        error: null,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
