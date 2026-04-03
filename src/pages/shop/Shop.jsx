import { useState } from "react";
import { Box, Container, Grid, Typography, Link, TextField, Select, MenuItem, FormControl, Slider, Button, Chip, InputAdornment, Skeleton, Pagination, Paper, List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link as RouterLink } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";
import ProductCard from "../../ui/product/ProductCard";
import { useTranslation } from 'react-i18next';

const PRODUCTS_PER_PAGE = 12;

const chipSx = (theme) => ({ bgcolor: theme.palette.mode === "dark" ? "#3b0764" : "#fdf4ff", color: "#c026d3", border: "1px solid #e879f9" });
const selectedSx = (theme) => ({ "&.Mui-selected": { bgcolor: theme.palette.mode === "dark" ? "#3b0764" : "#fdf4ff", color: "#c026d3" }, "&.Mui-selected:hover": { bgcolor: "#fdf4ff" } });

export default function Shop() {
  const { t } = useTranslation();

  const SORT_OPTIONS = [
    { value: "",       label: t("Default") },
    { value: "price",  label: t("Price") },
    { value: "rate",   label: t("Rating") },
    { value: "name",   label: t("Name") },
  ];

  const [search, setSearch]                 = useState("");
  const [searchInput, setSearchInput]       = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange]         = useState([0, 5000]);
  const [appliedPrice, setAppliedPrice]     = useState([0, 5000]);
  const [sortBy, setSortBy]                 = useState("");
  const [ascending, setAscending]           = useState(true);
  const [page, setPage]                     = useState(1);
  const [openCategories, setOpenCategories] = useState(true);
  const [openPrice, setOpenPrice]           = useState(true);
  const [openSort, setOpenSort]             = useState(true);

  const activeFiltersCount = [selectedCategory, appliedPrice[0] > 0 || appliedPrice[1] < 5000, sortBy, search].filter(Boolean).length;

  const { data, isLoading, isError, error } = useProducts({ limit: PRODUCTS_PER_PAGE, page, category: selectedCategory, minPrice: appliedPrice[0] > 0 ? appliedPrice[0] : "", maxPrice: appliedPrice[1] < 5000 ? appliedPrice[1] : "", sortBy, ascending, search });
  const { data: categoriesData } = useCategories();
  const categories  = categoriesData?.response?.data || [];
  const products    = selectedCategory ? (Array.isArray(data?.response) ? data.response : []) : (data?.response?.data || []);
  const totalPages  = selectedCategory ? 1 : (data?.response?.totalPages || 1);

  const handleApplyFilters = () => { setSearch(searchInput); setAppliedPrice(priceRange); setPage(1); };
  const handleClearFilters = () => { setSearchInput(""); setSearch(""); setSelectedCategory(""); setPriceRange([0, 5000]); setAppliedPrice([0, 5000]); setSortBy(""); setAscending(true); setPage(1); };
  const handleCategoryClick = (cat) => { setSelectedCategory(cat === selectedCategory ? "" : cat); setPage(1); };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>

      {/* HEADER */}
      <Box sx={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", py: 6, mb: 5 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Link component={RouterLink} to="/" sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}>{t('Home')}</Link>
            <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>/</Typography>
            <Typography sx={{ color: "white", fontSize: 14 }}>{t('Products')}</Typography>
          </Box>
          <Typography variant="h3" fontWeight={700} color="white" sx={{ mb: 1 }}>
            {t('Explore Our')}{" "}
            <Box component="span" sx={{ background: "linear-gradient(45deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t('Products')}</Box>
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 16 }}>{t('shop_header_desc')}</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* SIDEBAR */}
          <Grid item size={{ xs: 12, md: 3 }}>
            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", overflow: "hidden", position: "sticky", top: 20 }}>

              {/* Header */}
              <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid", borderColor: "divider" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FilterListIcon sx={{ color: "#c026d3" }} />
                  <Typography fontWeight={700} fontSize={16}>{t('Filters')}</Typography>
                  {activeFiltersCount > 0 && <Chip label={activeFiltersCount} size="small" sx={{ bgcolor: "#c026d3", color: "white", height: 20, fontSize: 11 }} />}
                </Box>
                {activeFiltersCount > 0 && <Button size="small" onClick={handleClearFilters} startIcon={<CloseIcon fontSize="small" />} sx={{ color: "text.secondary", textTransform: "none", fontSize: 12 }}>{t('Clear all')}</Button>}
              </Box>

              {/* Search */}
              <Box sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}>
                <TextField fullWidth size="small" placeholder={t('Search products...')} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: "#94a3b8" }} /></InputAdornment> }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "&:hover fieldset": { borderColor: "#c026d3" }, "&.Mui-focused fieldset": { borderColor: "#c026d3" } } }}
                />
              </Box>

              {/* Categories */}
              <Box sx={{ border: "1px solid", borderColor: "divider" }}>
                <Box onClick={() => setOpenCategories(!openCategories)} sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                  <Typography fontWeight={600} fontSize={14}>{t('Categories')}</Typography>
                  {openCategories ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </Box>
                <Collapse in={openCategories}>
                  <List dense disablePadding sx={{ px: 1, pb: 1.5 }}>
                    <ListItemButton selected={selectedCategory === ""} onClick={() => handleCategoryClick("")} sx={{ borderRadius: 2, mb: 0.5, ...selectedSx }}> <ListItemText primary={t('All Categories')} primaryTypographyProps={{ fontSize: 13 }} /></ListItemButton>
                    {categories.map((cat) => (
                      <ListItemButton key={cat.id || cat} selected={selectedCategory === (cat.id || cat)} onClick={() => handleCategoryClick(cat.id || cat)} sx={{ borderRadius: 2, mb: 0.5, ...selectedSx }}>
                        <ListItemText primary={cat.name || cat} primaryTypographyProps={{ fontSize: 13 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>

              {/* Price */}
              <Box sx={{ border: "1px solid", borderColor: "divider" }}>
                <Box onClick={() => setOpenPrice(!openPrice)} sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                  <Typography fontWeight={600} fontSize={14}>{t('Price Range')}</Typography>
                  {openPrice ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </Box>
                <Collapse in={openPrice}>
                  <Box sx={{ px: 2.5, pb: 2.5 }}>
                    <Slider value={priceRange} onChange={(_, val) => setPriceRange(val)} min={0} max={5000} step={50} valueLabelDisplay="auto" valueLabelFormat={(v) => `$${v}`} sx={{ color: "#c026d3", "& .MuiSlider-thumb": { "&:hover": { boxShadow: "0 0 0 8px rgba(192,38,211,0.15)" } } }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" fontSize={12}>${priceRange[0]}</Typography>
                      <Typography variant="body2" color="text.secondary" fontSize={12}>${priceRange[1]}</Typography>
                    </Box>
                  </Box>
                </Collapse>
              </Box>

              {/* Sort */}
              <Box sx={{ border: "1px solid", borderColor: "divider" }}>
                <Box onClick={() => setOpenSort(!openSort)} sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                  <Typography fontWeight={600} fontSize={14}>{t('Sort By')}</Typography>
                  {openSort ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </Box>
                <Collapse in={openSort}>
                  <Box sx={{ px: 2.5, pb: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <FormControl size="small" fullWidth>
                      <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} displayEmpty sx={{ borderRadius: 2, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#c026d3" } }}>
                        {SORT_OPTIONS.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <FormControl size="small" fullWidth>
                      <Select value={ascending} onChange={(e) => setAscending(e.target.value)} sx={{ borderRadius: 2, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#c026d3" } }}>
                        <MenuItem value={true}>{t('Ascending')} ↑</MenuItem>
                        <MenuItem value={false}>{t('Descending')} ↓</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Collapse>
              </Box>

              {/* Apply */}
              <Box sx={{ p: 2.5 }}>
                <Button fullWidth variant="contained" onClick={handleApplyFilters} sx={{ bgcolor: "#c026d3", borderRadius: 2, py: 1.2, fontWeight: 700, textTransform: "none", fontSize: 14, boxShadow: "0 4px 15px rgba(192,38,211,0.3)", "&:hover": { bgcolor: "#a21caf" } }}>{t('Apply Filters')}</Button>
              </Box>
            </Paper>
          </Grid>

          {/* PRODUCTS AREA */}
          <Grid item size={{ xs: 12, md: 9 }}>

            {/* Top bar */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography color="text.secondary" fontSize={14}>{isLoading ? t('Loading...') : `${products.length} ${t('products found')}`}</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {selectedCategory && <Chip label={`${t('Category')}: ${selectedCategory}`} size="small" onDelete={() => { setSelectedCategory(""); setPage(1); }} sx={chipSx} />}
                {(appliedPrice[0] > 0 || appliedPrice[1] < 5000) && <Chip label={`$${appliedPrice[0]} – $${appliedPrice[1]}`} size="small" onDelete={() => { setAppliedPrice([0, 5000]); setPriceRange([0, 5000]); setPage(1); }} sx={chipSx} />}
                {search && <Chip label={`"${search}"`} size="small" onDelete={() => { setSearch(""); setSearchInput(""); setPage(1); }} sx={chipSx} />}
              </Box>
            </Box>

            {isError && <Box sx={{ textAlign: "center", py: 8, color: "error.main" }}><Typography>{error?.message || "Something went wrong."}</Typography></Box>}

            {/* Grid */}
            <Grid container spacing={2.5}>
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => <Grid item size={{ xs: 12, sm: 6, lg: 4 }} key={i}><Skeleton variant="rounded" height={380} sx={{ borderRadius: 3 }} /></Grid>)
                : products.length === 0
                  ? <Grid item size={{ xs: 12 }}>
                      <Box sx={{ textAlign: "center", py: 12 }}>
                        <Typography fontSize={48} mb={2}>🔍</Typography>
                        <Typography variant="h6" fontWeight={600} mb={1}>{t('No products found')}</Typography>
                        <Typography color="text.secondary" mb={3}>{t('no_products_desc')}</Typography>
                        <Button variant="outlined" onClick={handleClearFilters} sx={{ borderColor: "#c026d3", color: "#c026d3", borderRadius: 2, textTransform: "none" }}>{t('Clear Filters')}</Button>
                      </Box>
                    </Grid>
                  : products.map((product) => (
                      <Grid item size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
                        <Link component={RouterLink} to={`/products/${product.id}`} underline="none" color="inherit" sx={{ display: "block" }}>
                          <ProductCard product={product} />
                        </Link>
                      </Grid>
                    ))
              }
            </Grid>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination count={totalPages} page={page} onChange={(_, val) => { setPage(val); window.scrollTo({ top: 0, behavior: "smooth" }); }} shape="rounded"
                  sx={{ "& .MuiPaginationItem-root": { "&.Mui-selected": { bgcolor: "#c026d3", color: "white" }, "&:hover": { bgcolor: "#fdf4ff" } } }}
                />
              </Box>
            )}
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}