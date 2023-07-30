'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ITransaction } from '@/models/TransactionModel'

import useGetLoggedUser from '@/hooks/useGetLoggedUser'
import useGetUserStashes from '@/hooks/api/useGetUserStashes'
import useGetStashCategories from '@/hooks/api/useGetStashCategories'

import FieldSet from '@/components/Fieldset'
import Select from 'react-select'
import Link from 'next/link'

import { db } from '@/config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

type TSelect = { label: string; value: string }

const TransactionForm = () => {
  const [transaction, setTransaction] = useState({} as ITransaction)
  const [selectedStash, setSelectedStash] = useState({} as TSelect)
  const [selectedCategory, setSelectedCategory] = useState({} as TSelect)
  const [type, setType] = useState({} as TSelect)

  const transactionCollection = collection(db, 'transactions')

  const currentUser = useGetLoggedUser()

  const stashes = useGetUserStashes()
  const stashCategories = useGetStashCategories(selectedStash.value)

  // select option
  const stashOptions = stashes.map((stash) => ({ label: stash.name, value: stash.uid }))
  const categoryOptions = stashCategories.map((cat) => ({ label: cat.name, value: cat.uid }))
  const transactionTypeOptions = [
    { value: 'income', label: 'Prihod' },
    { value: 'expense', label: 'Rashod' },
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleStashSelect = (option: TSelect | null) => {
    if (option) setSelectedStash(option)
  }
  const handleCategorySelect = (option: TSelect | null) => {
    if (option) setSelectedCategory(option)
  }
  const handleTypeSelect = (option: TSelect | null) => {
    if (option) setType(option)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!currentUser?.uid || !selectedCategory?.value || !selectedStash.value) return

      await addDoc(transactionCollection, {
        ...transaction,
        amount: type.value === 'income' ? transaction.amount : -transaction.amount,
        user_id: currentUser?.uid,
        category_id: selectedCategory.value || null,
        stash_id: selectedStash.value,
        created_at: new Date(),
        updated_at: new Date(),
      })

      setTransaction({} as ITransaction)
      setSelectedStash({} as TSelect)
      setSelectedCategory({} as TSelect)
      setType({} as TSelect)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-secondary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] p-10 rounded-md ">
      <h3 className="text-2xl text-neutral font-bold tracking-tight w-full text-center pb-4">Dodaj transakciju</h3>

      <FieldSet label="Iznos" name="amount" value={transaction.amount} onChange={handleChange} type="number" />
      <fieldset className="pt-1">
        <label className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">
          Tip transakcije
        </label>
        <Select
          options={transactionTypeOptions}
          value={Object.keys(type).length ? type : null}
          placeholder="Odaberite tip"
          onChange={handleTypeSelect}
        />
      </fieldset>
      <fieldset className="pt-1">
        <label className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">Izvor</label>
        <Select
          options={stashOptions}
          value={Object.keys(selectedStash).length ? selectedStash : null}
          placeholder="Odaberite izvor"
          onChange={handleStashSelect}
        />
        <Link href="/stashes/add" className="w-full text-end link">
          Dodajte izvor
        </Link>
      </fieldset>
      <fieldset className="pt-1">
        <label className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">Kategorija</label>
        <Select
          options={categoryOptions}
          value={Object.keys(selectedCategory).length ? selectedCategory : null}
          placeholder="Odaberite kategoriju"
          onChange={handleCategorySelect}
        />
        <Link href="/categories/add" className="w-full text-end link">
          Dodajte kategoriju
        </Link>
      </fieldset>

      <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
        <button onClick={onSubmit} className="btn">
          Dodaj
        </button>
      </section>
    </form>
  )
}

export default TransactionForm
