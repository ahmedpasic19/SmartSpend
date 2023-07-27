'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ITransaction } from '@/models/TransactionModel'

import FieldSet from '@/components/Fieldset'

import { db } from '@/config/firebase-config'
import { auth } from '@/config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

const TransactionForm = () => {
  const [transaction, setTransaction] = useState({} as ITransaction)

  const transactionCollectionRef = collection(db, 'transactions')

  const currentUserID = auth.currentUser?.uid

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: FormEvent) => {
    try {
      if (!currentUserID) return

      await addDoc(transactionCollectionRef, {
        ...transaction,
        user_id: currentUserID,
      })

      setTransaction({} as ITransaction)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-secondary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] p-10 rounded-md ">
      <h3 className="text-2xl text-neutral font-bold tracking-tight w-full text-center pb-4">Dodaj transakciju</h3>

      <FieldSet label="Iznos" name="amount" value={transaction.amount} onChange={handleChange} type="number" />

      <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
        <button onClick={onSubmit} className="btn">
          Dodaj
        </button>
      </section>
    </form>
  )
}

export default TransactionForm
