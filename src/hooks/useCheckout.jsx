import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useCheckout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (paymentMethod) => {
            return await authAxiosInstance.post('/Checkouts', { PaymentMethod: paymentMethod })
        },
        onSuccess: (response) => {
            if (response.data.url) {
                location.href = response.data.url;
            }
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        }
    })
}