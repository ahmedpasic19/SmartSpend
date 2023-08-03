'use client'
import { FormEvent, useState } from 'react'

import DatePicker from 'react-datepicker'

import { auth, db } from '@/config/firebase-config'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { IConfig } from '@/models/ConfigModel'

import 'react-datepicker/dist/react-datepicker.css'
const ConfigForm = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [user] = useAuthState(auth)

  const configCollection = collection(db, 'configs')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (!startDate || !endDate) return

      const q = query(configCollection, where('user_id', '==', user?.uid))
      const data = await getDocs(q)
      const userConfig = data.docs.map((doc) => ({ ...(doc.data() as IConfig), uid: doc.id }))
      const confg = userConfig[userConfig.length - 1] || ({} as IConfig)

      if (!Object.keys(confg).length) {
        await addDoc(configCollection, {
          startDate,
          endDate,
          user_id: user?.uid,
        })
      } else {
        const configRef = doc(db, 'configs', confg.uid)

        await updateDoc(configRef, {
          startDate,
          endDate,
          user_id: user?.uid,
        })
      }

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
        <DatePicker
          onChange={(date) => date && setStartDate(date)}
          placeholderText="Odaberite datum"
          selected={startDate}
          className="w-full bg-primary text-neutral outline-none p-2 pl-4"
          dateFormat="dd-MM-yyyy"
        />
      </fieldset>
      <fieldset>
        <label className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">Završni datum</label>
        <DatePicker
          onChange={(date) => date && setEndDate(date)}
          placeholderText="Odaberite datum"
          selected={endDate}
          className="w-full bg-primary text-neutral outline-none p-2 pl-4"
          dateFormat="dd-MM-yyyy"
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

export default ConfigForm
