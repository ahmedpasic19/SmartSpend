import { useEffect, useState } from 'react'

import { auth, db } from '@/config/firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ITransaction } from '@/models/TransactionModel'

const useGetAllUserTransactions = () => {
  const [transactions, setTransactions] = useState([] as ITransaction[])

  const [user] = useAuthState(auth)

  const transactionCollectionRef = collection(db, 'transactions')

  useEffect(() => {
    const getTransactions = async () => {
      try {
        if (user?.uid) {
          const q = query(transactionCollectionRef, where('user_id', '==', user?.uid))
          // GET users transactions
          const data = await getDocs(q)

          const transaction = data.docs.map((doc) => ({ ...(doc.data() as ITransaction), id: doc.id }))

          setTransactions(transaction)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getTransactions()
  }, [user])

  return transactions
}

export default useGetAllUserTransactions
