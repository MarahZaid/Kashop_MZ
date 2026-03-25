import { useOutletContext } from "react-router-dom";
import { Box, Typography, Divider, Chip } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useTranslation } from "react-i18next";

const statusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":    return { bg: "#dcfce7", color: "#16a34a" };
    case "cancelled": return { bg: "#fee2e2", color: "#dc2626" };
    case "pending":   return { bg: "#fef9c3", color: "#ca8a04" };
    default:          return { bg: "#f3f4f6", color: "#6b7280" };
  }
};

const paymentColor = (status, t) => {
  if (!status)          return { bg: "#fef3c7", color: "#d97706", label: t('Pending') };
  if (status === "paid") return { bg: "#dcfce7", color: "#16a34a", label: t('Paid') };
  return { bg: "#fee2e2", color: "#dc2626", label: status };
};

function OrderCard({ order }) {
  const { t, i18n } = useTranslation();
  const sc = statusColor(order.status);
  const pc = paymentColor(order.paymentStatus, t);
  const date = new Date(order.orderDate).toLocaleDateString(
    i18n.language === "ar" ? "ar-EG" : "en-GB",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <Box
      sx={{
        border: "1px solid #ececf3", borderRadius: "14px", p: 2.5,
        display: "flex", flexDirection: { xs: "column", sm: "row" },
        alignItems: { sm: "center" }, gap: 2, transition: "all 0.2s",
        "&:hover": { borderColor: "#c026d3", boxShadow: "0 4px 20px rgba(192,38,211,0.1)" },
      }}
    >
      {/* Icon */}
      <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "linear-gradient(135deg, rgba(192,38,211,0.12), rgba(168,85,247,0.12))", display: "flex", alignItems: "center", justifyContent: "center", color: "#c026d3", flexShrink: 0 }}>
        <ShoppingBagOutlinedIcon />
      </Box>

      {/* Info */}
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 700, color: "#111", fontSize: "0.95rem" }}>
          {t('Order #', { id: order.id })}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
          <CalendarTodayOutlinedIcon sx={{ fontSize: 13, color: "#aaa" }} />
          <Typography sx={{ fontSize: "0.8rem", color: "#aaa" }}>{date}</Typography>
        </Box>
      </Box>

      {/* Amount */}
      <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#111", minWidth: 80, textAlign: { sm: "right" } }}>
        ${order.amountPaid.toLocaleString()}
      </Typography>

      {/* Badges */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Chip label={t(order.status)} size="small" sx={{ background: sc.bg, color: sc.color, fontWeight: 700, fontSize: "0.75rem", border: "none" }} />
        <Chip label={pc.label} size="small" sx={{ background: pc.bg, color: pc.color, fontWeight: 700, fontSize: "0.75rem", border: "none" }} />
      </Box>
    </Box>
  );
}

export default function ProfileOrders() {
  const { data } = useOutletContext();
  const orders = data?.orders ?? [];
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1.15rem", color: "#111" }}>
          {t('My Orders')}
        </Typography>
        <Chip
          label={`${orders.length} ${t('orders')}`}
          size="small"
          sx={{ background: "linear-gradient(135deg, #c026d3, #a855f7)", color: "#fff", fontWeight: 700, fontSize: "0.78rem" }}
        />
      </Box>
      <Typography sx={{ fontSize: "0.88rem", color: "#aaa", mb: 3 }}>
        {t('All your purchase history')}
      </Typography>
      <Divider sx={{ mb: 2.5 }} />

      {orders.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 6, color: "#ccc" }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography>{t('No orders yet')}</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Box>
      )}
    </Box>
  );
}