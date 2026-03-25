import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box, Typography, Divider, TextField, Button,
  Collapse, Alert, CircularProgress, IconButton, InputAdornment,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useTranslation } from "react-i18next";
import useChangeEmail from "../../hooks/useChangeEmail";
import useChangePassword from "../../hooks/useChangePassword";

const accentGradient = "linear-gradient(135deg, #c026d3, #a855f7)";

const styledInput = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px", fontSize: "0.92rem",
    "&:hover fieldset": { borderColor: "#c026d3" },
    "&.Mui-focused fieldset": { borderColor: "#c026d3", borderWidth: "1.5px" },
  },
  "& label.Mui-focused": { color: "#c026d3" },
};

const submitBtn = {
  background: accentGradient, color: "#fff", fontWeight: 700,
  borderRadius: "10px", px: 3, py: 1.1, textTransform: "none", fontSize: "0.9rem",
  boxShadow: "0 4px 14px rgba(192,38,211,0.25)",
  "&:hover": { opacity: 0.9, boxShadow: "0 6px 18px rgba(192,38,211,0.35)" },
  "&:disabled": { opacity: 0.6 },
};

function InfoRow({ icon, label, value }) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.8, px: 2, borderRadius: "12px", transition: "background 0.15s", "&:hover": { background: "#faf5ff" } }}>
      <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: "linear-gradient(135deg, rgba(192,38,211,0.12), rgba(168,85,247,0.12))", display: "flex", alignItems: "center", justifyContent: "center", color: "#c026d3", flexShrink: 0 }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontSize: "0.72rem", color: "#aaa", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.97rem", color: value ? "#222" : "#ccc", fontWeight: 500 }}>
          {value ?? t('Not provided')}
        </Typography>
      </Box>
    </Box>
  );
}

function SectionToggle({ icon, title, subtitle, open, onToggle }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex", alignItems: "center", gap: 2, p: 2,
        borderRadius: "12px", cursor: "pointer", border: "1.5px solid",
        borderColor: open ? "#c026d3" : "#ececf3",
        background: open ? "rgba(192,38,211,0.04)" : "#fafafa",
        transition: "all 0.2s",
        "&:hover": { borderColor: "#c026d3", background: "rgba(192,38,211,0.04)" },
      }}
    >
      <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: open ? accentGradient : "linear-gradient(135deg, rgba(192,38,211,0.12), rgba(168,85,247,0.12))", display: "flex", alignItems: "center", justifyContent: "center", color: open ? "#fff" : "#c026d3", flexShrink: 0, transition: "all 0.2s" }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111" }}>{title}</Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "#aaa" }}>{subtitle}</Typography>
      </Box>
      <EditOutlinedIcon sx={{ color: open ? "#c026d3" : "#ccc", fontSize: 18, transition: "color 0.2s" }} />
    </Box>
  );
}

function ChangeEmailForm() {
  const [newEmail, setNewEmail] = useState("");
  const { mutate, isPending, isSuccess, isError, error, reset } = useChangeEmail();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    mutate({ NewEmail: newEmail }, { onSuccess: () => setNewEmail("") });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, px: 1 }}>
      <TextField
        label={t('New Email')} type="email" value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        required fullWidth size="small" sx={styledInput}
      />
      {isSuccess && <Alert severity="success" sx={{ borderRadius: "10px" }}>{t('Email updated successfully!')}</Alert>}
      {isError && <Alert severity="error" sx={{ borderRadius: "10px" }}>{error?.response?.data?.message ?? t('Something went wrong')}</Alert>}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" disabled={isPending || !newEmail} sx={submitBtn}>
          {isPending ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : t('Update Email')}
        </Button>
      </Box>
    </Box>
  );
}

