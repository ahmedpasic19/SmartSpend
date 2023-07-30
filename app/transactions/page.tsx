'use client'

import TransactionList from '@/components/layout/mics/TransactionList'

import useGetAllUserTransactions from '@/hooks/api/useGetAllUserTransactions'
import useGetUserCategories from '@/hooks/api/useGetUserCategories'
import useGetUserStashes from '@/hooks/api/useGetUserStashes'

export default function Transactions() {
  const transactions = useGetAllUserTransactions()
  const categories = useGetUserCategories()
  const stashes = useGetUserStashes()

  // Find transaction category and stash
  const modifiedTransactions = transactions.reduce((prev, curr) => {
    const findCategory = categories.find((cat) => cat.uid === curr.category_id)
    const findStash = stashes.find((stash) => stash.uid === curr.stash_id)

    // Insert category & stash name
    if (findCategory && findStash) {
      const modifiedTransaction = {
        amount: curr.amount,
        category_name: findCategory.name,
        stash_name: findStash.name,
        created_at: curr.created_at,
        updated_at: curr.updated_at,
      }

      return prev.concat([modifiedTransaction])
    }
    return prev
  }, [] as { amount: number; category_name: string; stash_name: string; created_at: Date; updated_at: Date }[])

  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <section className="w-full flex justify-center items-center flex-col gap-2 text-neutral py-5">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
          Transakcije
        </h1>
      </section>

      <section className="py-5 w-[90%]">
        <TransactionList transactions={modifiedTransactions} pagination />
      </section>
    </main>
  )
}
