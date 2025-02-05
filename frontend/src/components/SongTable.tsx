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
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ISong } from "../interfaces/interface";
import { usePlayerStore } from "../store/usePlayerStore";

interface SongTableProps {
  songs: ISong[];
}

const SongTable: React.FC<SongTableProps> = ({ songs }) => {
  const theme = useTheme();
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  const { currentSong, isPlaying, setCurrentSong } = usePlayerStore();

  const handleRowClick = (song: ISong) => {
    setCurrentSong(song);
  };

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
          {songs.map((song, index) => {
            const isCurrentSong = currentSong?._id === song._id;
            const showPlayIcon = hoveredRow === song._id && !isCurrentSong;
            const showPauseIcon = hoveredRow === song._id && isCurrentSong && isPlaying;
            const showMusicNoteIcon = isCurrentSong && isPlaying && hoveredRow !== song._id;
            const showIndex = !isCurrentSong || (isCurrentSong && !isPlaying);

            return (
              <TableRow
                key={song._id}
                onMouseEnter={() => setHoveredRow(song._id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleRowClick(song)}
                sx={{
                  cursor: "pointer",
                  background: isCurrentSong ? theme.palette.action.selected : "inherit",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  {showPlayIcon ? (
                    <IconButton>
                      <PlayArrowIcon sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                  ) : showPauseIcon ? (
                    <IconButton>
                      <PauseIcon sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                  ) : showMusicNoteIcon ? (
                    <IconButton>
                      <MusicNoteIcon sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                  ) : showIndex ? (
                    index + 1
                  ) : null}
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
                      border: isCurrentSong ? `2px solid ${theme.palette.primary.main}` : "none",
                    }}
                  />
                  <div>
                    <Typography sx={{ color: theme.palette.text.primary }}>{song.title}</Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{song.artist}</Typography>
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
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongTable;