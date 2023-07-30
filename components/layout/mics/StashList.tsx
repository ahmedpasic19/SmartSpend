'use client'
import { useMemo } from 'react'

import { AiFillEdit } from 'react-icons/ai'
import MainTable from '@/components/table/MainTable'
import Link from 'next/link'

type TStash = {
  uid: string
  name: string
  total: number
  main: boolean
}

type TProps = {
  stashes: TStash[]
  pagination?: boolean
}

type TRow = {
  original: TStash
}

const StashList: React.FC<TProps> = ({ stashes, pagination }) => {
  const columns = useMemo(
    () => [
      {
        header: 'Naziv',
        accessorKey: 'name',
      },
      {
        header: 'Iznos',
        accessorKey: 'amount',
        cell: ({ row }: { row: TRow }) =>
          row.original.total > 0 ? row.original.total + ' KM' : row.original.total + ' KM',
      },
      {
        header: 'Primarni',
        accessorKey: 'main',
        cell: ({ row }: { row: TRow }) => (row.original.main ? 'DA' : 'NE'),
      },
      {
        header: 'Akcije',
        accessorKey: 'actions',
        cell: ({ row }: { row: TRow }) => (
          <Link href={`/stashes/edit/${row.original.uid}`} className="w-full flex justify-center items-center">
            <AiFillEdit className="bg-secondary rounded-sm h-10 w-10" />
          </Link>
        ),
      },
    ],
    [],
  )

  const data = useMemo(() => (Array.isArray(stashes) ? stashes : []), [stashes])

  return (
    <div className="w-full bg-secondary p-5 rounded-md h-full overflow-y-auto flex flex-col gap-2 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <section className="w-full flex justify-between items-center">
        <h3 className="text-neutral text-lg font-bold tracking-wider uppercase">Zalihe</h3>
        <Link href="/stashes/add" className="awesome_link">
          Dodaj
        </Link>
      </section>

      <MainTable columns={columns} data={data} pagination={pagination ?? false} />
    </div>
  )
}

export default StashList
