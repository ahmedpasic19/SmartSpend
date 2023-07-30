import { useState, useEffect } from 'react'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { ICategory } from '@/models/CategoryModel'
import { db } from '@/config/firebase-config'

const useGetStashCategories = (stash_id: string) => {
  const [categories, setCategories] = useState([] as ICategory[])
  const categoryCollection = collection(db, 'categories')

  // GET categories of selected stash
  useEffect(() => {
    const getStashCategories = async () => {
      if (stash_id) {
        const q = query(categoryCollection, where('stash_id', '==', stash_id))
        const data = await getDocs(q)
        const categories = data.docs.map((doc) => ({ ...(doc.data() as ICategory), uid: doc.id }))
        setCategories(categories)
      }
    }

    getStashCategories()
  }, [stash_id])

  return categories
}

export default useGetStashCategories
