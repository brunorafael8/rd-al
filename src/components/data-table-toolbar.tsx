import { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {  useNavigate, } from "react-router-dom";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Nome..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-12 w-[150px] lg:w-[250px]"
        />
      </div>
      <Button onClick={() => navigate('/censo')}>Novo no Rd?</Button>
    </div>
  );
}
