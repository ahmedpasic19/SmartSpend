'use client'

import useGetUserCategories from '@/hooks/api/useGetUserCategories'

import '@/app/globals.css'

const CategoryList = () => {
  const categories = useGetUserCategories()

  return (
    <ul className="w-full bg-secondary p-5 rounded-md h-full overflow-y-auto flex flex-col gap-2 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <h3 className="w-full text-center text-neutral text-lg font-bold tracking-wider uppercase mb-4">Kategorije</h3>
      {categories.map((sta) => (
        <li className="w-full bg-primary p-2 text-neutral font-semibold tracking-wider rounded-sm" key={Math.random()}>
          <p>{sta.name}</p>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
