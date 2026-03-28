import { useMutation } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'
import { useQueryClient } from '@tanstack/react-query'

export default function useAddReview(productId) {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ Rating, Comment }) => {
            return await authAxiosInstance.post(`/Products/${productId}/reviews`, {
                Rating,
                Comment
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product', productId] })
        }
    })

    return mutation
}