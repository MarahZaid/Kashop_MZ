import {
    Box,
    Typography,
    Paper
} from "@mui/material";
export default function FeatureCard({ icon, title, text, color }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 3
            }}
        >
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: `${color}22`, 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: color 
                }}
            >
                {icon}
            </Box>

            <Typography fontWeight={600} gutterBottom sx={{ color: "white" }}>
                {title}
            </Typography>

            <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.6)" }}
            >
                {text}
            </Typography>
        </Paper>
    );
}