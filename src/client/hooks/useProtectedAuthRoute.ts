import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { auth } from '@/config/firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

const useProtectedAuthRoute = () => {
  const [user, loading, error] = useAuthState(auth)

  const router = useRouter()
  useEffect(() => {
    // If the user is not logged in, redirect to the specified URL
    if (!loading && user) {
      router.push('/home')
    }
  }, [user, loading])

  // You can also return the user state, loading, and error if needed
  return { user, loading, error }
}

export default useProtectedAuthRoute
