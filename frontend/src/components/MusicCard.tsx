import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

interface MusicCardProps {
  title: string;
  artist: string;
  imageUrl: string;
}

const MusicCard: React.FC<MusicCardProps> = ({
  title,
  artist,
  imageUrl,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Card className="relative group w-full sm:max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
      <div className="relative">
        <CardMedia
          component="img"
          alt={`${title} by ${artist}`}
          image={imageUrl}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
        <IconButton
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-label={`Play ${title} by ${artist}`}
          sx={{
            color: isDarkMode ? "#fff" : "#fff",
            fontSize: "4rem",
          }}
        >
          <PlayCircleFilledWhiteIcon
            fontSize="inherit"
            className="drop-shadow-lg animate-scale-up"
          />
        </IconButton>
      </div>
      <CardContent className="text-center p-4 bg-white dark:bg-gray-900">
        <Typography
          variant="h6"
          component="div"
          className="font-bold line-clamp-1 text-gray-900 dark:text-white"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-300"
        >
          {artist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MusicCard;