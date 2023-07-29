'use client'
import { ChangeEvent, useState, FormEvent } from 'react'
import { IStash } from '@/models/StashMode'

import useGetLoggedUser from '@/hooks/useGetLoggedUser'

import FieldSet from '@/components/Fieldset'

import { db } from '@/config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

const StashForm = () => {
  const [stash, setStash] = useState({ name: '' } as IStash)

  const currentUser = useGetLoggedUser()

  const stashesCollection = collection(db, 'stashes')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStash((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (!stash.name || !currentUser?.uid) return

      await addDoc(stashesCollection, {
        name: stash.name,
        user_id: currentUser?.uid,
      })

      setStash({} as IStash)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-secondary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] p-10 rounded-md">
      <FieldSet type="text" label="Naziv" name="name" onChange={handleChange} value={stash.name} />

      <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
        <button onClick={onSubmit} className="btn">
          Dodaj
        </button>
      </section>
    </form>
  )
}

export default StashForm
