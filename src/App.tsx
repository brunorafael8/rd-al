import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { supabase } from "./supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  CITIES,
  HOBBIES,
  JOBS,
  SINGLE_STATUS_ITEMS,
  STATUS_ITEMS,
} from "./data";
import { Badge } from "./components/ui/badge";

function App() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openSubStatus, setOpenSubStatus] = useState(false);
  const [openJobs, setOpenJobs] = useState(false);
  const [openHoobies, setOpenHobbies] = useState(false);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [job, setJob] = useState("");
  const [subStatus, setSubStatus] = useState("");
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cities, setCities] = useState<[] | any>([]);
  const [usersStatus, setUsersStatus] = useState<[] | any>([]);
  const [hobby, setHobby] = useState<[] | any>([]);

  const getCities = async () => {
    const { data, error } = await supabase.from("user_city").select("");
    const statusData = await supabase.from("user_status").select("");

    if (error && statusData.error && !data && !statusData.data) {
      return alert(error.message);
    }

    setCities(data);
    setUsersStatus(statusData.data);
  };

  useEffect(() => {
    getCities();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      city: value,
      status,
      subStatus,
      hobby: hobby.join(","),
      job,
      instagram,
      linkedin,
    };

    if (name.length < 2) {
      return alert("Nome precisa ter mais de 2 caracteres");
    }

    if (value === "") {
      return alert("Selecione uma cidade");
    }

    if (job === "") {
      return alert("Selecione um trabalho");
    }

    if (hobby.length === 0) {
      return alert("Selecione um hobby");
    }

    setLoading(true);

    const { error } = await supabase.from("user").upsert(data);

    if (error) {
      setLoading(false);
      return alert(error.message);
    }

    await getCities();
    setName("");
    setValue("");
    setStatus("");
    setHobby([]);
    setJob("");
    setLoading(false);
    alert("Cadastrado com sucesso");
  };

  const handleUnselect = (item: string) => {
    setHobby(hobby.filter((i: string) => i !== item));
  };

  return (
    <div className="lg:h-full min-h-screen bg-black flex justify-center items-center gap-8 flex-col lg:flex-row p-[24px]">
      <Analytics />
      <form onSubmit={onSubmit} className="lg:w-[716px] w-full">
        <Card className="lg:w-[716px] w-full min-h-[740px] h-full relative">
          <CardHeader>
            <CardTitle>Censo RD AL 🎈</CardTitle>
            <CardDescription>IBGE DO RD ?</CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="grid w-full items-center gap-4 pb-[72px]">
              <div className="flex flex-col space-y-1.5 w-[300px]">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu Nome"
                  value={name}
                  min={2}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-[300px]">
                <Label htmlFor="name">Qual o seu Instagram: </Label>
                <Input
                  id="instagram"
                  placeholder="Seu Instagram"
                  value={instagram}
                  min={2}
                  required
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-[300px]">
                <Label htmlFor="name">Qual o seu Linkedin: </Label>
                <Input
                  id="linkedin"
                  placeholder="Seu linkedin"
                  value={linkedin}
                  min={2}
                  required
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Sua Cidade:</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[300px] justify-between"
                    >
                      {value
                        ? CITIES.find((city) => city === value)
                        : "Selecione a sua Cidade..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Qual a sua cidade..."
                        className="h-9 w-[250px]"
                        required
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {CITIES.map((city) => (
                            <CommandItem
                              key={city}
                              value={city}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              {city}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  value === city ? "opacity-100" : "opacity-0"
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Estado Cívil:</Label>
                <Popover open={openStatus} onOpenChange={setOpenStatus}>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openStatus}
                      className="w-[300px] justify-between"
                    >
                      {status
                        ? STATUS_ITEMS.find((i) => i === status)
                        : "Selecione o seu Estado Cívil..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Qual o seu Estado Cívil..."
                        className="h-9 w-[250px]"
                        required
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {STATUS_ITEMS.map((i) => (
                            <CommandItem
                              key={i}
                              value={i}
                              onSelect={(currentValue) => {
                                setStatus(
                                  currentValue === status ? "" : currentValue
                                );
                                setOpenStatus(false);
                              }}
                            >
                              {i}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  status === i ? "opacity-100" : "opacity-0"
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
              {status === "Solteiro" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Qual o nível de Solteiro?:</Label>
                  <Popover open={openSubStatus} onOpenChange={setOpenSubStatus}>
                    <PopoverTrigger asChild className="w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSubStatus}
                        className="w-[300px] justify-between"
                      >
                        {subStatus
                          ? SINGLE_STATUS_ITEMS.find((i) => i === subStatus)
                          : "Selecione o seu nível de Solteiro..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Qual o nível de Solteiro..."
                          className="h-9 w-[250px]"
                          required
                        />
                        <CommandList>
                          <CommandEmpty>.</CommandEmpty>
                          <CommandGroup>
                            {SINGLE_STATUS_ITEMS.map((i) => (
                              <CommandItem
                                key={i}
                                value={i}
                                onSelect={(currentValue) => {
                                  setSubStatus(
                                    currentValue === subStatus
                                      ? ""
                                      : currentValue
                                  );
                                  setOpenSubStatus(false);
                                }}
                              >
                                {i}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    status === i ? "opacity-100" : "opacity-0"
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
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Você trabalha com o que?:</Label>
                <Popover open={openJobs} onOpenChange={setOpenJobs}>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openJobs}
                      className="w-[300px] justify-between"
                    >
                      {job
                        ? JOBS.find((i) => i === job)
                        : "Selecione o seu trabalho..."}
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
                                setJob(
                                  currentValue === job ? "" : currentValue
                                );
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Qual os seus Hobbies:</Label>
                <Popover open={openHoobies} onOpenChange={setOpenHobbies}>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openJobs}
                      className={`w-[300px] justify-between ${
                        hobby.length > 1 ? "h-full" : "h-10"
                      }`}
                    >
                      <div className="flex gap-1 flex-wrap">
                        {hobby.length > 0
                          ? hobby.map((item: string) => (
                              <Badge
                                variant="secondary"
                                key={item}
                                className="mr-1 mb-1"
                                onClick={() => handleUnselect(item)}
                              >
                                {item}
                                <button
                                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleUnselect(item);
                                    }
                                  }}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onClick={() => handleUnselect(item)}
                                >
                                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                              </Badge>
                            ))
                          : "Selecione os seus hobbies..."}
                      </div>
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Qual o seu hobby..."
                        className="h-9 w-[250px]"
                        required
                      />
                      <CommandGroup>
                        <CommandList>
                          {HOBBIES.map((option) => (
                            <CommandItem
                              key={option}
                              value={option}
                              onSelect={() => {
                                setHobby(
                                  hobby.includes(option)
                                    ? hobby.filter(
                                        (item: string) => item !== option
                                      )
                                    : [...hobby, option]
                                );

                                setOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  hobby.includes(option)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {option}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end bottom-0 right-0 absolute">
            <Button disabled={loading} type="submit">
              {loading ? "loading..." : "Enviar"}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className="flex gap-4 flex-col w-full lg:w-[350px]">
        <Card className="lg:w-[350px] w-full">
          <CardHeader>
            <CardTitle>Cidades 🎈</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Dados baseados nos cadastros</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Cidade</TableHead>
                  <TableHead>Rds na cidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cities.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold">{item.city}</TableCell>
                    <TableCell>{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:w-[350px] w-full">
          <CardHeader>
            <CardTitle>Estado Cívil 🎈</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Dados baseados nos cadastros</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersStatus.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold">{item.status}</TableCell>
                    <TableCell>{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
