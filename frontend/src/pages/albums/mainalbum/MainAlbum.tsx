import { useParams } from "react-router-dom";
import { useMusicStore } from "../../../store/useMusic";
import { useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { usePlayerStore } from "../../../store/usePlayerStore";
import AudioPlayer from "../../../components/AudioPlayer";
import AlbumDetails from "../../../components/AlbumDetails";
import SongTable from "../../../components/SongTable";
import { ISong } from "../../../interfaces/interface";

const MainAlbum = () => {
  const { id } = useParams();
  const { getAlbumById, isLoading, mainAlbum } = useMusicStore();
  const theme = useTheme();
  const { setCurrentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    getAlbumById(id as string);
  }, [id, getAlbumById]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!mainAlbum) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          Album not found
        </Typography>
      </Box>
    );
  }

  const handleRowClick = (song: ISong) => {
    setCurrentSong(song);
  };

  const handlePlayAlbum = () => {
    playAlbum(mainAlbum.songs, 0);
  };

  const handlePauseSong = () => {
    if (isPlaying) {
      togglePlay();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
        position: "relative",
      }}
    >
      <AlbumDetails
        imageUrl={mainAlbum.imageUrl}
        title={mainAlbum.title}
        artist={mainAlbum.artist}
        releaseYear={new Date(mainAlbum.createdAt as Date).getFullYear()}
        songCount={mainAlbum.songs.length}
        playAlbum={handlePlayAlbum}
        pauseSong={handlePauseSong}
      />
      <SongTable songs={mainAlbum.songs} onRowClick={handleRowClick} />
      <AudioPlayer />
    </Box>
  );
};

export default MainAlbum;