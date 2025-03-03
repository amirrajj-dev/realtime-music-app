import React, { useState, useEffect, useRef } from "react";
import { usePlayerStore } from "../store/usePlayerStore";
import {
  Box,
  IconButton,
  Slider,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Avatar,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import { VolumeDownRounded } from "@mui/icons-material";

const PlaybackControl: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    currentSong,
    isPlaying,
    playNext,
    playPrevious,
    togglePlay,
    currentTime,
    duration,
    setCurrentTime,
    setDuration,
    isShuffle,
    toggleShuffle,
    repeatMode,
    setRepeatMode,
  } = usePlayerStore();

  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (prevSongRef.current !== currentSong.audioUrl) {
      audio.pause();
      audio.src = currentSong.audioUrl;
      audio.load();
      prevSongRef.current = currentSong.audioUrl;
      audio.currentTime = 0;
    }

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      const { repeatMode } = usePlayerStore.getState();
    
      if (repeatMode === 'one') {
        const audio = audioRef.current;
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
      } else {
        playNext();
      }
    };    

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext, setCurrentTime, setDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const handleSliderChange = (event: any, value: number | number[]) => {
    console.log(event);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value as number;
      setCurrentTime(value as number);
    }
  };

  const handleVolumeChange = (event: any, value: number | number[]) => {
    console.log(event);
    setVolume(value as number);
  };

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const playPause = () => {
    togglePlay();
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeOffRoundedIcon  />;
    } else if (volume < 0.5) {
      return <VolumeDownRounded />;
    } else {
      return <VolumeUpRoundedIcon />;
    }
  };

  return (
    <>
      <Box
         sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          p: isMobile ? 1 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1000,
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
        }}
        className="playback-control"
      >
        {currentSong && (
          <Grid container alignItems="center">
            {/* Song Info */}
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                src={currentSong.imageUrl}
                variant="rounded"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" noWrap>
                  {currentSong.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" noWrap>
                  {currentSong.artist}
                </Typography>
              </Box>
            </Grid>

            {/* Playback Controls */}
            <Grid item xs={12} sm={5} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box>
                  <IconButton onClick={playPrevious} sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}>
                    <SkipPreviousRoundedIcon fontSize="large" />
                  </IconButton>
                  <IconButton onClick={playPause} sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}>
                    {isPlaying ? (
                      <PauseRoundedIcon fontSize="large" />
                    ) : (
                      <PlayArrowRoundedIcon fontSize="large" />
                    )}
                  </IconButton>
                  <IconButton onClick={playNext} sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}>
                    <SkipNextRoundedIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                  sx={{
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                    onClick={toggleShuffle}
                    color={isShuffle ? "primary" : "default"}
                  >
                    <ShuffleIcon fontSize="large" />
                  </IconButton>
                  <IconButton onClick={setRepeatMode} sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}>
                    {repeatMode === "one" ? (
                      <RepeatOneIcon fontSize="large" color="primary" />
                    ) : (
                      <RepeatIcon
                        fontSize="large"
                        color={repeatMode === "all" ? "primary" : "inherit"}
                      />
                    )}
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ minWidth: 35 }}>
                    {formatTime(currentTime)}
                  </Typography>
                  <Slider
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSliderChange}
                    sx={{ mx: 2, flexGrow: 1 }}
                  />
                  <Typography variant="caption" sx={{ minWidth: 35 }}>
                    {formatTime(duration)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Volume Control */}
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-end",
              }}
            >
              <IconButton onClick={handleMute}>
                {getVolumeIcon()}
              </IconButton>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                sx={{ width: 100, mx: 2 }}
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <audio ref={audioRef} />
    </>
  );
};

export default PlaybackControl;
