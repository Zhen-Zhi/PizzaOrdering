import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Link, useSegments } from 'expo-router'

import { defaultPizzaImage } from '@/constants/Images'
import { Tables } from '@/database.types'
import RemoteImage from './RemoteImage'

type ProductListItemProps = {
    product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable className="bg-white p-3 rounded-2xl flex-1" style={styles.container}>
        <View>
          <RemoteImage 
              className="w-full" 
              path={product.image}
              fallback={defaultPizzaImage}
              style={styles.image}
              resizeMode='contain'
          />
        </View>
        <View>
          <Text className="text-lg font-bold" style={styles.text}>{product.name}</Text>
        </View>
        <View>
          <Text className="text-sky-600">${product.price}</Text>
        </View>
      </Pressable>
    </Link>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
      maxWidth: '50%'
    },
    text: {
      color: 'black', 
    },
    image: {
      aspectRatio: 1,
    },
  })