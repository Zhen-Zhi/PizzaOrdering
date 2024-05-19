import { Tables } from "@/database.types"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/provider/AuthProvider"
import { InsertTables, UpdateTables } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAdminOrderList = ({ archived = false }) => {
  const status = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']

  return (
    useQuery({
      queryKey: ['orders', archived],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .in('status', status)
          .order('created_at', { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        return data
      }
    })
  )
}

export const useMyOrderList = () => {
  const { session } = useAuth()
  const id = session?.user.id
  
  return (
    useQuery({
      queryKey: ['order', { userId: id }],
      queryFn: async () => {
        if (!id) return null
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        return data
      }
    })
  )
}

export const useOrderDetails = (id: number) => {
  return (
    useQuery({
      queryKey: ['orders', id ],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, products(*))')
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

export const useInsertOrder = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const user_id = session?.user.id

  return (
    useMutation({
      mutationFn: async (data: InsertTables<'orders'>) => {
        const { data: newOrder, error } = await supabase
          .from('orders')
          .insert({ ...data, user_id:user_id })
          .select()
          .single()
          
        if (error) throw new Error(error.message)
        return newOrder
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['orders'] })
      }
    })
  )
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
        id,
        updatedFields
      }: {
        id: number,
        updatedFields: UpdateTables<'orders'>
      }) => {
        const { data: updatedProduct, error } = await supabase
          .from('orders')
          .update(updatedFields)
          .eq('id', id)
          .single();

        if (error) {
          throw new Error(error.message)
        }
        
        return updatedProduct
      },
      async onSuccess(_, { id }) {
        await queryClient.invalidateQueries({ queryKey: ['orders', id] })
        await queryClient.invalidateQueries({ queryKey: ['orders'] })
      }
    })
  )
}