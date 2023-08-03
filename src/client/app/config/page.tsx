'use client'
import ConfigForm from '@/components/layout/forms/ConfigForm'
import useProtectedRoute from '@/hooks/useProtectedRoute'

import '@/app/globals.css'

export default function Config() {
  useProtectedRoute()
  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <section className="w-full flex justify-beetwen items-center flex-col gap-2 text-neutral py-5">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">Postavke</h1>
      </section>

      <section className="py-5 w-[90%]">
        <ConfigForm />
      </section>
    </main>
  )
}
