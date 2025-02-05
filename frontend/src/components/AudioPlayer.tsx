import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const AudioPlayer = () => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext, setCurrentTime, setDuration } = usePlayerStore();

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    if (isPlaying) {
      playAudio();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [playNext, setCurrentTime, setDuration]);

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio || !currentSong) return;

    if (prevSongRef.current !== currentSong.audioUrl) {
      audio.pause();
      audio.src = currentSong.audioUrl;
      prevSongRef.current = currentSong.audioUrl;
      audio.load();
      audio.currentTime = 0;

      if (isPlaying) {
        const playAudio = async () => {
          try {
            await audio.play();
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        };
        playAudio();
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioPlayerRef} />;
};

export default AudioPlayer;