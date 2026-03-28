import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axiosInstance'

export default function useForgotPassword() {
    const sendCode = useMutation({
        mutationFn: async ({ email }) => {
            return await axiosInstance.post('auth/Account/SendCode', { email })
        }
    })

    const resetPassword = useMutation({
        mutationFn: async ({ email, code, newPassword }) => {
            return await axiosInstance.patch('auth/Account/ResetPassword', {
                email,
                code,
                newPassword
            })
        }
    })

    return { sendCode, resetPassword }
}