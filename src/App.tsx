import { useEffect, useState } from "react";
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

const CITIES = [
  "Água Branca",
  "Anadia",
  "Arapiraca",
  "Atalaia",
  "Barra de Santo Antônio",
  "Barra de São Miguel",
  "Batalha",
  "Belém",
  "Belo Monte",
  "Boca da Mata",
  "Branquinha",
  "Cacimbinhas",
  "Cajueiro",
  "Campestre",
  "Campo Alegre",
  "Campo Grande",
  "Canapi",
  "Capela",
  "Carneiros",
  "Chã Preta",
  "Coité do Nóia",
  "Colônia Leopoldina",
  "Coqueiro Seco",
  "Coruripe",
  "Craíbas",
  "Delmiro Gouveia",
  "Dois Riachos",
  "Estrela de Alagoas",
  "Feira Grande",
  "Feliz Deserto",
  "Flexeiras",
  "Girau do Ponciano",
  "Ibateguara",
  "Igaci",
  "Igreja Nova",
  "Inhapi",
  "Jacaré dos Homens",
  "Jacuípe",
  "Japaratinga",
  "Jaramataia",
  "Jequiá da Praia",
  "Joaquim Gomes",
  "Jundiá",
  "Junqueiro",
  "Lagoa da Canoa",
  "Limoeiro de Anadia",
  "Maceió",
  "Major Isidoro",
  "Mar Vermelho",
  "Maragogi",
  "Maravilha",
  "Marechal Deodoro",
  "Maribondo",
  "Mata Grande",
  "Matriz de Camaragibe",
  "Messias",
  "Minador do Negrão",
  "Monteirópolis",
  "Murici",
  "Novo Lino",
  "Olho d Água das Flores",
  "Olho d Água do Casado",
  "Olho d Água Grande",
  "Olivença",
  "Ouro Branco",
  "Palestina",
  "Palmeira dos Índios",
  "Pão de Açúcar",
  "Pariconha",
  "Paripueira",
  "Passo de Camaragibe",
  "Paulo Jacinto",
  "Penedo",
  "Piaçabuçu",
  "Pilar",
  "Pindoba",
  "Piranhas",
  "Poço das Trincheiras",
  "Porto Calvo",
  "Porto de Pedras",
  "Porto Real do Colégio",
  "Quebrangulo",
  "Rio Largo",
  "Roteiro",
  "Santa Luzia do Norte",
  "Santana do Ipanema",
  "Santana do Mundaú",
  "São Brás",
  "São José da Laje",
  "São José da Tapera",
  "São Luís do Quitunde",
  "São Miguel dos Campos",
  "São Miguel dos Milagres",
  "São Sebastião",
  "Satuba",
  "Senador Rui Palmeira",
  "Tanque d'Arca",
  "Taquarana",
  "Teotônio Vilela",
  "Traipu",
  "União dos Palmares",
  "Viçosa",
];

const STATUS_ITEMS = [
  "Fiel a Ficante",
  "Solteiro",
  "Casado",
  "Divorciado",
  "Namorando",
  "Separado",
  "União Estável",
  "Nunca namorei, mas observo...",
  "Último romântico",
];

function App() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [cities, setCities] = useState<[] | any>([]);
  const [usersStatus, setUsersStatus] = useState<[] | any>([]);

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
    };

    if (value === "") {
      return alert("Selecione uma cidade");
    }
    setLoading(true);

    const { error } = await supabase.from("user").upsert(data);

    if (error) {
      return alert(error.message);
    }

    await getCities();
    setName("");
    setValue("");
    setStatus("");
    setLoading(false);
    alert("Cadastrado com sucesso");
  };

  return (
    <div className="lg:h-screen bg-black flex justify-center items-center gap-8 flex-col p-[24px]">
      <form onSubmit={onSubmit} className="lg:w-[716px] w-full">
        <Card className="lg:w-[716px] w-full">
          <CardHeader>
            <CardTitle>Censo RD AL 🎈</CardTitle>
            <CardDescription>De onde você é ?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 w-[300px]">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu Nome"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
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
                        placeholder="Search framework..."
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
                        placeholder="Qual o seu St..."
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button disabled={loading} type="submit">{loading ? 'loading...' : 'Enviar'}</Button>
          </CardFooter>
        </Card>
      </form>
      <div className="flex flex-row gap-4">
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
