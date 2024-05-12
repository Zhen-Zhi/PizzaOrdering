import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, withLayoutContext } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator() {
  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top']}>
      <TopTabs />
    </SafeAreaView>
  )
}