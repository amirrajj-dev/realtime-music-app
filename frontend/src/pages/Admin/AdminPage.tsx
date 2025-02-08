import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useStatsStore } from "../../store/useStats";
import { useEffect, useState } from "react";
import { useMusicStore } from "../../store/useMusic";
import AdminTopBar from "../../components/AdminTopBar";
import SongsTable from "../../components/SongsTable";
import AlbumsTable from "../../components/AlbumsTable";
import StatsCards from "../../components/StatsCard";
import { toast, ToastOptions } from "react-toastify";
import { IAlbum, ISong } from "../../interfaces/interface";
import { axiosInstance } from "../../configs/axios";

const AdminPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getStats } = useStatsStore();
  const {
    albums,
    getAlbums,
    songs,
    getSongs,
    isLoading: isLoadingMusic,
    deleteSong,
    deleteAlbum,
  } = useMusicStore();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getStats();
    getAlbums();
    getSongs();
  }, [getStats, getAlbums, getSongs]);

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: theme.palette.mode === "dark" ? "dark" : "light",
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleDeleteSong = async (id: string) => {
    const isSure = confirm("Are you sure you want to delete this song?");
    if (isSure) {
      const res = await deleteSong(id);
      if (res.success) {
        toast.success(res.message, toastOptions as ToastOptions);
        getAlbums();
        getSongs();
        getStats();
      } else {
        toast.error(res.message, toastOptions as ToastOptions);
      }
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    const isSure = confirm("Are you sure you want to delete this album?");
    if (isSure) {
      const res = await deleteAlbum(id);
      if (res.success) {
        toast.success(res.message, toastOptions as ToastOptions);
        getAlbums();
        getSongs();
        getStats();
      } else {
        toast.error(res.message, toastOptions as ToastOptions);
      }
    }
  };

  const handleAddSong = async (song: ISong) => {
    if (
      !song.title ||
      !song.artist ||
      !song.imageUrl ||
      !song.duration ||
      !song.audioUrl
    ) {
      toast.error("All fields are required", toastOptions as ToastOptions);
      return;
    }
    const formdata = new FormData();
    formdata.append("title", song.title);
    formdata.append("artist", song.artist);
    formdata.append("imageFile", song.imageUrl);
    formdata.append("duration", song.duration.toString());
    formdata.append("audioFile", song.audioUrl);
    if (song.albumId) {
      formdata.append("albumId", song.albumId);
    }
    const res = await axiosInstance.post("/admin/add-song", formdata, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60000, // 1 min
    });
    if (res.data.success) {
      toast.success(res.data.message, toastOptions as ToastOptions);
      getAlbums();
      getSongs();
      getStats();
    } else {
      toast.error(
        res.response.data.error.message || res.data.error.message,
        toastOptions as ToastOptions
      );
    }
  };

  const handleAddAlbum = async (album: Partial<IAlbum>) => {
    if (
      !album.title ||
      !album.artist ||
      !album.imageUrl ||
      !album.releaseYear
    ) {
      toast.error("All fields are required", toastOptions as ToastOptions);
      return;
    }
    const formdata = new FormData();
    formdata.append("title", album.title);
    formdata.append("artist", album.artist);
    formdata.append("imageFile", album.imageUrl);
    formdata.append("releaseDate", album.releaseYear.toString());
    const res = await axiosInstance.post("/admin/add-album", formdata, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60000, // 1 min
    });
    if (res.data.success) {
      toast.success(res.data.message, toastOptions as ToastOptions);
      getAlbums();
      getStats();
    } else {
      toast.error(
        res.response.data.error.message || res.data.error.message,
        toastOptions as ToastOptions
      );
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        p: { xs: 2, md: 5 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 4 },
      }}
    >
      <AdminTopBar />
      <StatsCards />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant={isMobile ? "fullWidth" : "standard"}
      >
        <Tab label="Songs" />
        <Tab label="Albums" />
      </Tabs>

      {activeTab === 0 && (
        <SongsTable
          addSong={handleAddSong}
          deleteSong={handleDeleteSong}
          songs={songs}
          isLoading={isLoadingMusic}
          albums={albums}
        />
      )}

      {activeTab === 1 && (
        <AlbumsTable
          addAlbum={handleAddAlbum}
          albums={albums}
          deleteAlbum={handleDeleteAlbum}
          isLoading={isLoadingMusic}
        />
      )}
    </Box>
  );
};

export default AdminPage;
