import React from "react";
import { Card, CardContent, CardMedia, Skeleton, useTheme } from "@mui/material";

const MusicCardSkeleton: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Card className={`relative group w-full max-w-sm rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <CardMedia
        component="div"
        className="w-full h-36 bg-gray-300 dark:bg-gray-700"
      />
      <CardContent className={`flex flex-col p-2 justify-center items-center w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={20} />
      </CardContent>
    </Card>
  );
};

export default MusicCardSkeleton;