import { useEffect, useState } from 'react'

import useGetLoggedUser from '../useGetLoggedUser'

import { db } from '@/config/firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ITransaction } from '@/models/TransactionModel'

const useGetAllUserTransactions = () => {
  const [transactions, setTransactions] = useState([] as ITransaction[])

  const currentUser = useGetLoggedUser()

  const transactionCollectionRef = collection(db, 'transactions')

  useEffect(() => {
    const getTransactions = async () => {
      try {
        if (currentUser?.uid) {
          const q = query(transactionCollectionRef, where('user_id', '==', currentUser?.uid))
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
  }, [currentUser])

  return transactions
}

export default useGetAllUserTransactions
