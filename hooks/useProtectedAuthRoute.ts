import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth/cordova'

const useProtectedAuthRoute = () => {
  const [user, setUser] = useState({} as User)

  const router = useRouter()

  onAuthStateChanged(auth, (user) => user && setUser(user))

  // Redirect if logged in
  useEffect(() => {
    if (Object.keys(user).length) router.push('/home')
  }, [user])
}

export default useProtectedAuthRoute
