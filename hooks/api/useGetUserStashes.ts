import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/firebase-config'
import { IStash } from '@/models/StashMode'

import useGetLoggedUser from '../useGetLoggedUser'

const useGetUserStashes = () => {
  const [stashes, setStashes] = useState([] as IStash[])
  const [userStashes, setUserStashes] = useState([] as IStash[])

  const stashesCollection = collection(db, 'stashes')

  const currentUser = useGetLoggedUser()

  useEffect(() => {
    // GET user stashes
    const getUserStashes = async () => {
      if (currentUser?.uid) {
        const q = query(stashesCollection, where('user_id', '==', currentUser?.uid))
        const data = await getDocs(q)
        const stashes = data.docs.map((doc) => ({ ...(doc.data() as IStash), uid: doc.id }))
        setStashes(stashes)
      }
    }

    // GET 3 main stashes (savings, needs, neccecary)
    const getMainStashes = async () => {
      if (currentUser?.uid) {
        const q = query(stashesCollection, where('forAll', '==', true))
        const data = await getDocs(q)
        const stashes = data.docs.map((doc) => ({ ...(doc.data() as IStash), uid: doc.id }))
        setUserStashes(stashes)
      }
    }

    getMainStashes()
    getUserStashes()
  }, [currentUser?.uid])

  return stashes.concat(userStashes)
}

export default useGetUserStashes
