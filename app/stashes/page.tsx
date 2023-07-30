'use client'
import StashList from '@/components/layout/mics/StashList'

import useGetUserStashes from '@/hooks/api/useGetUserStashes'
import useGetAllUserTransactions from '@/hooks/api/useGetAllUserTransactions'
import useProtectedRoute from '@/hooks/useProtectedRoute'

import '@/app/globals.css'

export default function Stashes() {
  useProtectedRoute()

  const stashes = useGetUserStashes()
  const transactions = useGetAllUserTransactions()

  // Sum all transactions of the stash
  const modifiedStashes = stashes
    .reduce((prevS, currS) => {
      const transactionTotal = transactions.reduce((prevT, currT) => {
        // Find a transaction asociated to the current stash
        if (currS.uid === currT.stash_id) {
          console.log(typeof currT.amount)
          return prevT + currT.amount
        }

        return prevT
      }, 0)

      const stash = { name: currS.name, total: transactionTotal, main: currS.main, uid: currS.uid }

      return prevS.concat([stash])
    }, [] as { name: string; total: number; main: boolean; uid: string }[])
    .reduce((prev, curr) => {
      const found = prev.find((stash) => stash.uid === curr.uid)

      if (found) return prev
      else return prev.concat([curr])
    }, [] as { uid: string; name: string; total: number; main: boolean }[])

  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <section className="w-full flex justify-beetwen items-center flex-col gap-2 text-neutral py-5">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">Izvori</h1>
      </section>

      <section className="py-5 w-[90%]">
        <StashList stashes={modifiedStashes} pagination />
      </section>
    </main>
  )
}
