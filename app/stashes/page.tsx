import '@/app/globals.css'
import StashList from '@/components/layout/mics/StashList'

export default function Stashes() {
  return (
    <main className="page w-full flex flex-col justify-start items-center pt-10">
      <StashList />
    </main>
  )
}