function ChangePasswordForm() {
  const [form, setForm] = useState({ CurrentPassword: "", NewPassword: "", ConfirmNewPassword: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const { mutate, isPending, isSuccess, isError, error, reset } = useChangePassword();
  const { t } = useTranslation();

  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));
  const toggleShow = (field) => setShow((p) => ({ ...p, [field]: !p[field] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    mutate(form, {
      onSuccess: () => setForm({ CurrentPassword: "", NewPassword: "", ConfirmNewPassword: "" }),
    });
  };

  const eyeBtn = (field) => (
    <InputAdornment position="end">
      <IconButton onClick={() => toggleShow(field)} edge="end" size="small">
        {show[field] ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
      </IconButton>
    </InputAdornment>
  );

  const passwordsMatch = form.NewPassword === form.ConfirmNewPassword;
  const allFilled = form.CurrentPassword && form.NewPassword && form.ConfirmNewPassword;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, px: 1 }}>
      <TextField
        label={t('Current Password')} type={show.current ? "text" : "password"}
        value={form.CurrentPassword} onChange={handleChange("CurrentPassword")}
        required fullWidth size="small"
        InputProps={{ endAdornment: eyeBtn("current") }} sx={styledInput}
      />
      <TextField
        label={t('New Password')} type={show.new ? "text" : "password"}
        value={form.NewPassword} onChange={handleChange("NewPassword")}
        required fullWidth size="small"
        InputProps={{ endAdornment: eyeBtn("new") }} sx={styledInput}
      />
      <TextField
        label={t('Confirm New Password')} type={show.confirm ? "text" : "password"}
        value={form.ConfirmNewPassword} onChange={handleChange("ConfirmNewPassword")}
        required fullWidth size="small"
        error={!!form.ConfirmNewPassword && !passwordsMatch}
        helperText={form.ConfirmNewPassword && !passwordsMatch ? t("Passwords don't match") : ""}
        InputProps={{ endAdornment: eyeBtn("confirm") }} sx={styledInput}
      />
      {isSuccess && <Alert severity="success" sx={{ borderRadius: "10px" }}>{t('Password changed successfully!')}</Alert>}
      {isError && <Alert severity="error" sx={{ borderRadius: "10px" }}>{error?.response?.data?.message ?? t('Something went wrong')}</Alert>}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" disabled={isPending || !allFilled || !passwordsMatch} sx={submitBtn}>
          {isPending ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : t('Change Password')}
        </Button>
      </Box>
    </Box>
  );
}

export default function ProfileInfo() {
  const { data } = useOutletContext();
  const [openSection, setOpenSection] = useState(null);
  const { t } = useTranslation();

  const toggle = (section) => setOpenSection((prev) => (prev === section ? null : section));

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: "1.15rem", color: "#111", mb: 0.5 }}>
        {t('Personal Information')}
      </Typography>
      <Typography sx={{ fontSize: "0.88rem", color: "#aaa", mb: 3 }}>
        {t('View your details and update your credentials')}
      </Typography>
      <Divider sx={{ mb: 1 }} />

      <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
        <InfoRow icon={<PersonOutlineIcon fontSize="small" />} label={t('Full Name')} value={data?.fullName} />
        <InfoRow icon={<EmailOutlinedIcon fontSize="small" />} label={t('Email')} value={data?.email} />
        <InfoRow icon={<PhoneOutlinedIcon fontSize="small" />} label={t('Phone')} value={data?.phoneNumber} />
        <InfoRow icon={<LocationOnOutlinedIcon fontSize="small" />} label={t('City')} value={data?.city} />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <SectionToggle
            icon={<EmailOutlinedIcon fontSize="small" />}
            title={t('Change Email')}
            subtitle={t('Update your login email address')}
            open={openSection === "email"}
            onToggle={() => toggle("email")}
          />
          <Collapse in={openSection === "email"}>
            <ChangeEmailForm />
          </Collapse>
        </Box>

        <Box>
          <SectionToggle
            icon={<LockOutlinedIcon fontSize="small" />}
            title={t('Change Password')}
            subtitle={t('Update your account password')}
            open={openSection === "password"}
            onToggle={() => toggle("password")}
          />
          <Collapse in={openSection === "password"}>
            <ChangePasswordForm />
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}