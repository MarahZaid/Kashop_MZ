import { useMutation } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useChangeEmail() {
    const mutation = useMutation({
        mutationFn: async ({ NewEmail }) => {
            return await authAxiosInstance.patch('/Profile/change-email', {
                NewEmail
            })
        }
    })

    return mutation
}