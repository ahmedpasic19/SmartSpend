'use client'

import MainTable from '@/components/table/MainTable'
import Link from 'next/link'
import { useMemo } from 'react'

type TTransaction = {
  amount: number
  category_name: string
  stash_name: string
  created_at: Date
  updated_at: Date
}

type TProps = {
  transactions: TTransaction[]
  pagination?: boolean
}

type TRow = {
  original: TTransaction
}

const TransactionList: React.FC<TProps> = ({ transactions, pagination }) => {
  const columns = useMemo(
    () => [
      {
        header: 'Iznos',
        accessorKey: 'amount',
        cell: ({ row }: { row: TRow }) =>
          row.original.amount > 0 ? '+' + row.original.amount + ' KM' : row.original.amount + ' KM',
      },
      {
        header: 'Izvor',
        accessorKey: 'stash_name',
      },
      {
        header: 'Kategorija',
        accessorKey: 'category_name',
      },
      {
        header: 'Datum',
        accessorKey: 'updated_at',
        cell: ({ row }: { row: TRow }) => {
          const date = row.original.created_at.toISOString().substring(0, 10)
          const time = row.original.created_at.toISOString().substring(16, 24)
          return `${date} `
        },
      },
    ],
    [],
  )

  const data = useMemo(
    () =>
      Array.isArray(transactions)
        ? transactions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        : [],
    [transactions],
  )

  return (
    <div className="w-full bg-secondary p-5 rounded-md h-full overflow-y-auto flex flex-col gap-2 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <section className="w-full flex justify-between items-center">
        <h3 className="text-neutral text-lg font-bold tracking-wider uppercase">Transakcije</h3>
        <Link href="/transactions/add" className="awesome_link">
          Dodaj
        </Link>
      </section>

      <MainTable columns={columns} data={data} pagination={pagination ?? false} />
    </div>
  )
}

export default TransactionList
