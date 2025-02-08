import React, { useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  TextField, IconButton, Typography, useTheme, Divider 
} from '@mui/material';
import { Add as AddIcon, CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';
import { IAlbum } from '../interfaces/interface';

interface AddAlbumModalProps {
  open: boolean;
  onClose: () => void;
  onAddAlbum: (album: Partial<IAlbum>) => Promise<void>;
}

const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ open, onClose, onAddAlbum }) => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [imageUrl, setImageUrl] = useState<File | null | string>(null);
  const [demo , setDemo] = useState('');
  const theme = useTheme();

  const handleAddAlbum = () => {
    onAddAlbum({ title: albumTitle, artist, releaseYear: +releaseYear, imageUrl: imageUrl as string });
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
        Add New Album
      </Typography>
      <DialogContent sx={{ bgcolor: theme.palette.background.default }}>
        <Box component="form" className="flex flex-col gap-4">
          <TextField
            label="Album Title"
            variant="outlined"
            fullWidth
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
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
            label="Release Year"
            variant="outlined"
            fullWidth
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper }}
          />
          <Box className="flex items-center gap-4">
            <IconButton component="label" color="primary" className="relative">
              <CloudUploadIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target?.files?.[0] || null;
                  if (file) {
                    setImageUrl(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setDemo(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </IconButton>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {imageUrl ? "Image selected" : "Upload Album Cover"}
            </Typography>
          </Box>
          {demo && (
            <Box className="flex justify-center mt-4">
              <img src={demo} alt="Album Cover" className="h-40 w-40 rounded-lg shadow-lg" />
            </Box>
          )}
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions className="flex justify-between p-4" sx={{ bgcolor: theme.palette.background.default }}>
        <Button onClick={onClose} color="secondary" variant="outlined" className="text-lg font-semibold" startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <Button
          onClick={handleAddAlbum}
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!albumTitle || !artist || !releaseYear || !imageUrl}
          className="text-lg font-semibold"
        >
          Add Album
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAlbumModal;