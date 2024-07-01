import React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import SaTable from "./SaTable";
import {
  ManualPaginationI,
  SaDataTablePagination,
} from "./SaDataTablePagination";

interface SaTablePropsI<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  manualPagination?: ManualPaginationI;
}

function SaDataTable<TData, TValue>(props: SaTablePropsI<TData, TValue>) {
  const table = useReactTable<TData>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
    enableSorting: false,
    defaultColumn: {
      minSize: 200,
    },
  });

  return (
    <div className="h-full w-full relative flex flex-col overflow-auto">
      <div className="flex-1 overflow-auto">
        <SaTable table={table} />
      </div>
      <SaDataTablePagination
        manualPagination={props.manualPagination}
        table={table}
      />
    </div>
  );
}

export default SaDataTable;
