import { Tables } from "@/database.types"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/provider/AuthProvider"
import { InsertTables } from "@/types"
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

export const useInsertOrder = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: InsertTables<'orders'>) => {
        const { data: newOrder, error } = await supabase
          .from('orders')
          .insert({
            total: data.total
          })
          
        if (error) throw new Error(error.message)
        return newOrder
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['orders'] })
      }
    })
  )
}