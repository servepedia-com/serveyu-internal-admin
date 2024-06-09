"use client";
import React, { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import  SaDataTable  from "@/components/SaTable/SaDataTable";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaymentT = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<PaymentT>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

function CustomerListing() {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  return (
    <SaDataTable
      columns={columns}
      manualPagination={{
        enable: true,
        paginationState: pagination,
        onChangePageNumber: (value) =>
          setPagination((prev) => ({ ...prev, pageIndex: value })),
        onChangePageSize: (value) =>
          setPagination((prev) => ({ ...prev, pageSize: value })),
      }}
      data={
        [
          {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
          },
          {
            id: "728esd52f",
            amount: 100,
            status: "pending",
            email: "m@sexample.com",
          },
          {
            id: "728sesd52f",
            amount: 100,
            status: "pending",
            email: "m@ssexample.com",
          },
          {
            id: "728efsd52f",
            amount: 100,
            status: "pending",
            email: "m@asexample.com",
          },
          {
            id: "728esfd52f",
            amount: 100,
            status: "pending",
            email: "m@s3exfample.com",
          },
          {
            id: "728evqsd52f",
            amount: 100,
            status: "pending",
            email: "m@s3example.com",
          },
          {
            id: "728egasd52f",
            amount: 1040,
            status: "p3ending",
            email: "m@qwesexample.com",
          },
          {
            id: "728esdv52f",
            amount: 100,
            status: "pending",
            email: "m@sexafasfmple.com",
          },
          {
            id: "728esdfas52f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "728esdavafas52f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "72128esdfas52f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "728esd42fas52f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "728esdfas12452f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "728esdqwefas52f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "728e11sdqwefas52f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "728es21dqwefas52f",
            amount: 1003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "73128esdqwefas52f",
            amount: 11003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "72318esdqwefas52f",
            amount: 134003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "728e232sdqwefas52f",
            amount: 142003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
          {
            id: "72841esdqwefas52f",
            amount: 311003,
            status: "pending",
            email: "m@ssdaexample.com",
          },
        ] as PaymentT[]
      }
    />
  );
}

export default CustomerListing;
