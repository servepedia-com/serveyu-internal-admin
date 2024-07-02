import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";

interface PaginationI {
  pageIndex: number;
  pageSize: number;
}

export interface ManualPaginationI {
  enable: boolean;
  paginationState?: PaginationI;
  onChangePageSize: (value: number) => void;
  onChangePageNumber: (value: number) => void;
}
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  manualPagination?: ManualPaginationI;
}

export function SaDataTablePagination<TData>({
  table,
  manualPagination,
}: DataTablePaginationProps<TData>) {
  const { pageIndex: currentPageIndex, pageSize: currentPageSize } =
    useMemo(() => {
      const pagination = table.getState().pagination;
      return {
        pageIndex: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      };
    }, [table.getState().pagination]);

  const [inputPageIndex, setInputPageIndex] = useState(
    () => `${currentPageIndex}`
  );

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value) {
      table.setPageIndex(+value);
      if (manualPagination?.onChangePageNumber) {
        manualPagination.onChangePageNumber(+value);
      }
      setInputPageIndex(value);
    } else if (Number(value)) {
      const total_pages = table.getPageCount();
      if (total_pages >= +value) {
        setInputPageIndex(value);
        table.setPageIndex(+value);
        if (manualPagination?.onChangePageNumber) {
          manualPagination.onChangePageNumber(+value);
        }
      } else {
        table.setPageIndex(total_pages);
        setInputPageIndex(`${total_pages}`);
        if (manualPagination?.onChangePageNumber) {
          manualPagination.onChangePageNumber(total_pages);
        }
        return;
      }
    }
  };

  const handlePageSizeChange = (value: string) => {
    const pageSize = Number(value);
    table.setPageSize(pageSize);
    if (manualPagination?.onChangePageSize) {
      manualPagination.onChangePageSize(pageSize);
    }
  };

  const handlePreviousPage = () => {
    table.previousPage();
    if (manualPagination?.onChangePageNumber) {
      manualPagination.onChangePageNumber(currentPageIndex - 1);
    }
    setInputPageIndex(`${currentPageIndex - 1}`);
  };

  const handleNextPage = () => {
    table.nextPage();
    if (manualPagination?.onChangePageNumber) {
      manualPagination.onChangePageNumber(currentPageIndex + 1);
    }
    setInputPageIndex(`${currentPageIndex + 1}`);
  };

  return (
    <div className="flex items-center flex-wrap gap-y-3 justify-between p-3 border-t">
      <div className="flex items-center gap-2 ">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${currentPageSize}`}
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={currentPageIndex} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 ">
        <div className="flex max-w-fit min-w-[90px] gap-2 items-center sm:justify-center text-sm font-medium">
          <p>Page </p>
          <Input
            value={inputPageIndex}
            onChange={handlePageChange}
            className="max-w-16"
          />{" "}
          <p>of {table.getPageCount()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
