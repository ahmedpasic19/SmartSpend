import { Timestamp } from 'firebase/firestore'

export interface ITransaction {
  uid: string
  amount: number
  category_id: string
  stash_id: string

  created_at: Timestamp
  updated_at: Timestamp
}
