import React from 'react'

import '@/app/globals.css'
import CategoryList from '@/components/layout/mics/CategoryList'

export default function Categories() {
  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <CategoryList />
    </main>
  )
}
