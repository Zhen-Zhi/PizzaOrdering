import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

import OrderListItem from '@/components/OrderListItem';
import orders from '@asset/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import { OrderStatusList } from '@/types';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
        ListFooterComponent={
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  className={`border-sky-700 ${order.status == status ? 'bg-sky-700' : 'bg-transparent'}`}
                  key={status}
                  onPress={() => console.warn('Update status')}
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