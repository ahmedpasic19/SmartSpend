import { useState, useEffect } from 'react'
import { auth } from '@/config/firebase-config'
import { User, onAuthStateChanged } from 'firebase/auth'

const useGetLoggedUser = () => {
  const [user, setUser] = useState<User | null>(null) // Set initial state to null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    // Clean up the event listener when the component unmounts or the hook is re-executed
    return () => unsubscribe()
  }, []) // Empty dependency array ensures this effect runs only once after initial render

  return user
}

export default useGetLoggedUser
