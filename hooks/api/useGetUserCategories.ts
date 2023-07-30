import { useEffect, useState } from 'react'

import { auth, db } from '@/config/firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ICategory } from '@/models/CategoryModel'

const useGetUserCategories = () => {
  const [categories, setCategories] = useState([] as ICategory[])

  const categoriesCollection = collection(db, 'categories')

  const [user] = useAuthState(auth)

  useEffect(() => {
    // GET user categories
    const getUserCategories = async () => {
      if (user?.uid) {
        const q = query(categoriesCollection, where('user_id', '==', user?.uid))
        const data = await getDocs(q)
        const categories = data.docs.map((doc) => ({ ...(doc.data() as ICategory), uid: doc.id }))
        setCategories(categories)
      }
    }
    getUserCategories()
  }, [user?.uid])

  return categories
}

export default useGetUserCategories
