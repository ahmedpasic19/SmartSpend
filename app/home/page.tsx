'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { auth } from '@/config/firebase-config'
import { signOut, onAuthStateChanged, User } from 'firebase/auth'

export default function Home() {
  const [user, setUser] = useState({} as User)

  const router = useRouter()

  // Sign out
  const logOut = () => {
    signOut(auth)
    router.push('/')
  }

  // Check if logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!user || !Object.keys(user).length) router.push('/home')
  }, [user])

  return (
    <main className="page grid grid-rows-[20%_auto]">
      <section className="bg-secondary w-full p-5">
        <div>
          <label>Total:</label>
          <p>000.000</p>
        </div>

        <button onClick={() => router.push('/transactions/add')}>Dodaj transakciju</button>
        {/* <button>Dodaj transakciju</button> */}
      </section>

      <section className="w-full">
        List of transactions
        <ul></ul>
      </section>
    </main>
  )
}
