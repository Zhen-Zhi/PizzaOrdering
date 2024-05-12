import { Pressable } from "react-native"
import { Stack, Link } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }}/>
    </Stack>
  )   
}