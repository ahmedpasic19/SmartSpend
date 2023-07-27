'use client'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import FieldSet from '@/components/Fieldset'
import GoogleLogo from '@/assets/google_logo.png'

import { auth, googleProvider } from '@/config/firebase-config'
import { signInWithEmailAndPassword, signInWithRedirect, onAuthStateChanged, User } from 'firebase/auth'

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [user, setUser] = useState({} as User)

  const router = useRouter()

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
    if (Object.keys(user).length) router.push('/home')
  }, [user])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((perv) => ({ ...perv, [e.target.name]: e.target.value }))
  }

  const signIn = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
    } catch (error) {
      console.log(error)
    }
  }

  const signInWithGoogle = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await signInWithRedirect(auth, googleProvider)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={signIn} className="bg-secondary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] p-10 rounded-md">
      <h3 className="text-2xl text-neutral font-bold tracking-tight w-full text-center pb-4">Log in</h3>

      <FieldSet value={loginData.email} label="Email" name="email" type="text" onChange={handleChange} />
      <FieldSet value={loginData.password} label="Password" name="password" type="password" onChange={handleChange} />

      <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
        <button onClick={signIn} className="btn">
          Log in
        </button>

        <button
          onClick={signInWithGoogle}
          className="bg-gray-100 text-secondary p-2 font-bold tracking-wide w-full text-lg rounded-sm flex justify-evenly items-center"
        >
          <div>
            <Image alt="Google logo" src={GoogleLogo} className="object-contain h-6 w-6 mr-2" />
          </div>
          <p>Log in with Google</p>
        </button>
      </section>
    </form>
  )
}

export default LoginForm
