import { create } from 'zustand';
import { ISong } from '../interfaces/interface';

interface PlayerStore {
  currentSong: ISong | null;
  isPlaying: boolean;
  isShuffle: boolean;
  shuffledSongs : ISong[];
  songs: ISong[];
  currentIndex: number;
  currentTime : number;
  setCurrentTime : (time : number)=>void;
  duration : number;
  setDuration : (time : number)=>void;
  setSongs: (songs: ISong[]) => void;
  setCurrentSong: (song: ISong) => void;
  togglePlay: () => void;
  playSong: (song: ISong) => void;
  pauseSong: () => void;
  playAlbum: (songs: ISong[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleShuffle: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  isShuffle: false,
  songs: [],
  shuffledSongs : [],
  currentIndex: -1,
  currentTime: 0,
  duration: 0,
  setCurrentTime: (time) => {
    set({ currentTime: time });
  },
  setDuration: (duration) => {
    set({ duration });
  },
  setSongs: (songs) => {
    set({
      songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  setCurrentSong: (song) => {
    if (!song) return;
    const { currentSong, isPlaying } = get();
    if (currentSong?._id === song._id) {
      set({ isPlaying: !isPlaying });
    } else {
      const currentSongIndex = get().songs.findIndex((s) => s._id === song._id);
      set({
        currentSong: song,
        currentIndex: currentSongIndex !== -1 ? currentSongIndex : get().currentIndex,
        isPlaying: true,
      });
    }
  },
  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
  playSong: (song) => {
    set({ currentSong: song, isPlaying: true });
  },
  pauseSong: () => {
    set({ isPlaying: false });
  },
  playNext: () => {
    const { currentIndex, songs , isShuffle , shuffledSongs } = get();
    const playlist = isShuffle && shuffledSongs.length ? shuffledSongs : songs;
    console.log(isShuffle , shuffledSongs.length);
    if (!playlist.length) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextSong = playlist[nextIndex];
    set({
      currentIndex: nextIndex,
      currentSong: nextSong,
      isPlaying: true,
    });
  },
  playPrevious: () => {
    const { currentIndex, songs ,  isShuffle , shuffledSongs } = get();
    const playlist = isShuffle && shuffledSongs.length ? shuffledSongs : songs;
    if (!playlist.length) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    const prevSong = playlist[prevIndex];
    set({
      currentIndex: prevIndex,
      currentSong: prevSong,
      isPlaying: true,
    });
  },
  playAlbum: (songs: ISong[], startIndex = 0) => {
    if (!songs.length) return;
    set({
      songs,
      currentSong: songs[startIndex],
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  toggleShuffle: () => {
    set((state) => {
      const isShuffle = !state.isShuffle;
      if (isShuffle) {
        const shuffled = [...state.songs].sort(() => Math.random() - 0.5);
        set({ shuffledSongs: shuffled });
      } else {
        set({ shuffledSongs: [] });
      }
      return { isShuffle };
    });
  },
}));