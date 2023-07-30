'use client'

import MainTable from '@/components/table/MainTable'
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
        cell: ({ row }: { row: TRow }) => row.original.amount + ' KM',
      },
      {
        header: 'Izvor',
        accessorKey: 'stash_name',
      },
      {
        header: 'Kategorija',
        accessorKey: 'category_name',
      },
    ],
    [],
  )

  const data = useMemo(
    () =>
      Array.isArray(transactions)
        ? transactions.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        : [],
    [transactions],
  )

  return (
    <div className="w-full bg-secondary p-5 rounded-md h-full overflow-y-auto flex flex-col gap-2 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <h3 className="w-full text-center text-neutral text-lg font-bold tracking-wider uppercase mb-4">Transakcije</h3>

      <MainTable columns={columns} data={data} pagination={pagination ?? false} />
    </div>
  )
}

export default TransactionList
