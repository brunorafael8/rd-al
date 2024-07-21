import { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate, } from "react-router-dom";
import { cn } from "@/lib/utils";
import { JOBS } from "@/services/data";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();
  const [openJobs, setOpenJobs] = useState(false);
  const [job, setJob] = useState("");

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
        <div className="flex flex-col space-y-1.5">
          <Popover open={openJobs} onOpenChange={setOpenJobs}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openJobs}
                className={`w-[300px] justify-between h-12 ${job ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {job
                  ? JOBS.find((i) => i === job)
                  : "Trabalho..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Qual o seu Job..."
                  className="h-9 w-[250px]"
                  required
                />
                <CommandList>
                  <CommandEmpty>No job found.</CommandEmpty>
                  <CommandGroup>
                    {JOBS.map((i) => (
                      <CommandItem
                        key={i}
                        value={i}
                        onSelect={(currentValue) => {
                          const current = currentValue === job ? "" : currentValue
                          setJob(current);
                          table.getColumn("job")?.setFilterValue(current)
                          setOpenJobs(false);
                        }}
                      >
                        {i}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            job === i ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button onClick={() => navigate('/censo')}>Novo no Rd?</Button>
    </div>
  );
}
