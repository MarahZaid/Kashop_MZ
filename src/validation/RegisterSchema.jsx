import * as yup from "yup";

export const registerSchema = yup.object({
        userName: yup.string()
            .required("userName is required")
            .min(3, "userName must be at least 3 characters")
            .matches(/^[a-zA-Z0-9_-]+$/, "userName must contain only letters, numbers, underscores, and hyphens"),

        fullName: yup.string()
            .required("fullName is required"),

        email: yup.string()
            .email("email must be a valid email")
            .required("email is required"),

        password: yup.string()
            .required("password is required")
            .min(6, "password must be at least 6 characters")
            .matches(/[A-Z]/, "password must contain at least one uppercase letter")
            .matches(/[a-z]/, "password must contain at least one lowercase letter")
            .matches(/\d/, "password must contain at least one number")
            .matches(/[@$!%*?&]/, "password must contain at least one special character"),

         phoneNumber: yup.string().required('Phone number is required'),
    });