import { StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/constants/Images';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useDelete, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')
  const [image, setImage] = useState<string | null>(null);
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString == 'string' ? idString : idString?.[0] ?? '0')

  const { data: updatingProduct } = useProduct(id)

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name)
      setImage(updatingProduct.image)
      setPrice(updatingProduct.price.toString())
    }
  }, [updatingProduct])

  const { mutate: insertProduct } = useInsertProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const { mutate: deleteProduct } = useDelete()

  const isUpdating = !!id

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
  
  const onSubmit = () => {
    if(!validateInput()) {
      return
    }
    if(isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onCreate = () => {
    console.warn(`Creating -- Name : ${name} , Price : ${price}`)

    insertProduct(
      { name, price: parseFloat(price), image},
      {
        onSuccess: () => {
          resetFields()
          router.back()
        }
      },
    )
  }

  const onUpdate = () => {
    console.warn(`Updating -- Name : ${name} , Price : ${price}`)

    updateProduct({id, name, price, image}, {
      onSuccess() {
        router.back()
        resetFields()
      }
    })
  }

  const confirmDelete = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel'
        }, 
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete
        }
      ]
    )
  }

  const onDelete = () => {
    deleteProduct(id,{
      onSuccess() {
        router.replace('/(admin)')
        resetFields()
      }
    })
    console.warn(`Deleting`)
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
      <Stack.Screen options={{ title: isUpdating ? 'Update product' : 'Create Product' }}/>
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
        <Text className='mb-1'>Name: </Text>
        <TextInput 
          value={name}
          className='bg-white p-2 rounded-xl'
          placeholder='This is placeholder'
          onChangeText={setName}
        />
      </View>
      <View className='my-3'>
        <Text className='mb-1'>Price: </Text>
        <TextInput 
          value={price}
          className='bg-white p-2 rounded-xl'
          placeholder='This is placeholder'
          keyboardType='numeric'
          onChangeText={setPrice}
        />
      </View>
      
      <Text className='text-red-500 font-semibold'>{error}</Text>
    <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit}/>
    {isUpdating && <Text onPress={confirmDelete} className='text-lg self-center font-semibold text-red-500'>Delete</Text>}
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({})