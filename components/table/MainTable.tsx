{
  /* eslint-disable */
}
import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

import Pagination from './Pagination'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
  pagination?: boolean
}

const MainTable = <T extends object>({ data, columns, pagination }: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
  })

  return (
    <div className="flex h-fit flex-col">
      <div className="overflow-x-auto">
        <div className="relative flex w-full flex-col items-center pb-4">
          {pagination ? <Pagination table={table} /> : null}
          <div className="max-h-[450px] overflow-auto">
            <table className="w-full text-center">
              <thead className="sticky top-0 border-b bg-primary">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={Math.random()}>
                    {headerGroup.headers.map((header) => (
                      <th key={Math.random()} className="px-6 py-4 text-lg font-medium text-neutral">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr key={Math.random()} className='border-b" bg-primary'>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className={`max-w-[10rem] overflow-hidden overflow-ellipsis whitespace-nowrap px-6 py-2 text-sm text-neutral tracking-wider ${
                          index % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                        }`}
                        key={Math.random()}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainTable
