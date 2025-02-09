import { create } from 'zustand';
import { ISong } from '../interfaces/interface';
import { useChatStore } from './useChat';

interface PlayerStore {
  currentSong: ISong | null;
  isPlaying: boolean;
  isShuffle: boolean;
  shuffledSongs: ISong[];
  songs: ISong[];
  repeatMode: 'off' | 'one' | 'all';
  currentIndex: number;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  setSongs: (songs: ISong[]) => void;
  setCurrentSong: (song: ISong) => void;
  togglePlay: () => void;
  playSong: (song: ISong) => void;
  pauseSong: () => void;
  playAlbum: (songs: ISong[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleShuffle: () => void;
  setRepeatMode: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  isShuffle: false,
  repeatMode: 'off',
  songs: [],
  shuffledSongs: [],
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
    const socket = useChatStore.getState().socket
    if (socket?.auth && "userId" in socket.auth){
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity: `${song.title} - ${song.artist}`
      })
    }
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
    const isPlaying = !get().isPlaying
    const socket = useChatStore.getState().socket
    const currentSong = get().currentSong
    if (socket?.auth && "userId" in socket.auth){
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity: `${isPlaying && currentSong ? `${currentSong.title} - ${currentSong.artist}` : 'paused the song'}`
      })
    }
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
  playSong: (song) => {
    set({ currentSong: song, isPlaying: true });
  },
  pauseSong: () => {
    set({ isPlaying: false });
  },
  playNext: () => {
    const { currentIndex, songs, isShuffle, shuffledSongs, repeatMode } = get();
    const playlist = isShuffle && shuffledSongs.length ? shuffledSongs : songs;
    if (!playlist.length) return;
  
    let nextIndex = currentIndex;
  
    if (repeatMode === 'one') {
      // Repeat the current song
      nextIndex = currentIndex;
    } else {
      nextIndex = currentIndex + 1;
      // Check if we've reached the end of the playlist
      if (nextIndex >= playlist.length) {
        if (repeatMode === 'all') {
          // Repeat from the beginning
          nextIndex = 0;
        } else if (repeatMode === 'off') {
          const socket = useChatStore.getState().socket
          const nextSong = get().songs[nextIndex];
          if (socket?.auth && "userId" in socket.auth){
            socket.emit('update_activity', {
              userId: socket.auth.userId,
              activity: `${nextSong.title} - ${nextSong.artist}`
            })
          }
          // Stop playback
          set({ isPlaying: false });
          return;
        }
      }
    }
  
    const nextSong = playlist[nextIndex];
    set({
      currentIndex: nextIndex,
      currentSong: nextSong,
      isPlaying: true,
    });
  },
  
  playPrevious: () => {
    const { currentIndex, songs, isShuffle, shuffledSongs } = get();
    const playlist = isShuffle && shuffledSongs.length ? shuffledSongs : songs;
    if (!playlist.length) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    const prevSong = playlist[prevIndex];
    const socket = useChatStore.getState().socket
    if (socket?.auth && "userId" in socket.auth){
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity: `${prevSong.title} - ${prevSong.artist}`
      })
    }
    set({
      currentIndex: prevIndex,
      currentSong: prevSong,
      isPlaying: true,
    });
  },
  playAlbum: (songs: ISong[], startIndex = 0) => {
    if (!songs.length) return;
    const song = songs[startIndex];
    const socket = useChatStore.getState().socket
    if (socket?.auth && "userId" in socket.auth){
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity: `${song.title} - ${song.artist}`
      })
    }
    set({
      songs,
      currentSong: song,
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
  setRepeatMode() {
    set((state) => {
      const nextMode = state.repeatMode === 'off' ? 'all' : state.repeatMode === 'all' ? 'one' : 'off';
      return { repeatMode: nextMode };
    });
  },
}));