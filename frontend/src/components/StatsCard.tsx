import { Box, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { useStatsStore } from "../store/useStats"; 
import AlbumIcon from "@mui/icons-material/Album";
import PersonIcon from "@mui/icons-material/Person";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import GroupIcon from "@mui/icons-material/Group";

interface StatCardProps {
  title: string;
  value: number;
  Icon: React.ElementType;
  color: string;
  loading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon, color, loading }) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 3, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        textAlign: "center", 
        gap: 2,
        flex: "1 1 250px",
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: "16px",
        transition: "all 0.3s",
        '&:hover': {
          transform: "scale(1.08)",
          bgcolor: "background.default",
          boxShadow: theme.shadows[10],
        }
      }}
    >
      {loading ? (
        <Skeleton variant="circular" width={56} height={56} />
      ) : (
        <Icon sx={{ color: color, fontSize: 56 }} />
      )}
      {loading ? (
        <Skeleton width="60%" />
      ) : (
        <Typography variant="h6" color="textPrimary" gutterBottom>
          {title}
        </Typography>
      )}
      {loading ? (
        <Skeleton width="40%" />
      ) : (
        <Typography variant="h4" color="textSecondary">
          {value}
        </Typography>
      )}
    </Paper>
  );
};

const StatsCards: React.FC = () => {
  const { albumsCount, artistsCount, songsCount, usersCount, isLoading: isLoadingStats } = useStatsStore();
  const theme = useTheme()
  return (
    <Box 
      sx={{ 
        display: "flex", 
        gap: 4, 
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        bgcolor: "background.default",
        borderRadius: "16px",
      }}
    >
      <StatCard title="Albums" value={albumsCount} Icon={AlbumIcon} color={theme.palette.success.main} loading={isLoadingStats} />
      <StatCard title="Artists" value={artistsCount} Icon={PersonIcon} color={theme.palette.info.main} loading={isLoadingStats} />
      <StatCard title="Songs" value={songsCount} Icon={MusicNoteIcon} color={theme.palette.warning.main} loading={isLoadingStats} />
      <StatCard title="Users" value={usersCount} Icon={GroupIcon} color={theme.palette.error.main} loading={isLoadingStats} />
    </Box>
  );
};

export default StatsCards;