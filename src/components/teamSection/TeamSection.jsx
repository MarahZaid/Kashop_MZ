import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar
} from "@mui/material";
import team1 from "../../assets/team1.jpg"
import team2 from "../../assets/team2.jpg"
import team3 from "../../assets/team3.jpg"
import team4 from "../../assets/team4.jpg"


import { useTranslation } from 'react-i18next';

export default function TeamSection() {
  const { t } = useTranslation();

  const team = [
    { name: "Sarah Chen", role: t("Founder & CEO"), image: team1 },
    { name: "Marcus Williams", role: t("Creative Director"), image: team2 },
    { name: "Emily Rodriguez", role: t("Head of Design"), image: team3 },
    { name: "David Park", role: t("Operations Lead"), image: team4 },
  ];
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#fff" }}>
      <Container maxWidth="lg" disableGutters>

        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            {t('Meet Our Team')}
          </Typography>
          <Typography color="text.secondary">
           {t('team_desc')}
          </Typography>
        </Box>

        {/* Team Grid */}
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {team.map((member) => (
            <Grid item size={{xs:12, sm:6, md:3}} key={member.name}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: 200,
                    height: 200,
                    mx: "auto",
                    mb: 3
                  }}
                />
                <Typography fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}