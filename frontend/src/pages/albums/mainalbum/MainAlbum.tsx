import { useParams } from "react-router-dom";
import { useMusicStore } from "../../../store/useMusic";
import { useEffect, useState } from "react";
import { keyframes } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { usePlayerStore } from "../../../store/usePlayerStore";
import AudioPlayer from "../../../components/AudioPlayer";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PauseIcon from "@mui/icons-material/Pause";
import { ISong } from "../../../interfaces/interface";

const MainAlbum = () => {
  const { id } = useParams();
  const { getAlbumById, isLoading, mainAlbum } = useMusicStore();
  const theme = useTheme();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const { setCurrentSong, isPlaying, playAlbum, currentSong , togglePlay } =
    usePlayerStore();
    
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
      togglePlay()
    }
  };

  const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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
      <Card
        sx={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={mainAlbum.imageUrl}
          alt={mainAlbum.title}
          sx={{ height: "300px", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
            {mainAlbum.title}
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            {mainAlbum.artist}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary }}
          >
            Released in {new Date(mainAlbum.createdAt as Date).getFullYear()}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {mainAlbum.songs.length} songs
          </Typography>
        </CardContent>
        <IconButton
          sx={{
            position: "absolute",
            bottom: "160px",
            left: "20px",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            cursor: "pointer",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ":hover": {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.background.paper,
              transition: "all 0.3s ease-in-out",
              transform: "scale(1.1)",
            },
          }}
          onClick={isPlaying ? handlePauseSong : handlePlayAlbum}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowOutlinedIcon />}
        </IconButton>
      </Card>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "800px",
          width: "100%",
          maxHeight: "400px",
          overflowY: "auto",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "8px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                #
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                Title
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                Release Date
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                Duration
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mainAlbum.songs.map((song, index) => (
              <TableRow
                key={song._id}
                onMouseEnter={() => setHoveredRow(song._id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleRowClick(song)}
                sx={{
                  cursor: "pointer",
                  background:
                    currentSong?._id === song._id
                      ? theme.palette.primary.main
                      : "inherit",

                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor:
                      currentSong?._id === song._id
                        ? theme.palette.secondary.main
                        : theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  {currentSong?._id === song._id ? (
                    <IconButton
                      sx={{ animation: `${rotate} 2s linear infinite` }}
                    >
                      <MusicNoteIcon
                        sx={{ color: theme.palette.background.paper }}
                      />
                    </IconButton>
                  ) : hoveredRow === song._id ? (
                    <IconButton>
                      <PlayArrowIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </IconButton>
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.text.secondary,
                  }}
                >
                  <Avatar
                    src={song.imageUrl}
                    alt={song.title}
                    sx={{
                      marginRight: "16px",
                      width: "50px",
                      height: "50px",
                      border:
                        currentSong?._id === song._id
                          ? `2px solid ${theme.palette.primary.main}`
                          : "none",
                    }}
                  />
                  <Box>
                    <Typography sx={{ color: theme.palette.text.primary }}>
                      {song.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {song.artist}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.secondary }}>
                  {new Date(song.createdAt as Date).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.secondary }}>
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ verticalAlign: "middle", marginRight: "4px" }}
                  />
                  {Math.floor(song.duration / 60)}:
                  {String(song.duration % 60).padStart(2, "0")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AudioPlayer />
    </Box>
  );
};

export default MainAlbum;