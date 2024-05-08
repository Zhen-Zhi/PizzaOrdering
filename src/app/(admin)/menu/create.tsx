import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/constants/Images';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')
  const [image, setImage] = useState<string | null>(null);

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  const validateInput = () => {
    setError('')
    if(!name) {
      setError('Name is required')
      return false
    }
    if(!price) {
      setError('Price is required')
      return false
    }
    if(isNaN(parseFloat(price))) {
      setError('Price must be a number')
      return false
    }

    return true
  }

  const onCreate = () => {
    if(!validateInput()) {
      return
    }

    console.warn(`Name : ${name} , Price : ${price}`)

    resetFields()
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className='flex-1 justify-center p-3'>
      <Stack.Screen options={{ title: 'Create Product' }}/>
      <Image 
        className='w-2/4 aspect-square self-center'
        source = {{ uri: image || defaultPizzaImage }}
      />
      <Text 
        className='text-lg text-sky-600 font-semibold self-center my-2'
        onPress={pickImage}
      >
        Select Image
      </Text>

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
      
      <Text className='text-red-500 font-semibold'>{error}</Text>
      <Button text='Create' onPress={onCreate}/>
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({})