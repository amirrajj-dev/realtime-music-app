import React from "react";
import { Card, CardContent, CardMedia, Skeleton, IconButton, useTheme } from "@mui/material";

const MusicCardSkeleton: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Card className={`relative group w-full sm:max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative">
        {/* Album Art Skeleton */}
        <CardMedia
          component="div"
          className="w-full h-56 bg-gray-300 dark:bg-gray-700"
        />
        {/* Gradient Overlay Skeleton */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        {/* Play Icon Skeleton */}
        <IconButton
          className="absolute inset-0 flex items-center justify-center opacity-75 bg-white bg-opacity-90 text-primary-main rounded-full shadow-lg"
          aria-label="play"
          size="large"
          disabled
        >
          <Skeleton variant="circular" width={64} height={64} />
        </IconButton>
      </div>
      {/* Song Details Skeleton */}
      <CardContent className={`flex flex-col items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Skeleton variant="text" width="80%" height={30} className="mb-2" />
        <Skeleton variant="text" width="60%" height={20} />
      </CardContent>
    </Card>
  );
};

export default MusicCardSkeleton;