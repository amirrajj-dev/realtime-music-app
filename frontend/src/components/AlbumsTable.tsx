import { Avatar, Box, Button, IconButton, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IAlbum } from "../interfaces/interface";
import AddIcon from "@mui/icons-material/Add";

interface AlbumsTableProps {
  albums: IAlbum[];
  addAlbum: () => void;
  deleteAlbum: (id: string) => void;
  isLoading : boolean
}

const AlbumsTable: React.FC<AlbumsTableProps> = ({ addAlbum, albums, deleteAlbum, isLoading }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.paper, borderRadius: 2, boxShadow: 3 }}>
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={addAlbum}
        sx={{ mb: 2, bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}
      >
        Add Album
      </Button>
      <TableContainer component={Paper} sx={{ maxHeight: 450, overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Title</Typography></TableCell>
              <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Artist</Typography></TableCell>
              <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Release Date</Typography></TableCell>
              <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [1, 2, 3, 4, 5].map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton width="60%" />
                    </Box>
                  </TableCell>
                  <TableCell><Skeleton width="60%" /></TableCell>
                  <TableCell><Skeleton width="40%" /></TableCell>
                  <TableCell><Skeleton width="20%" /></TableCell>
                </TableRow>
              ))
            ) : (
              albums.map((album) => (
                <TableRow key={album._id} sx={{ '&:hover': { bgcolor: theme.palette.action.hover } }}>
                  <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={album.imageUrl} alt={album.title} sx={{ width: 40, height: 40 }} />
                    <Typography variant="body1">{album.title}</Typography>
                  </TableCell>
                  <TableCell><Typography variant="body1">{album.artist}</Typography></TableCell>
                  <TableCell><Typography variant="body1">{new Date(album.createdAt).toLocaleDateString()}</Typography></TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteAlbum(album._id)} sx={{ color: theme.palette.error.main }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AlbumsTable;