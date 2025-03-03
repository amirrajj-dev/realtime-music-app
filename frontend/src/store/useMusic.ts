import { create } from "zustand";
import { IAlbum, ISong } from "../interfaces/interface";
import { axiosInstance } from "../configs/axios";

interface SongStore {
  songs: ISong[];
  albums: IAlbum[];
  mainAlbum : IAlbum | null;
  getAlbums: () => Promise<void>;
  getAlbumById : (id : string) => Promise<void>;
  getSongs : ()=>Promise<void>
  featuredSongs : ISong[];
  getFeaturedSongs : () => Promise<void>;
  trendingSongs : ISong[];
  getTrendingSongs : () => Promise<void>;
  madeForYouSongs : ISong[];
  getMadeForYouSongs : () => Promise<void>;
  error: null | string;
  isLoading: boolean;
  deleteSong : (id : string) => Promise<{message : string , success : boolean}>;
  deleteAlbum : (id : string) => Promise<{message : string , success : boolean}>;
}

export const useMusicStore = create<SongStore>((set) => ({
  songs: [],
  albums: [],
  featuredSongs : [],
  madeForYouSongs : [],
  trendingSongs : [],
  mainAlbum : null,
  error: null,
  isLoading: false,
  getAlbums: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/albums`);
      if (!res.data.success) throw new Error("Failed to fetch songs");
      const data = res.data.data;
      set({ albums: data, isLoading: false });
      set({ songs: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }finally{
        set({ isLoading: false });
    }
  },
  getAlbumById: async (id: string) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/albums/${id}`);
      if (!res.data.success) throw new Error("Failed to fetch songs");
      const data = res.data.data;
      set({ mainAlbum: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    } finally{
        set({ isLoading: false });
    }
  },
  getFeaturedSongs : async()=> {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/songs/featured-songs`);
      if (!res.data.success) throw new Error("Failed to fetch featured songs");
      const data = res.data.data;
      set({ featuredSongs: data, isLoading: false });
    } catch (error : any) {
      set({ error: error.message, isLoading: false });
    }finally{
      set({isLoading : false})
    }
  },
  getMadeForYouSongs : async()=> {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/songs/made-for-you-songs`);
      if (!res.data.success) throw new Error("Failed to fetch made for you songs");
      const data = res.data.data;
      set({ madeForYouSongs: data, isLoading: false });
    } catch (error : any) {
      set({ error: error.message, isLoading: false });
    }finally{
      set({isLoading : false})
    }
  },
  getTrendingSongs : async ()=> {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/songs/trending-songs`);
      if (!res.data.success) throw new Error("Failed to fetch trending songs");
      const data = res.data.data;
      set({ trendingSongs: data, isLoading: false });
    } catch (error : any) {
      set({ error: error.message, isLoading: false });
    }finally{
      set({isLoading : false})
    }
  }, 
  getSongs : async ()=> {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/songs` , {
        withCredentials : true
      });
      if (!res.data.success) throw new Error("Failed to fetch songs");
      const data = res.data.data;
      set({ songs: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }finally{
      set({ isLoading: false });
    }
  } ,
  deleteSong : async (id : string)=>{
    try {
      if (!id){
      throw new Error('no id has been provided');
      }
      const res = await axiosInstance.delete(`/admin/delete-song/${id}` , {

        withCredentials : true
      })
      if (!res.data.success) throw new Error('Failed to delete song');
      return {
        message : res.data.message,
        success : res.data.success
      }
    } catch (error : any) {
      return {
        message : error.message,
        success : false
      }
    }
  },
  deleteAlbum : async (id : string)=>{
    try {
      if (!id){
      throw new Error('no id has been provided');
      }
      const res = await axiosInstance.delete(`/admin/delete-album/${id}` , {
        withCredentials : true
      })
      if (!res.data.success) throw new Error('Failed to delete album');
      return {
        message : res.data.message,
        success : res.data.success
      }
    } catch (error : any) {
      return {
        message : error.message,
        success : false
      }
    }
  }
}));
