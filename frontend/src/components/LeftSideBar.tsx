import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "./skeletons/PlayListSkeleton";
import { useEffect } from "react";
import { useMusicStore } from "../store/useMusic";

const LeftSideBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { albums, isLoading, getAlbums } = useMusicStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "10px" : "20px",
        padding: isMobile ? "8px" : "16px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "8px",
          backgroundColor: theme.palette.background.default,
          borderRadius: "8px",
        }}
      >
        <Link to={"/"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <HomeOutlinedIcon
              fontSize="medium"
              sx={{ color: theme.palette.primary.main }}
            />
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary }}
            >
              Home
            </Typography>
          </Box>
        </Link>
        <Link to={"/chat"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ChatBubbleOutlineIcon
              fontSize="medium"
              sx={{ color: theme.palette.primary.main }}
            />
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary }}
            >
              Messages
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "8px",
          backgroundColor: theme.palette.background.default,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <SubscriptionsIcon
            fontSize="medium"
            sx={{ color: theme.palette.primary.main }}
          />
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.primary }}
          >
            Playlists
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {isLoading ? (
            <PlaylistSkeleton />
          ) : (
            albums.map((album) => (
              <Link key={album._id} to={`/albums/${album._id}`}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    style={{ width: "50px", borderRadius: "8px" }}
                  />
                  <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {album.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {album.artist}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;