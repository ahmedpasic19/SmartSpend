{
  /* eslint-disable */
}
import { Table } from '@tanstack/react-table'

import * as Bi from 'react-icons/bi'

interface ReactTableProps<T extends object> {
  table: Table<T>
}

const Pagination = <T extends object>({ table }: ReactTableProps<T>) => {
  return (
    <div className="sticky flex w-full items-center justify-center bg-primary">
      <button
        className="w-full h-full cursor-pointer rounded bg-primary p-1 flex justify-center items-center"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <Bi.BiChevronsLeft className="h-8 w-8 text-neutral" />
      </button>
      <button
        className="w-full h-full cursor-pointer rounded bg-primary p-1 flex justify-center items-center"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <Bi.BiChevronLeft className="h-8 w-8 text-neutral" />
      </button>
      <span className="flex items-center gap-1 text-lg text-neutral font-semibold">
        <input
          type="number"
          placeholder="Broj..."
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className="w-full rounded border p-1 outline-none bg-secondary text-center"
        />
      </span>
      <button
        className="w-full h-full cursor-pointer rounded bg-primary p-1 flex justify-center items-center"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <Bi.BiChevronRight className="h-8 w-8 text-neutral" />
      </button>
      <button
        className="w-full h-full cursor-pointer rounded bg-primary p-1 flex justify-center items-center"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <Bi.BiChevronsRight className="h-8 w-8 text-neutral" />
      </button>
    </div>
  )
}

export default Pagination
