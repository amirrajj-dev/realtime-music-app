import React, { useEffect } from "react";
import { useMusicStore } from "../store/useMusic";
import MusicCard from "./MusicCard";
import MusicCardSkeleton from "./skeletons/MusicCardSkeleton";
import { Typography } from "@mui/material";

const FeaturedSongs: React.FC = () => {
  const { featuredSongs, getFeaturedSongs, isLoading } = useMusicStore();
  useEffect(() => {
    getFeaturedSongs();
  }, [getFeaturedSongs]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Typography className="mt-4 font-semibold text-center text-2xl md:text-4xl" variant="h4">
        Featured Songs 🎧
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-4">
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => <MusicCardSkeleton key={index} />)
          : featuredSongs.map((song) => (
              <MusicCard
                key={song._id}
                {...song}
              />
            ))}
      </div>
    </div>
  );
};

export default FeaturedSongs;