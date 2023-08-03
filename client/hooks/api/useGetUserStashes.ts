import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/config/firebase-config'
import { IStash } from '@/models/StashMode'

const useGetUserStashes = () => {
  const [stashes, setStashes] = useState([] as IStash[])
  const [userStashes, setUserStashes] = useState([] as IStash[])

  const stashesCollection = collection(db, 'stashes')

  const [user] = useAuthState(auth)

  useEffect(() => {
    // GET user stashes
    const getUserStashes = async () => {
      if (user?.uid) {
        const q = query(stashesCollection, where('user_id', '==', user?.uid))
        const data = await getDocs(q)
        const stashes = data.docs.map((doc) => ({ ...(doc.data() as IStash), uid: doc.id }))
        setStashes(stashes)
      }
    }

    // GET 3 main stashes (savings, needs, neccecary)
    const getMainStashes = async () => {
      if (user?.uid) {
        const q = query(stashesCollection, where('forAll', '==', true))
        const data = await getDocs(q)
        const stashes = data.docs.map((doc) => ({ ...(doc.data() as IStash), uid: doc.id }))
        setUserStashes(stashes)
      }
    }

    getMainStashes()
    getUserStashes()
  }, [user?.uid])

  return stashes.concat(userStashes)
}

export default useGetUserStashes
