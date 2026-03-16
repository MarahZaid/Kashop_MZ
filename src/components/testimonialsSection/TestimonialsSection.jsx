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

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: 10, background: "#f9fafb" }}>
      <Container maxWidth="lg">
        
        {/* TITLE */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            What Our Customers Say
          </Typography>

          <Typography color="text.secondary">
            Join thousands of satisfied customers who love shopping with us
          </Typography>
        </Box>

        {/* CARDS */}
        <Grid container spacing={4}>
          
          <Grid item size={{xs:12, md:4}}>
            <TestimonialCard
              text={`"Luxe has become my go-to for quality basics and statement pieces. The attention to detail and customer service is unmatched."`}
              name="Alexandra Chen"
              city="Los Angeles, CA"
              img=""
            />
          </Grid>

          <Grid item  size={{xs:12, md:4}}>
            <TestimonialCard
              text={`"Finally found a brand that balances quality, style, and sustainability. Every purchase has exceeded my expectations."`}
              name="Marcus Johnson"
              city="Chicago, IL"
              img=""
            />
          </Grid>

          <Grid item  size={{xs:12, md:4}}>
            <TestimonialCard
              text={`"The cashmere sweater is hands down the softest thing I own. Worth the investment for pieces that last.  Exceeded my expectations."`}
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
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "center",
            gap: 6,
            flexWrap: "wrap"
          }}
        >
          <Typography color="text.secondary">
            Trustpilot
          </Typography>

          <Typography color="text.secondary">
            SSL Secured
          </Typography>

          <Typography color="text.secondary">
            Verified Reviews
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}


