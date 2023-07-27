import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth/cordova'

const useProtectedRoute = () => {
  const [user, setUser] = useState({} as User)

  const router = useRouter()

  onAuthStateChanged(auth, (user) => user && setUser(user))

  // Redirect if NOT logged in
  useEffect(() => {
    if (!Object.keys(user).length) router.push('/')
  }, [user])
}

export default useProtectedRoute
