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

  // Force a re-render after initial mount to ensure rows are rendered
  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
    rowVirtualizer.measure();
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{ height: height || "100%", width: width || "100%" }}
      className="rounded-lg overflow-auto bg-background dark:text-white pb-2 flex justify-between flex-col"
    >
      <Table className="flex-1 relative h-full w-full overflow-auto">
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
