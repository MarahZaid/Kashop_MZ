import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";


export default function ProductCard({ product }) {
 


  return (
    <Card
      sx={{
        borderRadius: 5,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        p:2,
        position: "relative",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
        // 
        "&:hover .hover-button": {
          opacity: 1,
          transform: "translateY(0)",
        }
      }}
    >

      {/* IMAGE */}
      <Box
        sx={{
          height: 350,
           backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1e1e2e" : "#f3f4f6",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          sx={{
            height: "100%",
            objectFit: "cover",
            border:"#bbbbbb solid 1px",
            borderRadius: 5
          }}
        />
      <Box
          className="hover-button"
          sx={{
            position: "absolute",
            bottom: 15,
            left: 0,
            right: 0,
            px: 2,
            opacity: 0, 
            transform: "translateY(10px)", 
            transition: "0.3s ease-in-out",
            display: 'flex',
            gap: 1
          }}
        >
          
        </Box>
      </Box>

      {/* INFO */}
      <Box sx={{ mt: 2 }}>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1
          }}
        >
          

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 16, color: "#fbbf24" }} />
            <Typography variant="body2">{product.rate}</Typography>
          </Box>
        </Box>

        <Typography fontWeight={500}>
          {product.name || "Product Name"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontWeight: 500
          }}
        >
          ${product.price}
        </Typography>

      </Box>

    </Card>
  );
}