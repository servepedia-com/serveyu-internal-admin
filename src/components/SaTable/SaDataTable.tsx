"use client";

import React from "react";
import { useMeasure } from "@uidotdev/usehooks";
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  manualPagination?: ManualPaginationI;
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
export function SaDataTable<TData, TValue>({
  columns,
  data,
  manualPagination,
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
  const [measureRef, { width, height }] = useMeasure();
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

  // Combine the refs
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      measureRef(node);
      scrollRef.current = node;
    },
    [measureRef]
  );

  return (
    <div
      ref={combinedRef}
      style={{ height: height || "100%", width: width || "100%" }}
      className="rounded-md  overflow-auto bg-background dark:text-white pb-2 flex justify-between flex-col border"
    >
      <Table className="flex-1 relative overflow-auto">
        <TableHeader className="sticky top-0 bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
        </TableBody>
      </Table>
      <SaDataTablePagination manualPagination={manualPagination} table={table} />
    </div>
  );
}
