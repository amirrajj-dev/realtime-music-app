import{create} from 'zustand'
import { IUser } from '../interfaces/interface'
import { axiosInstance } from '../configs/axios';

interface ChatStore{
    users : IUser[],
    getUsers : ()=>Promise<void>
    error : null | string;
    isLoading: boolean;
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
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
}))