import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { Product } from '../types'

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps = {
    product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View className="bg-white p-3 border rounded-2xl">
      <View>
        <Image 
            className="w-full" 
            source={{ uri: product.image || defaultPizzaImage }} 
            style={styles.image}
        />
      </View>
      <View>
        <Text className="text-lg font-bold" style={styles.text}>{product.name}</Text>
      </View>
      <View>
        <Text className="text-sky-600">${product.price}</Text>
      </View>
    </View>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
    text: {
      color: 'black', 
    },
    image: {
      aspectRatio: 1,
    },
  })