import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const AudioPlayer = () => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio) return;

    const handlePlayPause = async () => {
      try {
        if (isPlaying) {
          await audio.play();
        } else {
          await audio.pause();
        }
      } catch (error) {
        console.error("Error playing or pausing audio:", error);
      }
    };

    handlePlayPause();
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

    const loadAndPlayAudio = async () => {
      try {
        if (prevSongRef.current !== currentSong.audioUrl) {
          audio.pause();
          audio.src = currentSong.audioUrl;
          audio.load();
          prevSongRef.current = currentSong.audioUrl;
          audio.currentTime = 0;

          if (isPlaying) {
            await audio.play(); 
          }
        }
      } catch (error) {
        console.error("Error loading and playing audio:", error);
      }
    };

    loadAndPlayAudio();
  }, [currentSong, isPlaying]);

  return <audio ref={audioPlayerRef} />;
};

export default AudioPlayer;