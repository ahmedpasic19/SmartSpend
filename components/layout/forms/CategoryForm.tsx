'use client'
import { ChangeEvent, useState, FormEvent } from 'react'
import { ICategory } from '@/models/CategoryModel'

import useGetLoggedUser from '@/hooks/useGetLoggedUser'
import useGetUserStashes from '@/hooks/api/useGetUserStashes'

import FieldSet from '@/components/Fieldset'
import Select from 'react-select'

import { db } from '@/config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

type TSelect = { label: string; value: string }

const CategoryForm = () => {
  const [category, setCategory] = useState({ name: '' } as ICategory)
  const [stash, setStash] = useState({} as TSelect)

  const currentUser = useGetLoggedUser()

  const stashesCollection = collection(db, 'categories')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSelectChange = (option: TSelect | null) => {
    if (option) setStash(option)
  }

  const stashes = useGetUserStashes()

  const stashOptions = stashes.map((stash) => ({ value: stash.uid, label: stash.name }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (!category.name || !currentUser?.uid) return

      await addDoc(stashesCollection, {
        name: category.name,
        user_id: currentUser?.uid,
        stash_id: stash.value,
      })

      setCategory({} as ICategory)
      setStash({} as TSelect)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-secondary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] p-10 rounded-md">
      <FieldSet type="text" label="Naziv" name="name" onChange={handleChange} value={category.name} />

      <fieldset className="z-10">
        <label className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">Zaliha</label>
        <Select
          options={stashOptions}
          placeholder="Odaberi zalihu"
          value={Object.keys(stash).length ? stash : null}
          onChange={handleSelectChange}
        />
      </fieldset>

      <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
        <button onClick={onSubmit} className="btn">
          Dodaj
        </button>
      </section>
    </form>
  )
}

export default CategoryForm
