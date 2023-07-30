'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { auth } from '@/config/firebase-config'
import { signOut, onAuthStateChanged, User } from 'firebase/auth'

import '@/app/globals.css'

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
        <ul className="flex flex-col">
          <Link className="link" href="/transactions/add">
            Dodaj transakciju
          </Link>
          <Link className="link" href="/stashes/add">
            Dodaj stash
          </Link>
          <Link className="link" href="/categories/add">
            Dodaj kategorije
          </Link>
        </ul>
        <button onClick={logOut}>Log out</button>
      </section>

      <section className="w-full">
        List of transactions
        <ul></ul>
      </section>
    </main>
  )
}
