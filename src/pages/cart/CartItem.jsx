import {
    Box, Typography, IconButton, Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import useProduct from "../../hooks/useProduct";
import { useTranslation } from 'react-i18next';

export default function CartItem({ item, onRemove, onUpdate, isRemoving, isUpdating }) {
    const { t } = useTranslation();
    const { data } = useProduct(item.productId);
    const image = data?.response?.image;
    const productName = data?.response?.name || item.productName;

    return (

        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,

                border: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                transition: "0.2s",
                "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }
            }}
        >
            {/* IMAGE */}
            <Box sx={{
                width: 100, height: 100, borderRadius: 2,
                overflow: "hidden", bgcolor: "#ffffff", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
            }}>
                {image
                    ? <img src={image} alt={item.productName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    : <ShoppingBagOutlinedIcon sx={{ color: "#cbd5e1", fontSize: 32 }} />
                }
            </Box>

            {/* INFO */}
            <Box sx={{ flex: 1 }}>
                <Typography fontWeight={700} fontSize={15}>{productName}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    ${item.price} {t('each')}
                </Typography>

                {/* QUANTITY */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
                    <IconButton
                        size="small"
                        disabled={item.count <= 1 || isUpdating}
                        onClick={() => onUpdate({ productId: item.productId, count: item.count - 1 })}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider", borderRadius: 1.5, width: 30, height: 30,
                            "&:hover": { borderColor: "#c026d3", color: "#c026d3" }
                        }}
                    >
                        <RemoveIcon sx={{ fontSize: 16 }} />
                    </IconButton>

                    <Typography fontWeight={700} sx={{ minWidth: 28, textAlign: "center" }}>
                        {item.count}
                    </Typography>

                    <IconButton
                        size="small"
                        disabled={isUpdating}
                        onClick={() => onUpdate({ productId: item.productId, count: item.count + 1 })}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider", borderRadius: 1.5, width: 30, height: 30,
                            "&:hover": { borderColor: "#c026d3", color: "#c026d3" }
                        }}
                    >
                        <AddIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* PRICE + DELETE */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                <IconButton
                    size="small"
                    disabled={isRemoving}
                    onClick={() => onRemove(item.productId)}
                    sx={{ color: "#94a3b8", "&:hover": { color: "error.main" } }}
                >
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
                <Typography fontWeight={800} fontSize={16}>${item.totalPrice}</Typography>
            </Box>
        </Paper>
    );
}