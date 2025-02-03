import React from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, useTheme } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface MusicCardProps {
  title: string;
  artist: string;
  imageUrl: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ title, artist, imageUrl }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Card className="relative group w-full sm:max-w-sm rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <CardMedia
        component="img"
        alt={title}
        image={imageUrl}
        className="w-full h-32 object-cover"
      />
      <IconButton
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 rounded-full p-2"
        aria-label="play"
      >
        <PlayArrowIcon className={`${isDarkMode ? 'text-white' : 'text-indigo-700'}`} />
      </IconButton>
      <CardContent className="text-center p-2">
        <Typography variant="h6" component="div" className="font-semibold line-clamp-1">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {artist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MusicCard;