import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublicIcon from "@mui/icons-material/Public";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useTranslation } from 'react-i18next';

export default function ValuesSection() {
  const { t } = useTranslation();

  const values = [
    { title: t("Quality First"),  description: t("quality_first_desc"), icon: <FavoriteBorderIcon /> },
    { title: t("Sustainability"), description: t("sustainability_desc"), icon: <PublicIcon /> },
    { title: t("Community"),      description: t("community_desc"),      icon: <PeopleOutlineIcon /> },
    { title: t("Innovation"),     description: t("innovation_desc"),     icon: <AutoAwesomeOutlinedIcon /> },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">

        {/* Title */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h4" fontWeight={700} mb={1}>{t('Our Values')}</Typography>
          <Typography color="text.secondary">{t('values_desc')}</Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={4}>
          {values.map((item, index) => (
            <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper elevation={0} sx={{ p: 4, height: "100%", borderRadius: 4, transition: "0.3s", "&:hover": { transform: "translateY(-6px)" } }}>
                <Box sx={{ width: 48, height: 48, mb: 3, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", bgcolor: "#fae8ff", color: "#c026d3" }}>{item.icon}</Box>
                <Typography fontWeight={600} mb={1}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}