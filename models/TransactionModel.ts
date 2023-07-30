export interface ITransaction {
  uid: string
  amount: number
  category_id: string
  stash_id: string

  created_at: Date
  updated_at: Date
}
