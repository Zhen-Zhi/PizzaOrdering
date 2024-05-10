import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { OrderItem } from '@/types'
import { defaultPizzaImage } from '@/constants/Images'

type OrderItemListItemProps = {
  orderDetails: OrderItem
}

const OrderItemListItem = ({ orderDetails }:OrderItemListItemProps) => {
  const sumPrice = () => orderDetails.quantity * orderDetails.products.price

  return (
    <View className='bg-white flex flex-row p-2'>
      <View>
        <Image
          className='w-20 aspect-square'
          source={{ uri: orderDetails.products.image || defaultPizzaImage}}
          resizeMode='contain'
        />
      </View>
      <View className='flex-1 flex-row justify-between'>
        <View className='justify-center p-3'>
          <Text className='text-lg font-semibold'>{orderDetails.products.name}</Text>
          <View className='flex flex-row'>
            <Text className='text-sky-700 font-bold'>${sumPrice()}</Text>
            <Text className='ml-3'>Size: {orderDetails.size}</Text>
          </View>
          
        </View>
        <View className='justify-center'>
          <Text className='text-lg font-bold'>{orderDetails.quantity}</Text>
        </View>
      </View>
    </View>
  )
}

export default OrderItemListItem

const styles = StyleSheet.create({})