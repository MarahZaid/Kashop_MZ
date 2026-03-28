import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Chip
} from "@mui/material";

import TestimonialCard from "../../ui/TestimonialCard";
import { useTranslation } from 'react-i18next';

export default function TestimonialsSection() {
  const { t } = useTranslation();
  return (
    <Box sx={{
      py: 10,
      backgroundColor: (theme) => theme.palette.mode === "dark" ? "#0f172a" : "#f9fafb",
    }}>
      <Container maxWidth="lg">

        {/* TITLE */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {t('What Our Customers Say')}
          </Typography>

          <Typography color="text.secondary">
            {t('testimonials_desc')}
          </Typography>
        </Box>

        {/* CARDS */}
        <Grid container spacing={4}>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TestimonialCard
              text={t('testimonial_1')}
              name="Alexandra Chen"
              city="Los Angeles, CA"
              img=""
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TestimonialCard
              text={t('testimonial_2')}
              name="Marcus Johnson"
              city="Chicago, IL"
              img=""
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TestimonialCard
              text={t('testimonial_3')}
              name="Sophie Williams"
              city="Miami, FL"
              img=""
            />
          </Grid>

        </Grid>

        {/* TRUST BAR */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            gap: 6,
            flexWrap: "wrap"
          }}
        >
          <Typography color="text.secondary">
            {t('Trustpilot')}
          </Typography>

          <Typography color="text.secondary">
            {t('SSL Secured')}
          </Typography>

          <Typography color="text.secondary">
            {t('Verified Reviews')}
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}


