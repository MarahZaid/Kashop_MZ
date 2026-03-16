
import { useMutation } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'
Tabnine | Edit | Test | Explain | Document
export default function useAddToCart() {
    const mutation = useMutation({
        mutationFn: async (values) => {
            return await authAxiosInstance.post('/Carts', {
                ProductId: values.ProductId,
            })
            Count: values.Count
        },onSuccess: () => {
            queryClient.invalidateQueries(
                {queryKey: ['carts']}
            )
        }
    })
    return mutation;
}