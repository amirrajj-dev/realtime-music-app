import React, { useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  TextField, IconButton, Typography, useTheme, Divider, Select, MenuItem, FormControl, InputLabel 
} from '@mui/material';
import { Add as AddIcon, CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';
import { useMusicStore } from '../store/useMusic';
import { ISong } from '../interfaces/interface';

interface AddSongsModalProps {
  open: boolean;
  onClose: () => void;
  onAddSong: (song: Partial<ISong>) => void;
}

const AddSongsModal: React.FC<AddSongsModalProps> = ({ open, onClose, onAddSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [albumId, setAlbumId] = useState('');
  const [demo ,  setDemo] = useState('');
  const theme = useTheme();

  const {albums} = useMusicStore()

  const handleAddSong = () => {
    onAddSong({ title, artist, duration: +duration, audioUrl, imageUrl, albumId });
    onClose();
    setTitle('');
    setArtist('');
    setDuration('');
    setAudioUrl('');
    setImageUrl(null);
    setAlbumId('');
    setDemo('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Typography
        variant="h6"
        sx={{
          p: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Add New Song
      </Typography>
      <DialogContent sx={{ bgcolor: theme.palette.background.default }}>
        <Box component="form" className="flex flex-col gap-4">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper }}
          />
          <TextField
            label="Artist"
            variant="outlined"
            fullWidth
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper }}
          />
          <TextField
            label="Duration (seconds)"
            variant="outlined"
            type="number"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper }}
          />
          <Box className="flex items-center gap-4">
            <IconButton component="label" color="primary" className="relative">
              <CloudUploadIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <input
                type="file"
                hidden
                accept="audio/*"
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files![0];
                  if (file) {
                   setAudioUrl(file)
                  }
                }}
              />
            </IconButton>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {audioUrl ? "Audio file selected" : "Upload Audio File"}
            </Typography>
          </Box>
          <Box className="flex items-center gap-4">
            <IconButton component="label" color="primary" className="relative">
              <CloudUploadIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files![0];
                  if (file) {
                   setImageUrl(file)
                   const res = URL.createObjectURL(file)
                   setDemo(res)
                  }
                }}
              />
            </IconButton>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {imageUrl ? "Image selected" : "Upload Song Image/Cover"}
            </Typography>
          </Box>
          {demo && (
            <Box className="flex justify-center mt-4">
              <img src={demo} alt="Song Cover" className="h-40 w-40 rounded-lg shadow-lg" />
            </Box>
          )}
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Album</InputLabel>
            <Select
              value={albumId}
              onChange={(e) => setAlbumId(e.target.value)}
              label="Album"
              sx={{ bgcolor: theme.palette.background.paper }}
            >
              {albums.map((album) => (
                <MenuItem value={album._id} key={album._id}>
                  {album.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions className="flex justify-between p-4" sx={{ bgcolor: theme.palette.background.default }}>
        <Button onClick={onClose} color="secondary" variant="outlined" className="text-lg font-semibold" startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <Button
          onClick={handleAddSong}
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!title || !artist || !duration || !audioUrl || !imageUrl}
          className="text-lg font-semibold"
        >
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSongsModal;