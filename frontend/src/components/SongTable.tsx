import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  useTheme,
  keyframes,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ISong } from "../interfaces/interface";
import { usePlayerStore } from "../store/usePlayerStore";

interface SongTableProps {
  songs: ISong[];
  onRowClick: (song: ISong) => void;
}

const SongTable: React.FC<SongTableProps> = ({ songs, onRowClick }) => {
  const theme = useTheme();
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  const { currentSong } = usePlayerStore();
  
  const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "800px",
        width: "100%",
        maxHeight: "400px",
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: theme.palette.text.primary }}>#</TableCell>
            <TableCell sx={{ color: theme.palette.text.primary }}>Title</TableCell>
            <TableCell sx={{ color: theme.palette.text.primary }}>Release Date</TableCell>
            <TableCell sx={{ color: theme.palette.text.primary }}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow
              key={song._id}
              onMouseEnter={() => setHoveredRow(song._id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => onRowClick(song)}
              sx={{
                cursor: "pointer",
                background: currentSong?._id === song._id ? theme.palette.primary.main : "inherit",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: currentSong?._id === song._id ? theme.palette.secondary.main : theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                {currentSong?._id === song._id ? (
                  <IconButton sx={{ animation: `${rotate} 2s linear infinite` }}>
                    <MusicNoteIcon sx={{ color: theme.palette.background.paper }} />
                  </IconButton>
                ) : hoveredRow === song._id ? (
                  <IconButton>
                    <PlayArrowIcon sx={{ color: theme.palette.primary.main }} />
                  </IconButton>
                ) : (
                  index + 1
                )}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.text.secondary,
                }}
              >
                <Avatar
                  src={song.imageUrl}
                  alt={song.title}
                  sx={{
                    marginRight: "16px",
                    width: "50px",
                    height: "50px",
                    border: currentSong?._id === song._id ? `2px solid ${theme.palette.primary.main}` : "none",
                  }}
                />
                <div>
                  <div style={{ color: theme.palette.text.primary }}>{song.title}</div>
                  <div style={{ color: theme.palette.text.secondary }}>{song.artist}</div>
                </div>
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                {new Date(song.createdAt as Date).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                <AccessTimeIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: "4px" }} />
                {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, "0")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongTable;