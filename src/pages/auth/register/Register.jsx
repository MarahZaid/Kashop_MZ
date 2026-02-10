import {
    Box,
    Button,
    TextField,
    Typography,
    Paper
} from '@mui/material'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../../validation/RegisterSchema'
import { GlassTextField } from '../GlassTextField'
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const registerForm = async (values) => {
        try {
            const response = await axios.post(
                'https://knowledgeshop.runasp.net/api/auth/Account/Register',
                values
            )
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background:
                    'linear-gradient(135deg,#0f172a,#111827,#1e1b4b)'
            }}
        >

            <Box
                sx={{
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background:
                        'linear-gradient(45deg,#a855f7,#ec4899)',
                    top: -150,
                    left: -150,
                    filter: 'blur(120px)',
                    opacity: 0.3
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background:
                        'linear-gradient(45deg,#9333ea,#6366f1)',
                    bottom: -150,
                    right: -150,
                    filter: 'blur(120px)',
                    opacity: 0.3
                }}
            />

            {/* Card */}
            <Paper
                elevation={10}
                sx={{
                    width: 600,
                    p: 5,
                    borderRadius: 4,
                    backdropFilter: 'blur(15px)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    zIndex: 2
                }}
            >
                {/* Title */}
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    mb={1}
                    sx={{
                        background: 'linear-gradient(45deg,#a855f7,#ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    KASHOP
                </Typography>

                <Typography textAlign="center" mb={4} color="gray">
                    Create your account
                </Typography>

                {/* FORM */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(registerForm)}
                    display="flex"
                    flexDirection="column"
                    gap={2}

                >
                    <GlassTextField
                        {...register("userName")}
                        label="User Name"
                        fullWidth
                        variant="outlined"
                        error={!!errors.userName}
                        helperText={errors.userName?.message}
                        
                    />

                    <GlassTextField
                        {...register('fullName')}
                        label="Full Name"
                        fullWidth
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                    />

                    <GlassTextField
                        {...register('email')}
                        label="Email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <GlassTextField
                        {...register('password')}
                        label="Password"
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <GlassTextField
                        {...register('phoneNumber')}
                        label="Phone Number"
                        fullWidth
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />

                    <Button
                        type="submit"
                        size="large"
                        sx={{
                            mt: 2,
                            py: 1.4,
                            borderRadius: 3,
                            fontWeight: 'bold',
                            background:
                                'linear-gradient(45deg,#a855f7,#ec4899)',
                            color: 'white',
                            '&:hover': {
                                opacity: 0.9
                            }
                        }}
                    >
                        Register
                    </Button>
                </Box>
                <Typography
  sx={{
    mt: 2,
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
  }}
>
  Already have an account?{" "}
  <Link
    component={RouterLink}
    to="/login"
    underline="none"
    sx={{
      color: "#d94fd5",
      fontWeight: 600,
      ml: 0.5,
      transition: "0.3s",
      "&:hover": {
        color: "#b45cff",
        textShadow: "0 0 8px rgba(217,79,213,0.6)",
      },
    }}
  >
    Login
  </Link>
</Typography>
            </Paper>
        </Box>
    )
}
