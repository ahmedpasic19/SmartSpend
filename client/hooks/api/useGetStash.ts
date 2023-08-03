import { useEffect, useState } from 'react'

import { db } from '@/config/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { IStash } from '@/models/StashMode'

const useGetStash = (stashId: string) => {
  const [stash, setStash] = useState({} as IStash)

  useEffect(() => {
    const getStash = async () => {
      try {
        const docRef = doc(db, 'stashes', stashId)
        const data = await getDoc(docRef)
        const stash = data.data() as IStash
        setStash(stash)
      } catch (error) {
        console.log(error)
      }
    }

    getStash()
  }, [stashId])

  return stash
}

export default useGetStash
