'use client'
import { useMemo } from 'react'

import useGetAllUserTransactions from '@/hooks/api/useGetAllUserTransactions'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import useGetUserConfig from '@/hooks/api/useGetUserConfig'
import useGetUserCategories from '@/hooks/api/useGetUserCategories'
import useGetUserStashes from '@/hooks/api/useGetUserStashes'

import TransactionList from '@/components/layout/mics/TransactionList'

import { getNumberOfDatesBetween } from '@/utils/utils'

import '@/app/globals.css'

export default function Home() {
  const userConfig = useGetUserConfig()
  const transactions = useGetAllUserTransactions()
  const categories = useGetUserCategories()
  const stashes = useGetUserStashes()

  const total = useMemo(() => {
    const totalMoney = transactions.reduce((prev, curr) => {
      return prev + curr.amount
    }, 0)

    return totalMoney
  }, [transactions])

  // Find transaction category and stash
  const modifiedTransactions = transactions?.reduce((prev, curr) => {
    const findCategory = categories.find((cat) => cat.uid === curr.category_id)
    const findStash = stashes.find((stash) => stash.uid === curr.stash_id)

    // Insert category & stash name
    if (findCategory && findStash) {
      const modifiedTransaction = {
        uid: curr.uid,
        amount: curr.amount,
        category_name: findCategory.name,
        stash_name: findStash.name,
        created_at: curr?.created_at?.toDate(),
        updated_at: curr?.updated_at?.toDate(),
      }

      return prev.concat([modifiedTransaction])
    }
    return prev
  }, [] as { amount: number; category_name: string; stash_name: string; created_at: Date; updated_at: Date; uid: string }[])

  // Sum all transactions of the stash
  const modifiedStashes = stashes
    .reduce((prevS, currS) => {
      const transactionTotal = transactions.reduce((prevT, currT) => {
        // Find a transaction asociated to the current stash
        if (currS.uid === currT.stash_id) {
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

  const mainStash = useMemo(() => stashes.find((stash) => stash.main === true), [stashes])
  const mainStashTotal = useMemo(
    () =>
      transactions.reduce((prev, curr) => {
        if (curr.stash_id === mainStash?.uid) return prev + curr.amount

        return prev
      }, 0),
    [userConfig],
  )

  const days = useMemo(
    () => getNumberOfDatesBetween(userConfig?.startDate?.toDate(), userConfig.endDate?.toDate()),
    [userConfig],
  )

  console.log(userConfig)

  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <section className="w-4/5 bg-secondary flex justify-start items-center flex-col gap-2 text-neutral py-5 mt-10 rounded-sm drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
        <section className="flex justify-between w-full px-4 text-xl font-bold tracking-wider text-accent">
          <label className="mr-4">Total: </label>
          <p>{total.toFixed(2)}KM</p>
        </section>

        <ul className="w-4/5 text-accent/50">
          {modifiedStashes.map((stash) => (
            <li key={Math.random()} className="w-full flex justify-between items-center">
              <label className={`font-thin ${stash.main === true ? 'font-bold' : ''}`}>{stash.name}:</label>
              <label className="font-semibold tracking-wide">{stash.total} KM</label>
            </li>
          ))}
        </ul>

        <section className="flex justify-between w-full px-4 font-bold tracking-wider text-accent">
          <label>Potrošnja: </label>
          <p className="tracking-tight">{(mainStashTotal / days).toFixed(2)} KM/danu</p>
        </section>

        <section className="flex flex-col w-full px-4 text-accent font-semibold">
          <label>Period:</label>
          <div className="flex justify-evenly text-accent/50 font-normal">
            <p>{userConfig?.startDate?.toDate().toISOString().substring(0, 10)}</p>
            <span className="mx-3">-</span>
            <p>{userConfig?.endDate?.toDate().toISOString().substring(0, 10)}</p>
          </div>
        </section>
      </section>

      <section className="w-[90%] py-5">
        <TransactionList transactions={modifiedTransactions} pagination />
      </section>
    </main>
  )
}
