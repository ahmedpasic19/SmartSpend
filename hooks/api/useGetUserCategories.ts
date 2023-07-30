import { useEffect, useState } from 'react'

import useGetLoggedUser from '@/hooks/useGetLoggedUser'

import { db } from '@/config/firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ICategory } from '@/models/CategoryModel'

const useGetUserCategories = () => {
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

  return categories
}

export default useGetUserCategories
