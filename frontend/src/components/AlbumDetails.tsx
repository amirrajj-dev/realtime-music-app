import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import { usePlayerStore } from "../store/usePlayerStore";

interface AlbumDetailsProps {
  imageUrl: string;
  title: string;
  artist: string;
  releaseYear: number;
  songCount: number;
  playAlbum: () => void;
  pauseSong: () => void;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  imageUrl,
  title,
  artist,
  releaseYear,
  songCount,
  playAlbum,
  pauseSong,
}) => {
  const theme = useTheme();
  const { isPlaying } = usePlayerStore();

  return (
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
        image={imageUrl}
        alt={title}
        sx={{ height: "300px", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          {artist}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          Released in {releaseYear}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {songCount} songs
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
        onClick={isPlaying ? pauseSong : playAlbum}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowOutlinedIcon />}
      </IconButton>
    </Card>
  );
};

export default AlbumDetails;