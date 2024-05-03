import { View } from 'react-native'
import React from 'react'

import products from '@asset/data/products'
import ProductListItem from '@components/ProductListItem'

const MenuScreen = () => {
  return (
    <View>
      <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} />
    </View>
  )
}

export default MenuScreen