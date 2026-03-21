import { Box, Container, Grid, Typography, Chip } from "@mui/material";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "15+", label: "Countries" },
  { value: "4.9", label: "Average Rating" },
];

export default function AboutHeroSection() {
  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          py: { xs: 8, md: 17 },
          background:
            "linear-gradient(90deg,#f3e8ff 0%, #ffffff 40%, #fff7ed 100%)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Chip
            label="Our Story"
            sx={{
              mb: 3,
              px: 2,
              fontWeight: 600,
              bgcolor: "#f3e8ff",
              color: "#a21caf",
            }}
          />

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Fashion That Inspires Confidence
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
            }}
          >
            Founded in 2018, Luxe began with a simple mission: to create
            beautiful, high-quality fashion that empowers people to express
            their unique style without compromising on ethics or sustainability.
          </Typography>
        </Container>
      </Box>

      {/* STATS */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
          bgcolor: "#fafafa",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((item, i) => (
              <Grid key={i} item size={{ xs: 6, md: 3 }}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{ color: "#c026d3", mb: 1 }}
                  >
                    {item.value}
                  </Typography>

                  <Typography color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}