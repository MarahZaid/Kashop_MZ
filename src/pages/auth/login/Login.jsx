import {
  Box,
  Button,
  Typography,
  Paper,
  Link,
  IconButton
} from "@mui/material";
import { useState } from "react";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validation/LoginSchema";
import { GlassTextField } from "./../../../ui/GlassTextField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useTranslation } from 'react-i18next';
import axiosInstance from "../../../api/axiosInstance";
import useForgotPassword from "../../../hooks/useForgotPassword";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


export default function Login() {
  const { t } = useTranslation();

  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), mode: 'onBlur'
  });

  const [loginError, setLoginError] = useState('');

  const loginForm = async (values) => {
    setLoginError('');
    try {
      const response = await axiosInstance.post("auth/Account/Login", values);
      if (response.status === 200) {
        setToken(response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message;
      if (message === "Account is locked , try again Later") {
        setLoginError(t('account_locked'));
      } else {
        setLoginError(t('invalid_credentials'));
      }
    }
  };

  const { sendCode, resetPassword } = useForgotPassword();
  const [forgotStep, setForgotStep] = useState(null); 
  const [forgotEmail, setForgotEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSendCode = async () => {
    setForgotError('');
    sendCode.mutate({ email: forgotEmail }, {
      onSuccess: () => setForgotStep('reset'),
      onError: () => setForgotError(t('email_not_found'))
    });
  };

  const handleResetPassword = async () => {
    setForgotError('');
    resetPassword.mutate({ email: forgotEmail, code, newPassword }, {
      onSuccess: () => setForgotStep('success'),
      onError: () => setForgotError(t('invalid_code'))
    });
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
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(p => !p)}
                  edge="end"
                  sx={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
              )
            }}
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
          {loginError && (
            <Box sx={{
              mt: 1, p: 1.5, borderRadius: 2,
              background: 'rgba(248, 113, 113, 0.15)',
              border: '1px solid rgba(248, 113, 113, 0.3)',
              textAlign: 'center'
            }}>
              <Typography fontSize={13} color="#f87171">
                {loginError}
              </Typography>
            </Box>
          )}
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
        {/* Forgot Password Link */}
        {!forgotStep && (
          <Typography
            onClick={() => setForgotStep('email')}
            sx={{
              mt: 1, textAlign: 'center', fontSize: 13,
              color: "#a855f7", cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {t('Forgot Password?')}
          </Typography>
        )}

        {/* STEP 1: Enter Email */}
        {forgotStep === 'email' && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography fontWeight={600} color="white" fontSize={15}>
              {t('Enter your email to receive a code')}
            </Typography>
            <GlassTextField
              label={t('Email')}
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            {forgotError && (
              <Typography fontSize={13} color="#f87171">{forgotError}</Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth variant="outlined"
                onClick={() => { setForgotStep(null); setForgotError(''); }}
                sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 2 }}
              >
                {t('Cancel')}
              </Button>
              <Button
                fullWidth
                disabled={sendCode.isPending || !forgotEmail}
                onClick={handleSendCode}
                sx={{
                  borderRadius: 2, fontWeight: 'bold', color: 'white',
                  background: 'linear-gradient(45deg,#a855f7,#ec4899)',
                  '&:hover': { opacity: 0.9 }
                }}
              >
                {sendCode.isPending ? t('Sending...') : t('Send Code')}
              </Button>
            </Box>
          </Box>
        )}

        {/* STEP 2: Enter Code + New Password */}
        {forgotStep === 'reset' && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography fontWeight={600} color="white" fontSize={15}>
              {t('Enter the code sent to your email')}
            </Typography>
            <GlassTextField
              label={t('Code')}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <GlassTextField
              label={t('New Password')}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {forgotError && (
              <Typography fontSize={13} color="#f87171">{forgotError}</Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth variant="outlined"
                onClick={() => { setForgotStep(null); setForgotError(''); }}
                sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 2 }}
              >
                {t('Cancel')}
              </Button>
              <Button
                fullWidth
                disabled={resetPassword.isPending || !code || !newPassword}
                onClick={handleResetPassword}
                sx={{
                  borderRadius: 2, fontWeight: 'bold', color: 'white',
                  background: 'linear-gradient(45deg,#a855f7,#ec4899)',
                  '&:hover': { opacity: 0.9 }
                }}
              >
                {resetPassword.isPending ? t('Resetting...') : t('Reset Password')}
              </Button>
            </Box>
          </Box>
        )}

        {/* STEP 3: Success */}
        {forgotStep === 'success' && (
          <Box sx={{ mt: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography fontSize={40}>✓</Typography>
            <Typography fontWeight={700} color="white">{t('Password reset successfully!')}</Typography>
            <Button
              fullWidth
              onClick={() => setForgotStep(null)}
              sx={{
                borderRadius: 2, fontWeight: 'bold', color: 'white',
                background: 'linear-gradient(45deg,#a855f7,#ec4899)',
                '&:hover': { opacity: 0.9 }
              }}
            >
              {t('Back to Login')}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}