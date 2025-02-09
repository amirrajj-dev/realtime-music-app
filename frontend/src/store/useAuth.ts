import { create } from 'zustand';
import { IUser } from '../interfaces/interface';
import { axiosInstance } from '../configs/axios';

interface AuthStore {
  user: IUser | null;
  signin: (user: Pick<IUser, 'email' | 'password'>) => Promise<void | {success : boolean , error? : string | null}>;
  logout: () => Promise<void | {success : boolean}>;
  signup: (user: IUser) => Promise<{success : boolean , message? : string}>;
  isAuthenticated: () => boolean;
  getCurrentUser : ()=>void,
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  isAdmin : boolean;
  checkIsAdmin : ()=>Promise<void>
}

export const useAuthStore = create<AuthStore>((set , get) => ({
  error: null,
  isLoading: false,
  isAdmin: false,
  user: null,
  signin: async (user) => {
    try{
      set({isLoading : true})
      const res = await axiosInstance.post('/auth/signin' , user , {
        withCredentials : true
      })
      if(res.data.success){
        set({user : res.data.data , isLoading : false , error : null})
        get().checkIsAdmin() //check if user is admin or not
        return {
          success : true
        }
      }else{
        throw new Error('failed to sign in :(')
      }
    }catch(error : any){
      set({error : error.response.data.message || error.message})
      return {
        success : false,
        error : get().error
      }
    }finally{
      set({isLoading : false})
    }
  },
  logout: async () => {
    try {
      set({isLoading: true})
      const res = await axiosInstance.post('/auth/signout' , {} , {
        withCredentials : true
      })
      if (res.data.success) {
        set({ user: null, error: null, isLoading: false , isAdmin : false });
        return {
            success : true
        }
      } else {
        throw new Error(res.data.message);
      }
    } catch (error : any) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, isLoading: false });
    }finally{
      set({ isLoading: false });
    }
  },
  signup: async (user) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post('/auth/signup', user , {
        withCredentials : true
      });
      if (res.data.success) {
        set({ user: res.data.user, error: null, isLoading: false });
        return {
            success : true
        }
      } else {
       throw new Error(res.data.message)
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, isLoading: false });
      return {
        success : false,
        message : errorMessage
      }
    }
  },
  isAuthenticated: () => false,
  setError: (error) => set((state) => ({ ...state, error })),
  getCurrentUser : async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get('/users/curentuser' , {
        withCredentials : true
      });
      if (res.data.success){
        set({ user: res.data.data, error: null , isLoading: false });
      }else{
        set({ error: res.data.message });
      }
      
    } catch (error : any) {
      set({ error: error.message });
    }finally {
      set({ isLoading: false });
    }
  },
  checkIsAdmin : async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get('/admin/check-Admin' , {
        withCredentials : true
      });
      if (res.data.success){
        set({ isAdmin: true });
      }else{
        throw new Error('you are not an admin')
      }
    } catch (error : any) {
      set({ error: error.message });
    }finally{
      set({ isLoading: false });
    }
  }
}));