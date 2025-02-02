import { create } from "zustand";
import { IAlbum, ISong } from "../interfaces/interface";
import { axiosInstance } from "../configs/axios";

interface SongStore {
  songs: ISong[];
  albums: IAlbum[];
  mainAlbum : IAlbum | null;
  getAlbums: () => Promise<void>;
  getAlbumById : (id : string) => Promise<void>;
  error: null | string;
  isLoading: boolean;
}

export const useMusicStore = create<SongStore>((set) => ({
  songs: [],
  albums: [],
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
  }
}));
