'use client'
import { FormEvent, useState } from 'react'

import useGetUserConfig from '@/hooks/api/useGetUserConfig'
import useGetLoggedUser from '@/hooks/useGetLoggedUser'

import { db } from '@/config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

const DateForm = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const configCollection = collection(db, 'configs')

  const currentUser = useGetLoggedUser()
  const userConfig = useGetUserConfig()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (!startDate || !endDate) return
      if (!Object.keys(userConfig).length)
        await addDoc(configCollection, {
          startDate,
          endDate,
          user_id: currentUser?.uid,
        })

      setStartDate(new Date())
      setEndDate(new Date())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-secondary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] p-10 rounded-md">
      <fieldset>
        <label className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">Početni datum</label>
        <input
          type="date"
          onChange={(e) => setStartDate(new Date(e.target.value))}
          placeholder="Odaberite datum"
          className="w-full bg-primary text-neutral outline-none p-2 pl-4"
        />
      </fieldset>
      <fieldset>
        <label className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">Završni datum</label>
        <input
          type="date"
          onChange={(e) => setStartDate(new Date(e.target.value))}
          placeholder="Odaberite datum"
          className="w-full bg-primary text-neutral outline-none p-2 pl-4"
        />
      </fieldset>

      <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
        <button onClick={onSubmit} className="btn">
          Postavi
        </button>
      </section>
    </form>
  )
}

export default DateForm
