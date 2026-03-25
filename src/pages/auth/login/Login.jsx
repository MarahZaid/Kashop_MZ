import {
  Box,
  Button,
  Typography,
  Paper,
  Link
} from "@mui/material";

import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validation/LoginSchema";
import { GlassTextField } from "./../../../ui/GlassTextField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useTranslation } from 'react-i18next';


export default function Login() {
   const { t } = useTranslation();

  const setToken = useAuthStore((state)=>state.setToken);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), mode:'onBlur'
  });

  const loginForm = async (values) => {
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/auth/Account/Login",
        values
      );
      if (response.status === 200){
        setToken(response.data.accessToken);
        navigate('/');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#0f172a,#111827,#1e1b4b)",
      }}
    >
      {/* Blobs */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "linear-gradient(45deg,#a855f7,#ec4899)",
          top: -150,
          left: -150,
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "linear-gradient(45deg,#9333ea,#6366f1)",
          bottom: -150,
          right: -150,
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />

      {/* Card */}
      <Paper
        elevation={10}
        sx={{
          width: 500,
          p: 5,
          borderRadius: 4,
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          zIndex: 2,
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
          sx={{
            background: "linear-gradient(45deg,#a855f7,#ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          KASHOP
        </Typography>

        <Typography textAlign="center" mb={4} color="gray">
          {t('Login to your account')}
        </Typography>

        {/* FORM */}
        <Box
          component="form"
          onSubmit={handleSubmit(loginForm)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <GlassTextField
            {...register("email")}
            label={t('Email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <GlassTextField
            {...register("password")}
            label={t('Password')}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            size="large"
            sx={{
              mt: 2,
              py: 1.4,
              borderRadius: 3,
              fontWeight: "bold",
              background:
                "linear-gradient(45deg,#a855f7,#ec4899)",
              color: "white",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {t('Login')}
          </Button>
        </Box>

        {/* Register link */}
        <Typography
          sx={{
            mt: 2,
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
          }}
        >
          {t("Don't have an account?")}
          <Link
            component={RouterLink}
            to="/register"
            underline="none"
            sx={{
              color: "#d94fd5",
              fontWeight: 600,
              ml: 0.5,
              "&:hover": {
                color: "#b45cff",
                textShadow:
                  "0 0 8px rgba(217,79,213,0.6)",
              },
            }}
          >
            {t('Register')}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}