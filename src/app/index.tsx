import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, router, useRouter } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const { session, loading, profile, isAdmin } = useAuth()
  const router = useRouter()

  if(loading) {
    return <ActivityIndicator />
  }

  if(!session) {
    return <Redirect href={'/sign-in'} />
  }

  if(!isAdmin) {
    return <Redirect href={'/(user)'} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      {/* <Link href={'/(admin)'} asChild> */}
        <Button text="Admin" onPress={() => {
          router.push('/(admin)')
        }} />
      {/* </Link> */}
      <Button text="Sign out" onPress={() => supabase.auth.signOut()}/>
    </View>
  );
};

export default index;