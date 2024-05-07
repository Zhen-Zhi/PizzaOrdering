import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'

import products from '@asset/data/products'
import Button from '@components/Button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/types'

const ProductListItemDetails = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { id } = useLocalSearchParams()
  const { addItem } = useCart()
  const router = useRouter()

  
  const product = products.find((product) => product.id.toString() == id)
  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']
  
  const addToCart = () => {
    if (!product) {
      return
    }

    addItem(product, selectedSize)
    router.push('/cart')
  }

  if (!product) {
    return (
      <Text>Error. Product not found</Text>
    )
  }

  return (
    <View className='p-3 bg-white flex-1'>
      <Stack.Screen options={{ title: product.name}} />
      <Image 
        className='w-full'
        style={styles.image}
        source={{ uri: product.image }}
      />
      <Text className='text-xl font-normal'>{product.name}</Text>
      <Text className='text-lg font-bold text-sky-600'>${product.price}</Text>
    </View>
  )
}

export default ProductListItemDetails

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1
  }
})