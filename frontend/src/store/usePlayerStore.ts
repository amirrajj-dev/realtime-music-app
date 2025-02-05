import { create } from 'zustand';
import { ISong } from '../interfaces/interface';

interface PlayerStore {
  currentSong: ISong | null;
  isPlaying: boolean;
  songs: ISong[];
  currentIndex: number;
  setSongs: (songs: ISong[]) => void;
  setCurrentSong: (song: ISong) => void;
  togglePlay: () => void;
  playSong: (song: ISong) => void;
  pauseSong: () => void;
  playAlbum: (songs: ISong[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  songs: [],
  currentIndex: -1,
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
    const { currentIndex, songs } = get();
    if (!songs.length) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    set({
      currentIndex: nextIndex,
      currentSong: nextSong,
      isPlaying: true,
    });
  },
  playPrevious: () => {
    const { currentIndex, songs } = get();
    if (!songs.length) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIndex];
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
}));