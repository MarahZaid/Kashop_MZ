import {
  Box,
  Container,
  Typography,
  Grid,
  Paper
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublicIcon from "@mui/icons-material/Public";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const values = [
  {
    title: "Quality First",
    description:
      "We source only the finest materials and work with skilled artisans to create products that last.",
    icon: <FavoriteBorderIcon />,
  },
  {
    title: "Sustainability",
    description:
      "Committed to ethical sourcing and eco-friendly practices throughout our supply chain.",
    icon: <PublicIcon />,
  },
  {
    title: "Community",
    description:
      "Building meaningful connections with our customers and giving back to communities in need.",
    icon: <PeopleOutlineIcon />,
  },
  {
    title: "Innovation",
    description:
      "Constantly evolving our designs and processes to bring you the best in modern fashion.",
    icon: <AutoAwesomeOutlinedIcon />,
  },
];

export default function ValuesSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fafafa" }}>
      <Container maxWidth="lg">

        {/* Title */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            mb={1}
          >
            Our Values
          </Typography>

          <Typography
            color="text.secondary"
          >
            The principles that guide everything we do
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={4}>
          {values.map((item, index) => (
            <Grid item size={{xs:12,sm:6, md:3}} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "14px",
                    bgcolor: "#fae8ff",
                    color: "#c026d3",
                  }}
                >
                  {item.icon}
                </Box>

                {/* Text */}
                <Typography
                  fontWeight={600}
                  mb={1}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}