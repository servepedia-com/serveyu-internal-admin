import React, { useMemo, useState } from "react";
import {
  flexRender,
  Table,
  Row,
  Header,
  Cell,
  Column,
} from "@tanstack/react-table";
import {
  useVirtualizer,
  Virtualizer,
  VirtualItem,
} from "@tanstack/react-virtual";

// Assuming WithAutoSizer is a higher-order component
import WithAutoSizer from "../hoc/AutoSizerHoc";
import SaTableBody from "./SaTableBody";

interface SaTableProps<TData> {
  table: Table<TData>;
  height: number;
  width: number;
}


function SaTable<TData>(props: SaTableProps<TData>) {
  const { table, height, width } = props;
  const { rows } = table.getRowModel();
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const visibleColumns = table.getVisibleLeafColumns();

  const totalColumnWidth = useMemo(() => {
    return visibleColumns.reduce((acc, column) => acc + column.getSize(), 0);
  }, [visibleColumns]);

  const {  extraWidthPerColumn } = useMemo(() => {
    const extraWidth = Math.max(0, width - totalColumnWidth - 1);
    return {
      extraWidth,
      extraWidthPerColumn: extraWidth / visibleColumns.length,
    };
  }, [width, totalColumnWidth, visibleColumns.length]);

  React.useEffect(() => {
    visibleColumns.forEach((column) => {
      if (column.columnDef.size !== undefined) {
        column.columnDef.size =
          (column.columnDef.size as number) + extraWidthPerColumn;
      }
    });
  }, [visibleColumns, extraWidthPerColumn]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();
  const virtualRows = rowVirtualizer.getVirtualItems();

  const { virtualPaddingLeft, virtualPaddingRight } = useMemo(() => {
    if (columnVirtualizer && virtualColumns?.length) {
      return {
        virtualPaddingLeft: virtualColumns[0]?.start ?? 0,
        virtualPaddingRight:
          columnVirtualizer.getTotalSize() -
          (virtualColumns[virtualColumns.length - 1]?.end ?? 0),
      };
    }
    return { virtualPaddingLeft: undefined, virtualPaddingRight: undefined };
  }, [columnVirtualizer, virtualColumns]);

  return (
    <div
      className="overflow-auto"
      ref={tableContainerRef}
      style={{ height: height - 1, width: width - 1 }}
    >
      <table className="" style={{ width: "100%" }}>
        <thead
          className="sticky text-sm dark:text-gray-300 text-gray-500 top-0 dark:backdrop-blur-lg z-[100px] w-full border-b bg-background dark:bg-background/40 dark:border-neutral-900"
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
              {virtualPaddingLeft ? (
                <th style={{ display: "flex", width: virtualPaddingLeft }} />
              ) : null}
              {virtualColumns.map((vc) => {
                const header = headerGroup.headers[vc.index] as Header<
                  TData,
                  unknown
                >;
                return (
                  <th
                    key={header.id}
                    className="p-3 justify-start relative"
                    style={{
                      display: "flex",
                      minWidth: header.getSize(),
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
              {virtualPaddingRight ? (
                <th style={{ display: "flex", width: virtualPaddingRight }} />
              ) : null}
            </tr>
          ))}
        </thead>
        <SaTableBody
          rows={rows}
          virtualRows={virtualRows}
          virtualColumns={virtualColumns}
          rowVirtualizer={rowVirtualizer}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      </table>
    </div>
  );
}

export default WithAutoSizer(SaTable) as <TData>(
  props: Omit<SaTableProps<TData>, "height" | "width">
) => React.ReactElement;
