'use client'
import { useEffect, useState } from 'react'

import { db, auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ITransaction } from '@/models/TransactionModel'

const TransactionList = () => {
  const [transactions, setTransactions] = useState([] as ITransaction[])
  const [user, setUser] = useState({} as User)

  const transactionCollectionRef = collection(db, 'transactions')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    }
  })

  useEffect(() => {
    const getTransactions = async () => {
      try {
        if (Object.keys(user)) {
          const q = query(transactionCollectionRef, where('user_id', '==', user.uid))
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

  return (
    <ul>
      {transactions.map((tra) => (
        <li>
          <label>Iznos:</label>
          <span>{tra.amount}</span>
        </li>
      ))}
    </ul>
  )
}

export default TransactionList
