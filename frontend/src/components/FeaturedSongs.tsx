import React, { useEffect } from "react";
import { useMusicStore } from "../store/useMusic";
import MusicCard from "./MusicCard";
import MusicCardSkeleton from "./skeletons/MusicCardSkeleton";
import { Typography } from "@mui/material";

const FeaturedSongs: React.FC = () => {
  const { featuredSongs, getFeaturedSongs , isLoading } = useMusicStore();

  useEffect(() => {
      getFeaturedSongs();
  }, [getFeaturedSongs]);

  return (
    <div>
      <Typography className="mt-4 font-semibold" variant="h4">
      Featured Songs 
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center my-4">
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => <MusicCardSkeleton key={index} />)
          : featuredSongs.map((song) => (
              <MusicCard
                key={song._id}
                title={song.title}
                artist={song.artist}
                imageUrl={song.imageUrl}
              />
            ))}
      </div>
    </div>
  );
};

export default FeaturedSongs;