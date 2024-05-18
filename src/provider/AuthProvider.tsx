import { View, Text } from 'react-native'
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { Tables } from '@/database.types'

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async() => {
      const { data: {session} } = await supabase.auth.getSession()
      setSession(session)

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setProfile(data);
      }

      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group == 'ADMIN' ?? false}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)