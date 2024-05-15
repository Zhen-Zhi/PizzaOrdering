import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router'

import products from '@asset/data/products'
import Button from '@components/Button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useProduct } from '@/api/products'
import { defaultPizzaImage } from '@/constants/Images'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductListItemDetails = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString == 'string' ? idString : idString?.[0] ?? '0')

  const { data: product, error, isLoading } = useProduct(id)

  const { addItem } = useCart()
  const router = useRouter()

  ///////////////////         functions              ////////////////////
  
  // const addToCart = () => {
  //   if (!product) {
  //     return
  //   }

  //   addItem(product, selectedSize)
  //   router.push('/cart')
  // }

  //////////////////        conditional return         ////////////////

  if (error) {
    return (
      <Text>Error. {error.message}</Text>
    )
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  ///////////////        main return         ////////////////////

  return (
    <View className='p-3 bg-white flex-1'>
      <Stack.Screen options={{
            title: product.name,
            headerRight: () => (
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }} />
      <Image 
        className='w-full'
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage}}
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