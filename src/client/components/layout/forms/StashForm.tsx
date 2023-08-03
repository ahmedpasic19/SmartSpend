'use client'
import { ChangeEvent, useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IStash } from '@/models/StashMode'

import FieldSet from '@/components/Fieldset'

import { auth, db } from '@/config/firebase-config'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import useGetStash from '@/hooks/api/useGetStash'
import Checkbox from '../mics/Checkbox'
import { useAuthState } from 'react-firebase-hooks/auth'

type Tprops = {
  isEditing?: boolean
  stashId?: string
}

const StashForm: React.FC<Tprops> = ({ isEditing, stashId }) => {
  const [stash, setStash] = useState({ name: '', main: false } as IStash)

  const router = useRouter()

  const [user] = useAuthState(auth)

  // if on [stash_id] page
  // GET the stash to update it
  const currentStash = useGetStash(stashId || '')

  const stashesCollection = collection(db, 'stashes')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStash((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (currentStash) setStash((prev) => ({ ...prev, name: currentStash?.name, main: currentStash?.main }))
  }, [currentStash])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (!isEditing || !stashId) {
        if (!stash.name || !user?.uid) return

        await addDoc(stashesCollection, {
          ...stash,
          user_id: user?.uid,
        })
      }
      if (isEditing && stashId) {
        const stashRef = doc(db, 'stashes', stashId)

        await updateDoc(stashRef, {
          ...stash,
          user_id: user?.uid,
        })

        router.push('/stashes')
      }
      setStash({} as IStash)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-secondary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] p-10 rounded-md">
      <FieldSet type="text" label="Naziv" name="name" onChange={handleChange} value={stash.name} />
      <Checkbox
        label="Primarni"
        onChange={(value: boolean) => setStash((prev) => ({ ...prev, main: value }))}
        value={stash.main ?? false}
      />

      <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
        <button onClick={onSubmit} className="btn">
          {isEditing ? 'Spasi' : 'Dodaj'}
        </button>
      </section>
    </form>
  )
}

export default StashForm
