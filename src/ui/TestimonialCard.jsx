import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function TestimonialCard({ text, name, city, img }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        height: "100%"
      }}
    >
      {/* STARS */}
      <Box sx={{ display: "flex", mb: 2 }}>
        {[1,2,3,4,5].map((star) => (
          <StarIcon key={star} sx={{ color: "#fbbf24", fontSize: 20 }} />
        ))}
      </Box>

      {/* TEXT */}
      <Typography sx={{ mb: 3, color: "#374151" }}>
        {text}
      </Typography>

      {/* USER */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={img} />

          <Box>
            <Typography fontWeight={600}>{name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {city}
            </Typography>
          </Box>
        </Box>

        <Chip
          icon={<CheckCircleIcon />}
          label="Verified"
          size="small"
          sx={{
            background: "#dcfce7",
            color: "#15803d",
            fontWeight: 500
          }}
        />

      </Box>
    </Paper>
  );
}