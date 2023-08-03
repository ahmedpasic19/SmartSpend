'use client'

import CategoryList from '@/components/layout/mics/CategoryList'
import useGetUserCategories from '@/hooks/api/useGetUserCategories'
import useGetUserStashes from '@/hooks/api/useGetUserStashes'
import useProtectedRoute from '@/hooks/useProtectedRoute'

import '@/app/globals.css'

export default function Categories() {
  useProtectedRoute()

  const categories = useGetUserCategories()
  const stashes = useGetUserStashes()

  // Find categories stash
  const modifiedCategories = categories.reduce((prev, curr) => {
    const foundStash = stashes.find((stash) => stash.uid === curr.stash_id)

    // Insert stash name
    if (foundStash) {
      const modifiedCategory = {
        name: curr.name,
        stash_name: foundStash.name,
      }

      return prev.concat([modifiedCategory])
    }
    return prev
  }, [] as { name: string; stash_name: string }[])

  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <section className="w-full flex justify-beetwen items-center flex-col gap-2 text-neutral py-5">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
          Kategorije
        </h1>
      </section>

      <section className="py-5 w-[90%]">
        <CategoryList categories={modifiedCategories} pagination />
      </section>
    </main>
  )
}
