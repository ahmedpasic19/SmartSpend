import TransactionList from '@/components/layout/mics/TransactionList'

export default function Transactions() {
  return (
    <main className="page w-full flex flex-col justify-evenly items-center">
      <section className="w-full flex justify-center items-center flex-col gap-2 text-neutral">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
          Transakcije
        </h1>
      </section>

      <TransactionList />
    </main>
  )
}
