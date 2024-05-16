import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

export const useProductList = () => {
  return (
    useQuery({
      queryKey: ['products'],
      queryFn: async () => {
        const { data, error } = await supabase.from('products').select('*')
        if(error) {
          throw new Error(error.message)
        }
        return data
      }
    })
  )
}

export const useProduct = (id: number) => {
  return(
    useQuery({
      queryKey: ['product', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()
        if (error) {
          throw new Error(error.message)
        }
        return data
      }
    })
  )
}

export const useInsertProduct = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: any) => {
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert({
            name: data.name,
            image: data.image,
            price: data.price,
          })

        if (error) {
          throw new Error(error.message)
        }

        return newProduct
      },
      async onSuccess() {
        await queryClient.invalidateQueries(['products'])
      }
    })
  )
}