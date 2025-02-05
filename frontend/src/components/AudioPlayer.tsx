import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const AudioPlayer = () => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio) return;
    if (isPlaying) audio.play();
    else audio.pause();
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
    if (prevSongRef.current !== currentSong.audioUrl) {
      audio.src = currentSong.audioUrl;
      prevSongRef.current = currentSong.audioUrl;
      audio.currentTime = 0;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioPlayerRef} />;
};

export default AudioPlayer;