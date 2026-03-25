import { Box, Container, Grid, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useTranslation } from 'react-i18next';





export default function FeaturesSection() {
  const { t } = useTranslation();

   const features = [
    {
      icon: <LocalShippingOutlinedIcon sx={{ color: "#c026d3" }} />,
      title: t("Free Shipping"),
      desc: t("free_shipping_desc"),
    },
    {
      icon: <SecurityOutlinedIcon sx={{ color: "#c026d3" }} />,
      title: t("Secure Payment"),
      desc: t("secure_payment_desc"),
    },
    {
      icon: <ReplayOutlinedIcon sx={{ color: "#c026d3" }} />,
      title: t("Easy Returns"),
      desc: t("easy_returns_desc"),
    },
    {
      icon: <SupportAgentOutlinedIcon sx={{ color: "#c026d3" }} />,
      title: t("24/7 Support"),
      desc: t("support_desc"),
    },
  ];
  
  return (
    <Box sx={{ py: 7, width: "100%" }}>
      <Container maxWidth="lg">

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                {/* Icon Box */}
                <Box
                  sx={{
                    backgroundColor: "#fae8ff",
                    borderRadius: 3,
                    p: 1.5,
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </Box>

                {/* Text */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      lineHeight: 1.2,
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.9rem",
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </Box>

            </Grid>
          ))}
        </Grid>

      </Container>

      {/* Divider */}
      <Box
        sx={{
          mt: 7,
          borderBottom: "1px solid #e3e3e3",
        }}
      />
    </Box>
  );
}