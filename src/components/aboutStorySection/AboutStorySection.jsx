import { Box, Container, Grid, Typography } from "@mui/material";
import siteIcon from "../../assets/hero-pg.jpg"
export default function AboutStorySection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          direction={{ xs: "column-reverse", md: "row" }}
        >
          {/* TEXT */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{ mb: 3 }}
            >
              From Passion to Purpose
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.9 }}
            >
              What started as a small collection of handcrafted accessories has
              grown into a global fashion destination, but our core values
              remain unchanged. We believe that beautiful design and ethical
              practices can coexist.
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.9 }}
            >
              Every piece in our collection is thoughtfully designed and
              carefully crafted. We work directly with artisans and
              manufacturers who share our commitment to fair wages, safe
              working conditions, and sustainable practices.
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ lineHeight: 1.9 }}
            >
              Our journey has been shaped by our incredible community of
              customers who inspire us every day. Your support enables us to
              continue pushing boundaries while staying true to our mission.
            </Typography>
          </Grid>

          {/* IMAGE */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={siteIcon} // نفس صورة الهيرو
              alt="Our Store"
              sx={{
                width: "100%",
                height: { xs: 320, md: 560 },
                objectFit: "cover",
                borderRadius: 4,
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}