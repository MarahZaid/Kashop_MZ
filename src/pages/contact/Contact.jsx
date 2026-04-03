import { Box, Container, Grid, Typography, TextField, Button, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

const contactInfo = [
  { icon: <PhoneIcon sx={{ color: "#c026d3" }} />,       labelKey: "Phone",         valueKey: "contact_phone" },
  { icon: <EmailIcon sx={{ color: "#c026d3" }} />,       labelKey: "Email",         valueKey: "contact_email" },
  { icon: <AccessTimeIcon sx={{ color: "#c026d3" }} />,  labelKey: "Working Hours", valueKey: "contact_hours" },
  { icon: <LocationOnIcon sx={{ color: "#c026d3" }} />,  labelKey: "Location",      valueKey: "contact_location" },
];

const faqs = [
  { qKey: "faq_q1", aKey: "faq_a1" },
  { qKey: "faq_q2", aKey: "faq_a2" },
  { qKey: "faq_q3", aKey: "faq_a3" },
  { qKey: "faq_q4", aKey: "faq_a4" },
];

const badgeSx = { display: "inline-block", px: 2.5, py: 0.75, borderRadius: 999, bgcolor: "#f3e8ff", color: "#a21caf", fontWeight: 600, fontSize: 13, mb: 2 };

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">

        {/* HERO */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box component="span" sx={badgeSx}>{t("Contact Us")}</Box>
          <Typography variant="h2" fontWeight={700} sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 1.5 }}>{t("How can we help you?")}</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 480, mx: "auto", lineHeight: 1.8 }}>{t("contact_hero_desc")}</Typography>
        </Box>

        {/* MAIN GRID */}
        <Grid container spacing={3} alignItems="flex-start">

          {/* FORM */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "0.5px solid", borderColor: "divider" }}>
              <Typography fontWeight={700} fontSize={16} mb={2.5}>{t("Send a Message")}</Typography>
              <TextField fullWidth label={t("Full Name")} placeholder={t("name_placeholder")} sx={{ mb: 2 }} />
              <TextField fullWidth label={t("Email")} type="email" placeholder="example@email.com" sx={{ mb: 2 }} />
              <TextField fullWidth label={t("Subject")} placeholder={t("subject_placeholder")} sx={{ mb: 2 }} />
              <TextField fullWidth multiline rows={4} label={t("Message")} placeholder={t("message_placeholder")} sx={{ mb: 3 }} />
              <Button fullWidth variant="contained" size="large" sx={{ borderRadius: 2.5, py: 1.5, bgcolor: "#c026d3", "&:hover": { bgcolor: "#a21caf" }, fontWeight: 700 }}>{t("Send Message")}</Button>
            </Paper>
          </Grid>

          {/* INFO CARDS */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {contactInfo.map((item) => (
                <Paper key={item.labelKey} elevation={0} sx={{ p: 2, borderRadius: 3, border: "0.5px solid", borderColor: "divider", display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: 3, bgcolor: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</Box>
                  <Box>
                    <Typography fontSize={12} color="text.secondary" mb={0.3}>{t(item.labelKey)}</Typography>
                    <Typography fontSize={14} fontWeight={500}>{t(item.valueKey)}</Typography>
                  </Box>
                </Paper>
              ))}

              {/* MAP */}
              <Paper elevation={0} sx={{ height: 200, borderRadius: 3, border: "0.5px solid", borderColor: "divider", overflow: "hidden" }}>
                <MapContainer center={[32.2211, 35.2544]} zoom={13} style={{ width: "100%", height: "100%" }} zoomControl={false} scrollWheelZoom={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[32.2211, 35.2544]}><Popup>KaShop — Nablus</Popup></Marker>
                </MapContainer>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* FAQ */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box component="span" sx={badgeSx}>{t("FAQs")}</Box>
            <Typography fontWeight={700} fontSize={{ xs: "1.5rem", md: "2rem" }}>{t("Frequently Asked Questions")}</Typography>
          </Box>

          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            {faqs.map((faq) => (
              <Accordion key={faq.qKey} elevation={0} disableGutters sx={{ border: "0.5px solid", borderColor: "divider", borderRadius: "12px !important", mb: 1.5, overflow: "hidden", "&:before": { display: "none" }, "&.Mui-expanded": { "& .MuiAccordionSummary-root": { bgcolor: "#c026d3", color: "white", "& .MuiAccordionSummary-expandIconWrapper": { color: "white" } } } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1.5, fontWeight: 600, fontSize: 15, borderRadius: "12px", transition: "background 0.2s" }}>{t(faq.qKey)}</AccordionSummary>
                <AccordionDetails sx={{ px: 3, py: 2, borderTop: "0.5px solid", borderColor: "divider" }}>
                  <Typography fontSize={14} color="text.secondary" lineHeight={1.8}>{t(faq.aKey)}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}