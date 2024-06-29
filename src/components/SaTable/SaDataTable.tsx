// src/components/SaDataTable.tsx

import React, { useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SaDataTablePagination } from "./SaDataTablePagination";
import WithAutoSizer from "../hoc/AutoSizerHoc";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  manualPagination?: ManualPaginationI;
  height?: number;
  width?: number;
}

export interface ManualPaginationI {
  enable: boolean;
  paginationState?: PaginationI;
  onChangePageSize: (value: number) => void;
  onChangePageNumber: (value: number) => void;
}

interface PaginationI {
  pageIndex: number;
  pageSize: number;
}

function SaDataTable<TData, TValue>({
  columns,
  data,
  manualPagination,
  height,
  width,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: manualPagination?.enable || false,
    state: {
      ...(manualPagination?.paginationState
        ? { pagination: manualPagination?.paginationState }
        : {}),
    },
  });

  const { rows } = table.getRowModel();

  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, // estimate row height for accurate scrollbar dragging
    getScrollElement: () => scrollRef.current,
    // measure dynamic row height, except in Firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height ?? 0
        : undefined,
    overscan: 5,
  });

  return (
    <div
      ref={scrollRef}
      style={{ height: height || "100%", width: width || "100%" }}
      className="rounded-lg overflow-auto bg-background dark:text-white  flex justify-between flex-col"
    >
      <table className="flex-1 flex flex-col relative h-full w-full overflow-auto">
        <thead className="sticky text-sm dark:text-gray-300 text-gray-500  top-0  dark:backdrop-blur-lg z-[100px] w-full border-b h-fit bg-background dark:bg-background/40 dark:border-neutral-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="w-full  flex ">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="flex-1 min-w-64 w-full flex justify-start items-center p-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="flex-1">
          {rows.length ? (
            rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <TableRow
                  key={row.id}
                  className="flex text-xs"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="flex-1 min-w-64 flex items-center p-4 justify-start"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </table>
      <SaDataTablePagination
        manualPagination={manualPagination}
        table={table}
      />
    </div>
  );
}

export default WithAutoSizer(React.memo(SaDataTable)) as <TData, TValue>(
  props: DataTableProps<TData, TValue>
) => JSX.Element;
