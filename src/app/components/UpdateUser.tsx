import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UpdateUser = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[700px] h-[550px] flex flex-col justify-between">
      {/* Cabeçalho */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">ATUALIZAR USUÁRIO</h2>

      {/* Grid de campos */}
      <div className="grid grid-cols-2 gap-5 flex-1 overflow-auto">
        {/* Nome Completo */}
        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="nomeCompleto">
            Nome Completo:
          </Label>
          <Input id="nomeCompleto" placeholder="Digite o nome completo" />
        </div>

        {/* CPF */}
        <div>
          <Label className="mb-1 block" htmlFor="cpf">
            CPF:
          </Label>
          <Input id="cpf" placeholder="000.000.000-00" />
        </div>

        {/* Data de Nascimento */}
        <div>
          <Label className="mb-1 block" htmlFor="dataNascimento">
            Data de Nascimento:
          </Label>
          <Input id="dataNascimento" type="date" />
        </div>

        {/* Setor solicitado */}
        <div>
          <Label className="mb-1 block" htmlFor="setorSolicitado">
            Setor solicitado:
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clinico">Clínico</SelectItem>
              <SelectItem value="pediatria">Pediatria</SelectItem>
              <SelectItem value="emergencia">Emergência</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Horário da criação da senha */}
        <div>
          <Label className="mb-1 block" htmlFor="horarioSenha">
            Horário da criação da senha:
          </Label>
          <Input id="horarioSenha" type="time" />
        </div>

        {/* Horário de chegada */}
        <div>
          <Label className="mb-1 block" htmlFor="horarioChegada">
            Horário de chegada:
          </Label>
          <Input id="horarioChegada" type="time" />
        </div>

        {/* Senha */}
        <div>
          <Label className="mb-1 block" htmlFor="senha">
            Senha:
          </Label>
          <Input id="senha" placeholder="Digite a senha" />
        </div>
      </div>

      {/* Botão de ação */}
      <div className="flex justify-end mt-6">
        <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg">
          ATUALIZAR
        </Button>
      </div>
    </div>
  );
};

export default UpdateUser;
