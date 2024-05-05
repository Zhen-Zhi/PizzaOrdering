import { View, Text } from 'react-native'
import { randomUUID } from 'expo-crypto'
import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import { CartItem, Product } from '@/types'

type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: 1 | -1) => void
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {}
})

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, size: CartItem['size']) => {
    const newCartItem: CartItem = {
      id: randomUUID(),
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    }

    setItems([ newCartItem, ...items ])
  }

  const updateQuantity = (itemId: string, amount: 1 | -1) => {
    console.log(itemId, amount)
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => useContext(CartContext)