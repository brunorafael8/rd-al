import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { JOBS } from "@/services/data";

interface PopoverJobsProps {
  onJobSelected: (job: string) => void;
}

export function PopoverJobs({ onJobSelected }: PopoverJobsProps) {
  const [openJobs, setOpenJobs] = useState(false);
  const [job, setJob] = useState("");

  function handleJobSelected(currentJob: string) {
    const current = currentJob === job ? "" : currentJob
    setJob(current);
    onJobSelected(current)
    setOpenJobs(false);
  }

  return (
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
            placeholder="Busque por um trabalho..."
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
                  onSelect={handleJobSelected}
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
  )
}