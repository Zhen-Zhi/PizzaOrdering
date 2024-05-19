import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/provider/AuthProvider"
import { supabase } from "@/lib/supabase"
import { InsertTables } from "@/types"



export const useInsertOrderItems = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (orderItems: InsertTables<'order_items'>[]) => {
        const { data: newOrder, error } = await supabase
          .from('order_items')
          .insert(orderItems)
          .select()
          
        if (error) throw new Error(error.message)
        return newOrder
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['orders'] })
      }
    })
  )
}