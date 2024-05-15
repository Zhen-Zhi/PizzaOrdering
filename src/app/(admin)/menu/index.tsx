import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import React from 'react'

import products from '@asset/data/products'
import ProductListItem from '@components/ProductListItem'
import { useProductList } from '@/api/products'

const MenuScreen = () => {
  const { data: products, error, isLoading } = useProductList()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View>
      <FlatList 
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  )
}

export default MenuScreen