import React, { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const AudioPlayer = () => {
  const audioPlayerRef = React.useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  useEffect(() => {
    console.log(isPlaying);
    console.log(audioPlayerRef.current);
    if (isPlaying) audioPlayerRef.current?.play();
    else audioPlayerRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio) return;
    const handleEnded = () => {
      playNext();
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio || !currentSong) return;
    const isSongChanged = prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChanged) {
      audio.src = currentSong?.audioUrl;
      prevSongRef.current = currentSong?.audioUrl;
      audio.currentTime = 0;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioPlayerRef} />;
};

export default AudioPlayer;