import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TBodyProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  table,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody className={clsxm(className)} {...rest}>
      {table.getRowModel().rows.length == 0 ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-4 px-3 col-span-full text-typo-icon text-center'
            colSpan={table.getAllColumns().length}
          >
            No Data
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={clsxm(index % 2 === 0 ? 'bg-white' : 'bg-typo-light')}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  className='truncate whitespace-nowrap py-4 px-3'
                  style={{ maxWidth: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}
