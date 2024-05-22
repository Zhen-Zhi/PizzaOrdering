import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'

import Button from '@components/Button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/types'
import { useProduct } from '@/api/products'
import { defaultPizzaImage } from '@/constants/Images'
import RemoteImage from '@/components/RemoteImage'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductListItemDetails = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString == 'string' ? idString : idString?.[0] ?? '0')
  
  const { data: product, error, isLoading } = useProduct(id)
  const { addItem } = useCart()
  const router = useRouter()

  //////////////////          function           /////////////////////

  const addToCart = () => {
    if (!product) {
      return
    }

    addItem(product, selectedSize)
    router.push('/cart')
  }

  //////////////////           condition return         ///////////////////

  if (error) {
    return (
      <Text>Error. {error.message}</Text>
    )
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  /////////////////          main return            ////////////////////

  return (
    <View className='p-3 bg-white flex-1'>
      <Stack.Screen options={{ title: product?.name ?? 'Product not found'}} />
      <RemoteImage 
        className='w-full'
        style={styles.image}
        path={product?.image}
        fallback={defaultPizzaImage}
      />

      <Text>Select size</Text>
      <View className='flex-row justify-around'>
        {sizes.map((size) => (
          <Pressable className={`w-[50] h-[50] rounded-[25px] justify-center my-3 
            ${selectedSize == size ? 'bg-slate-300' : 'bg-white'}`}
            onPress={() => setSelectedSize(size)}
            key={size}
          >
            {/* style={{ backgroundColor: selectedSize == size ? 'gainsboro' : 'white' }}> */}
            <Text className='text-lg font-medium text-center'
              style={{ color: selectedSize == size ? 'black' : 'gray'  }}>
                {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text className='text-lg font-bold text-sky-400 mt-auto'>${product?.price ?? 0}</Text>
      <Button onPress={addToCart} text='Add to cart'/>
    </View>
  )
}

export default ProductListItemDetails

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1
  }
})