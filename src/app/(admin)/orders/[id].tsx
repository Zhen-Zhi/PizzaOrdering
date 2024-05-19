import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { OrderStatusList } from '@/types';
import { useOrderDetails, useUpdateOrder } from '@/api/orders';
;
const OrderListItemDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString == 'string' ? idString : idString?.[0] ?? '0')

  const { data: order, isLoading, error } = useOrderDetails(id)
  const { mutate: updateOrder } = useUpdateOrder()

  const updateStatus = (status: string) => {
    updateOrder({ id: id, updatedFields: { status },})
  }

  if (isLoading) return <ActivityIndicator />
  if (error) return <Text>Error: {error.message}</Text>
  if (!order) return <Text>No order found</Text> 

  return (
    <View>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />

      <FlatList 
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderDetails={item} />}
        contentContainerStyle = {{ gap: 10, padding: 10 }}
        ListFooterComponent={
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  className={`border-sky-700 ${order.status == status ? 'bg-sky-700' : 'bg-transparent'}`}
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                  }}
                >
                  <Text
                    className={`${order.status == status ? 'text-white' : 'text-sky-700'}`}
                    // style={{
                    //   color:
                    //     order.status === status ? 'white' : Colors.light.tint,
                    // }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
      />
    </View>
  )
}

export default OrderListItemDetailsScreen

const styles = StyleSheet.create({})