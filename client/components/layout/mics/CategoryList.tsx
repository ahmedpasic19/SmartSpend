'use client'
import { useMemo } from 'react'

import MainTable from '@/components/table/MainTable'
import Link from 'next/link'

import '@/app/globals.css'

type TCategory = {
  name: string
  stash_name: string
}

type TProps = {
  categories: TCategory[]
  pagination?: boolean
}

const CategoryList: React.FC<TProps> = ({ categories, pagination }) => {
  const columns = useMemo(
    () => [
      {
        header: 'Naziv',
        accessorKey: 'name',
      },
      {
        header: 'Izvor',
        accessorKey: 'stash_name',
      },
    ],
    [],
  )

  const data = useMemo(() => (Array.isArray(categories) ? categories : []), [categories])

  return (
    <div className="w-full bg-secondary p-5 rounded-md h-full overflow-y-auto flex flex-col gap-2 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <section className="w-full flex justify-between items-center">
        <h3 className="text-neutral text-lg font-bold tracking-wider uppercase">Kategorije</h3>
        <Link href="/categories/add" className="awesome_link">
          Dodaj
        </Link>
      </section>

      <MainTable columns={columns} data={data} pagination={pagination ?? false} />
    </div>
  )
}

export default CategoryList
