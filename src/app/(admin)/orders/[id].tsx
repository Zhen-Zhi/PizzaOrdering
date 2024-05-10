import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

import OrderListItem from '@/components/OrderListItem';
import orders from '@asset/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';

const OrderListItemDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => (order.id.toString() === id))

  if (!order) {
    return <Text>Order Not Found</Text>
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
      <OrderListItem order={order} />

      <FlatList 
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderDetails={item} />}
        contentContainerStyle = {{ gap: 10, padding: 10 }}
      />
    </View>
  )
}

export default OrderListItemDetailsScreen

const styles = StyleSheet.create({})