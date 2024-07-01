"use client";
import React, { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import SaTable from "@/components/SaTable";
 
interface CustomerEntityI{
  id: number;
  customer_name: string;
  company_email: string;
  country: string;
  created_at: string;
  total_accounts: number;
  stage: string;
  status: string;
  actions: string;
}
const dummyData:CustomerEntityI[] = [
  {
    id: 1,
    customer_name: "John Doe",
    company_email: "john.doe@example.com",
    country: "USA",
    created_at: "2023-06-30",
    total_accounts: 5,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 2,
    customer_name: "Jane Smith",
    company_email: "jane.smith@example.com",
    country: "Canada",
    created_at: "2023-06-28",
    total_accounts: 3,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 3,
    customer_name: "Robert Brown",
    company_email: "robert.brown@example.com",
    country: "UK",
    created_at: "2023-06-27",
    total_accounts: 2,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 4,
    customer_name: "Emily Davis",
    company_email: "emily.davis@example.com",
    country: "Australia",
    created_at: "2023-06-26",
    total_accounts: 4,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 5,
    customer_name: "Michael Wilson",
    company_email: "michael.wilson@example.com",
    country: "Germany",
    created_at: "2023-06-25",
    total_accounts: 6,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 6,
    customer_name: "Sarah Miller",
    company_email: "sarah.miller@example.com",
    country: "France",
    created_at: "2023-06-24",
    total_accounts: 2,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 7,
    customer_name: "David Johnson",
    company_email: "david.johnson@example.com",
    country: "Spain",
    created_at: "2023-06-23",
    total_accounts: 3,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 8,
    customer_name: "Laura Martinez",
    company_email: "laura.martinez@example.com",
    country: "Italy",
    created_at: "2023-06-22",
    total_accounts: 5,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 9,
    customer_name: "James Anderson",
    company_email: "james.anderson@example.com",
    country: "Netherlands",
    created_at: "2023-06-21",
    total_accounts: 1,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 10,
    customer_name: "Linda Thompson",
    company_email: "linda.thompson@example.com",
    country: "Brazil",
    created_at: "2023-06-20",
    total_accounts: 4,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 11,
    customer_name: "Christopher Lee",
    company_email: "christopher.lee@example.com",
    country: "China",
    created_at: "2023-06-19",
    total_accounts: 3,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 12,
    customer_name: "Jessica Hernandez",
    company_email: "jessica.hernandez@example.com",
    country: "Japan",
    created_at: "2023-06-18",
    total_accounts: 2,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 13,
    customer_name: "Matthew Lopez",
    company_email: "matthew.lopez@example.com",
    country: "Russia",
    created_at: "2023-06-17",
    total_accounts: 5,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 14,
    customer_name: "Anna Garcia",
    company_email: "anna.garcia@example.com",
    country: "Mexico",
    created_at: "2023-06-16",
    total_accounts: 3,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 15,
    customer_name: "William Martinez",
    company_email: "william.martinez@example.com",
    country: "India",
    created_at: "2023-06-15",
    total_accounts: 4,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 16,
    customer_name: "Elizabeth Taylor",
    company_email: "elizabeth.taylor@example.com",
    country: "South Africa",
    created_at: "2023-06-14",
    total_accounts: 6,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 17,
    customer_name: "Joseph Brown",
    company_email: "joseph.brown@example.com",
    country: "Egypt",
    created_at: "2023-06-13",
    total_accounts: 2,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 18,
    customer_name: "Maria Gonzalez",
    company_email: "maria.gonzalez@example.com",
    country: "Argentina",
    created_at: "2023-06-12",
    total_accounts: 5,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 19,
    customer_name: "Mark Clark",
    company_email: "mark.clark@example.com",
    country: "Chile",
    created_at: "2023-06-11",
    total_accounts: 1,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 20,
    customer_name: "Patricia Lewis",
    company_email: "patricia.lewis@example.com",
    country: "Peru",
    created_at: "2023-06-10",
    total_accounts: 4,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 21,
    customer_name: "Steven Carter",
    company_email: "steven.carter@example.com",
    country: "New Zealand",
    created_at: "2023-06-09",
    total_accounts: 5,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 22,
    customer_name: "Nancy Wright",
    company_email: "nancy.wright@example.com",
    country: "Portugal",
    created_at: "2023-06-08",
    total_accounts: 3,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 23,
    customer_name: "Andrew Walker",
    company_email: "andrew.walker@example.com",
    country: "Norway",
    created_at: "2023-06-07",
    total_accounts: 2,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 24,
    customer_name: "Susan Hall",
    company_email: "susan.hall@example.com",
    country: "Sweden",
    created_at: "2023-06-06",
    total_accounts: 4,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 25,
    customer_name: "Charles King",
    company_email: "charles.king@example.com",
    country: "Switzerland",
    created_at: "2023-06-05",
    total_accounts: 6,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 26,
    customer_name: "Lisa Green",
    company_email: "lisa.green@example.com",
    country: "Denmark",
    created_at: "2023-06-04",
    total_accounts: 2,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 27,
    customer_name: "Brian Baker",
    company_email: "brian.baker@example.com",
    country: "Finland",
    created_at: "2023-06-03",
    total_accounts: 3,
    stage: "Initial",
    status: "Active",
    actions: "View"
  },
  {
    id: 28,
    customer_name: "Karen Nelson",
    company_email: "karen.nelson@example.com",
    country: "Austria",
    created_at: "2023-06-02",
    total_accounts: 5,
    stage: "Processing",
    status: "Pending",
    actions: "View"
  },
  {
    id: 29,
    customer_name: "Kevin Hill",
    company_email: "kevin.hill@example.com",
    country: "Belgium",
    created_at: "2023-06-01",
    total_accounts: 1,
    stage: "Completed",
    status: "Inactive",
    actions: "View"
  },
  {
    id: 30,
    customer_name: "Amy Adams",
    company_email: "amy.adams@example.com",
    country: "Greece",
    created_at: "2023-05-31",
    total_accounts: 4,
    stage: "Initial",
    status: "Active",
    actions: "View"
  }
];


export const columns: ColumnDef<CustomerEntityI>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "company_email",
    header: "Customer Email",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "total_accounts",
    header: "Total Accounts",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];

function CustomerListing() {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  return (
    <SaTable
      columns={columns}
      manualPagination={{
        enable: true,
        paginationState: pagination,
        onChangePageNumber: (value) =>
          setPagination((prev) => ({ ...prev, pageIndex: value })),
        onChangePageSize: (value) =>
          setPagination((prev) => ({ ...prev, pageSize: value })),
      }}
      data={dummyData}
    />
  );
}

export default CustomerListing;
