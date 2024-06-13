import { useState } from "react";
import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
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

const data = [
  {
    name: '1000',
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

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
  "Olho d'Água das Flores",
  "Olho d'Água do Casado",
  "Olho d'Água Grande",
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

function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="h-screen bg-black flex justify-center items-center gap-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Censo RD AL</CardTitle>
          <CardDescription>De onde você é ?</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu Nome" />
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Enviar</Button>
        </CardFooter>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Resultado:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
              <XAxis dataKey="name" />
                <Bar
                  dataKey="subscription"
                  style={
                    {
                      fill: "#000",
                      opacity: 1,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
