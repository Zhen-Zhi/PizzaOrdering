import { StyleSheet, Text, View, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

import { useCart } from '@/provider/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {
  const { items, total, checkout } = useCart()

  return (
    <View className='p-3 flex-1'>
      <FlatList 
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={ item } />}
        contentContainerStyle = {{ gap: 10}}
      />

      <View className='mt-auto'>
        <Text className='text-lg font-medium'>Total: ${total.toFixed(2)}</Text>
        <Button text='checkout' onPress={checkout}/>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})