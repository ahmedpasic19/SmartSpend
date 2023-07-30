'use client'
import StashForm from '@/components/layout/forms/StashForm'
import useProtectedRoute from '@/hooks/useProtectedRoute'

export default function AddStash() {
  useProtectedRoute()
  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <section className="w-full flex justify-center items-center flex-col gap-2 text-neutral py-5">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
          Dodaj izvor
        </h1>
      </section>

      <section className="py-5">
        <StashForm />
      </section>
    </main>
  )
}
