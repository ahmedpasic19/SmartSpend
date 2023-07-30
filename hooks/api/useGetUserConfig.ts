import { useEffect, useState } from 'react'

import useGetLoggedUser from '../useGetLoggedUser'

import { db } from '@/config/firebase-config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { IConfig } from '@/models/ConfigModel'

const useGetUserConfig = () => {
  const [userConfig, setUserConfig] = useState({} as IConfig)

  const configCollection = collection(db, 'configs')

  const currentUser = useGetLoggedUser()

  useEffect(() => {
    const getUserConfig = async () => {
      try {
        if (currentUser?.uid) {
          const q = query(configCollection, where('user_id', '==', currentUser.uid))
          const data = await getDocs(q)
          const userConfig = data.docs.map((doc) => ({ ...(doc.data() as IConfig), uid: doc.id }))
          const confg = userConfig[userConfig.length - 1] || ({} as IConfig)

          setUserConfig(confg)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserConfig()
  }, [])

  return userConfig
}

export default useGetUserConfig
