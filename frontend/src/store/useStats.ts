import {create} from 'zustand'
import { axiosInstance } from '../configs/axios';

interface StatsStore {
    albumsCount: number;
    songsCount: number;
    artistsCount: number;
    usersCount: number;
    getStats : ()=>Promise<void>
}

export const useStatsStore = create<StatsStore>((set)=>({
    albumsCount: 0,
    songsCount: 0,
    artistsCount: 0,
    usersCount: 0,
    getStats: async () => {
        try {
            const res = await axiosInstance.get('/stats' , {
                withCredentials : true
            });
            if (res.data.success){
                set({
                    albumsCount: res.data.data.albumsCount,
                    songsCount: res.data.data.songsCount,
                    artistsCount: res.data.data.artistsCount,
                    usersCount: res.data.data.usersCount
                })
            }else{
                throw new Error('failed to fetch stats')
            }
        } catch (error : any) {
            console.error(error.message);
        }
    }
}))