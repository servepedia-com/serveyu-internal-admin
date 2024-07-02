import React from "react";
import { flexRender,  Row,  } from "@tanstack/react-table";
import {  Virtualizer, VirtualItem } from "@tanstack/react-virtual";
import { TableRow } from "../ui/table";


interface TableBodyProps<T> {
    rows: Row<T>[];
    virtualRows: VirtualItem[];
    virtualColumns: VirtualItem[];
    rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
    virtualPaddingLeft?: number;
    virtualPaddingRight?: number;
  }
  
function TableBody<T>(props:TableBodyProps<T>){
    const {
        rows,
        virtualRows,
        virtualColumns,
        rowVirtualizer,
        virtualPaddingLeft,
        virtualPaddingRight,
      } = props;
    
      return (
        <tbody
          style={{
            display: "grid",
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
            const visibleCells = row.getVisibleCells();
            return (
              <TableRow
                data-index={virtualRow.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                key={row.id}
                className="border-b"
                style={{
                  display: "flex",
                  position: "absolute",
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
              >
                {virtualPaddingLeft ? (
                  <td style={{ display: "flex", width: virtualPaddingLeft }} />
                ) : null}
                {virtualColumns.map((vc) => {
                  const cell = visibleCells[vc.index];
                  return (
                    <td
                      key={cell.id}
                      className="p-3 justify-start truncate w-full"
                      style={{
                        display: "flex",
                        width: cell.column.getSize(),
                      }}
                    >
                        <div className="truncate">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      
                    </td>
                  );
                })}
                {virtualPaddingRight ? (
                  <td style={{ display: "flex", width: virtualPaddingRight }} />
                ) : null}
              </TableRow>
            );
          })}
        </tbody>
      );
}

export default React.memo(TableBody)  as <T>(props: TableBodyProps<T>) => React.ReactElement;

