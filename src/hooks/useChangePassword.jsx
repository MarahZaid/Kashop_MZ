import { useMutation } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useChangePassword() {
    const mutation = useMutation({
        mutationFn: async ({ CurrentPassword, NewPassword, ConfirmNewPassword }) => {
            return await authAxiosInstance.patch('/Profile/change-password', {
                CurrentPassword,
                NewPassword,
                ConfirmNewPassword
            })
        }
    })

    return mutation
}