import React, { useEffect } from "react";
import { useMusicStore } from "../store/useMusic";
import MusicCard from "./MusicCard";
import MusicCardSkeleton from "./skeletons/MusicCardSkeleton";
import { Typography } from "@mui/material";

const MadeForYouSongs: React.FC = () => {
  const { madeForYouSongs, getMadeForYouSongs , isLoading } = useMusicStore();

  useEffect(() => {
      getMadeForYouSongs();
  }, [getMadeForYouSongs]);

  return (
    <div className="my-8">
      <Typography className="mt-4 font-semibold text-center text-2xl md:text-4xl" variant="h4">
      Made For You Songs 🎧
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center my-4">
        {isLoading
          ? Array.from(new Array(4)).map((_, index) => <MusicCardSkeleton key={index} />)
          : madeForYouSongs.map((song) => (
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

export default MadeForYouSongs;