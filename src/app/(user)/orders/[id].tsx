import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

import OrderListItem from '@/components/OrderListItem';
import orders from '@asset/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import { useOrderDetails } from '@/api/orders';

const OrderListItemDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString == 'string' ? idString : idString?.[0] ?? '0')

  const { data: order, isLoading, error } = useOrderDetails(id)

  if (isLoading) return <ActivityIndicator />
  if (error) return <Text>Error: {error.message}</Text>;
  if (!order) return <Text>Order not found</Text>

  return (
    <View>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
      <OrderListItem order={order} />

      {/* <FlatList 
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderDetails={item} />}
        contentContainerStyle = {{ gap: 10, padding: 10 }}
      /> */}
    </View>
  )
}

export default OrderListItemDetailsScreen

const styles = StyleSheet.create({})