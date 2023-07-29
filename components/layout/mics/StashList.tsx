'use client'
import { useEffect, useMemo, useState } from 'react'

import useGetLoggedUser from '@/hooks/useGetLoggedUser'

import { db } from '@/config/firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IStash } from '@/models/StashMode'

import '@/app/globals.css'

const StashList = () => {
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

  const allStashes = useMemo(() => stashes.concat(userStashes), [stashes, userStashes])

  return (
    <ul className="w-full bg-secondary p-5 rounded-md h-full overflow-y-auto flex flex-col gap-2 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <h3 className="w-full text-center text-neutral text-lg font-bold tracking-wider uppercase mb-4">Zalihe</h3>
      {allStashes.map((sta) => (
        <li className="w-full bg-primary p-2 text-neutral font-semibold tracking-wider rounded-sm" key={Math.random()}>
          <p>{sta.name}</p>
        </li>
      ))}
    </ul>
  )
}

export default StashList
