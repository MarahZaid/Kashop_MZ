import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Typography, Avatar, Chip, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Loader from "../../ui/loader/Loader";
import useProfile from "../../hooks/useProfile";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { data, isLoading, isError, error } = useProfile();
  console.log(data);
  const location = useLocation();
  const isOrders = location.pathname.includes("orders");
  const { t } = useTranslation();

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );

  const navLink = (to, label, icon, active) => (
    <RouterLink to={to} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex", alignItems: "center", gap: 1.5,
          px: 2.5, py: 1.5, borderRadius: "12px",
          fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s",
          color: active ? "#fff" : "text.secondary",
          background: active ? "linear-gradient(135deg, #c026d3, #a855f7)" : "transparent",
          boxShadow: active ? "0 4px 14px rgba(192,38,211,0.35)" : "none",
          "&:hover": {
            background: active ? "linear-gradient(135deg, #c026d3, #a855f7)" : "rgba(192,38,211,0.08)",
            color: active ? "#fff" : "#c026d3",
          },
        }}
      >
        {icon}
        {label}
      </Box>
    </RouterLink>
  );

  return (
    <Box sx={{ minHeight: "100vh", py: 6, px: { xs: 2, md: 6 } }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>

        {/* Header Card */}
        <Paper elevation={0} sx={{
          borderRadius: "20px", p: { xs: 3, md: 4 }, mb: 4,
          border: "1px solid ", borderColor: "divider",
          display: "flex", flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" }, gap: 3,
          position: "relative", overflow: "hidden",
          "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #c026d3, #a855f7, #ec4899)" },
        }}>
          <Avatar sx={{ width: 72, height: 72, background: "linear-gradient(135deg, #c026d3, #a855f7)", fontSize: "1.8rem", fontWeight: 700, flexShrink: 0, boxShadow: "0 6px 20px rgba(192,38,211,0.3)" }}>
            {data?.fullName?.charAt(0) ?? "U"}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.4rem", lineHeight: 1.2 }}>
              {data?.fullName ?? "—"}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mt: 0.5 }}>{data?.email ?? "—"}</Typography>
            {data?.phoneNumber && (
              <Typography ssx={{ color: "text.secondary", fontSize: "0.9rem", mt: 0.5 }}>{data.phoneNumber}</Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={`${data?.orders?.length ?? 0} ${t('orders')}`}
              size="small"
              sx={{ background: "linear-gradient(135deg, #c026d3, #a855f7)", color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}
            />
            {data?.city && (
              <Chip
                label={data.city}
                size="small"
                variant="outlined"
                sx={{ borderColor: "divider", color: "text.secondary", fontSize: "0.8rem" }}
              />
            )}
          </Box>
        </Paper>

        {/* Layout: Sidebar + Content */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexDirection: { xs: "column", md: "row" } }}>

          {/* Sidebar Nav */}
          <Paper elevation={0} sx={{ borderRadius: "18px", border: "1px solid", borderColor: "divider", p: 2, minWidth: 200, width: { xs: "100%", md: 220 }, flexShrink: 0 }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "text.disabled", textTransform: "uppercase", letterSpacing: 1, px: 2, mb: 1 }}>
              {t('Navigation')}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {navLink("", t('My Info'), <PersonIcon sx={{ fontSize: 18 }} />, !isOrders)}
              {navLink("orders", t('My Orders'), <ShoppingBagIcon sx={{ fontSize: 18 }} />, isOrders)}
            </Box>
          </Paper>

          {/* Main Content */}
          <Paper elevation={0} sx={{ borderRadius: "18px", border: "1px solid", borderColor: "divider", p: { xs: 3, md: 4 }, flex: 1, minHeight: 300 }}>
            <Outlet context={{ data }} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}