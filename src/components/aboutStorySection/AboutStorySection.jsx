
import { Box, Container, Grid, Typography } from "@mui/material";
import siteIcon from "../../assets/hero-pg.jpg";
import { useTranslation } from 'react-i18next';

export default function AboutStorySection() {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>

          {/* TEXT */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" fontWeight={700} sx={{ mb: 3 }}>{t('From Passion to Purpose')}</Typography>
            <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>{t('about_story_1')}</Typography>
            <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>{t('about_story_2')}</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>{t('about_story_3')}</Typography>
          </Grid>

          {/* IMAGE */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box component="img" src={siteIcon} alt="Our Store" sx={{ width: "100%", height: { xs: 320, md: 560 }, objectFit: "cover", borderRadius: 4, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }} />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
