import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const onCreate = () => {
    console.warn(`Name : ${name} , Price : ${price}`)

    setName('')
    setPrice('')
  }

  return (
    <View className='flex-1 justify-center p-3'>
      <View className='my-3'>
        <Text>Name: </Text>
        <TextInput 
          value={name}
          className='bg-white'
          placeholder='This is placeholder'
          onChangeText={setName}
        />
      </View>
      <View className='my-3'>
        <Text>Price: </Text>
        <TextInput 
          value={price}
          className='bg-white'
          placeholder='This is placeholder'
          keyboardType='numeric'
          onChangeText={setPrice}
        />
      </View>
      
      <Button text='Create' onPress={onCreate}/>
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({})