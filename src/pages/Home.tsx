import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LinkedInLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/supabaseClient";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import "../global.css";
import NextEventIMG from "../assets/next_event.jpg";
import { LoadingSpinner } from "@/components/LoadingSpiner";

// import { DataTableToolbar } from "./data-table-toolbar"
const getInstagram = (value: string) => {
  if (
    value.includes("https://www.instagram.com/") &&
    !value.includes("https://instagram.com/@")
  ) {
    return value.replace("https://www.instagram.com/", "");
  }

  if (value.includes("https://instagram.com/@")) {
    return value.replace("https://instagram.com/@", "");
  }

  if (value.includes("@")) {
    return value.replace("@", "");
  }

  return value;
};

const getLinkedin = (value: string) => {
  if (
    value.includes("https://www.linkedin.com/") &&
    !value.includes("https://www.linkedin.com/in/")
  ) {
    return value.replace("https://www.linkedin.com/", "");
  }

  if (value.includes("https://www.linkedin.com/in/")) {
    return value.replace("https://www.linkedin.com/in/", "");
  }

  return value;
};

type DataTableColumnHeaderProps = {
  column: any;
  title: string;
};

const DataTableColumnHeader = ({ title }: DataTableColumnHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <span>{title}</span>
    </div>
  );
};

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-[200px]">{row.getValue("name")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "job",
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-[80px]">{row.getValue("job")}</div>
    ),
  },
  {
    accessorKey: "instagram",
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title="instagram" />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-[20px] flex items-center justify-center">
        <a
          href={`https://instagram.com/${getInstagram(
            row.getValue("instagram")
          )}`}
        >
          <InstagramLogoIcon className="h-8 w-8" />
        </a>
      </div>
    ),

    filterFn: (
      row: { getValue: (arg0: any) => any },
      id: any,
      value: string | any[]
    ) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "linkedin",
    header: ({ column }: { column: any }) => (
      <DataTableColumnHeader column={column} title="linkedin" />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="w-[20px]">
        <a
          href={`https://www.linkedin.com/in/${getLinkedin(
            row.getValue("linkedin")
          )}`}
          target="_blank"
        >
          <LinkedInLogoIcon className="h-8 w-8" />
        </a>
      </div>
    ),

    filterFn: (
      row: { getValue: (arg0: any) => any },
      id: any,
      value: string | any[]
    ) => {
      return value.includes(row.getValue(id));
    },
  },
];

function Home() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [users, setUsers] = React.useState<SortingState>([]);

  const getCities = async () => {
    const { data, error } = await supabase.from("user").select("*").limit(100);
    console.log(users);

    if (error && !data) {
      return alert(error.message);
    }

    setUsers(data.sort(() => Math.random() - 0.5));
  };

  React.useEffect(() => {
    getCities();
  }, []);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="h-full p-8 flex items-start justify-between flex-flow lg:flex-row flex-col">
      <div className="lg:w-2/3 w-full space-y-4 mr-4">
        <DataTableToolbar table={table} />
        <Card className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="h-[75px]"
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center h-[750px]"
                    >
                      <div className="text-center justify-center flex items-center">
                        <LoadingSpinner className="text-white h-10 w-10" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </Card>
      </div>
      <Card className="h-full relative mt-[64px] lg:w-1/3 w-full min-[454px]">
        <CardHeader>
          <CardTitle>Próximo Evento🎈</CardTitle>
        </CardHeader>
        <CardContent className="">
          <img src={NextEventIMG} alt="next-event" />
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
