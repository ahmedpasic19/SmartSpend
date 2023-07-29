'use client'
import { useEffect, useState } from 'react'

import useGetLoggedUser from '@/hooks/useGetLoggedUser'

import { db } from '@/config/firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ICategory } from '@/models/CategoryModel'

import '@/app/globals.css'

const CategoryList = () => {
  const [categories, setCategories] = useState([] as ICategory[])

  const categoriesCollection = collection(db, 'categories')

  const currentUser = useGetLoggedUser()

  useEffect(() => {
    // GET user categories
    const getUserCategories = async () => {
      if (currentUser?.uid) {
        const q = query(categoriesCollection, where('user_id', '==', currentUser?.uid))
        const data = await getDocs(q)
        const categories = data.docs.map((doc) => ({ ...(doc.data() as ICategory), uid: doc.id }))
        setCategories(categories)
      }
    }
    getUserCategories()
  }, [currentUser?.uid])

  return (
    <ul className="w-full bg-secondary p-5 rounded-md h-full overflow-y-auto flex flex-col gap-2 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <h3 className="w-full text-center text-neutral text-lg font-bold tracking-wider uppercase mb-4">Kategorije</h3>
      {categories.map((sta) => (
        <li className="w-full bg-primary p-2 text-neutral font-semibold tracking-wider rounded-sm" key={Math.random()}>
          <p>{sta.name}</p>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
