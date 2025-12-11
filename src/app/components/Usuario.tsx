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


const Usuario = () => {
  return (
    <>
        {/* Seção USUÁRIO */}
        <div className="w-2/3 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">USUÁRIO</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Nome Completo */}
            <div className="col-span-2">
              <Label className="mb-2" htmlFor="nomeCompleto">
                Nome Completo:
              </Label>
              <Input id="nomeCompleto" readOnly />
            </div>

            {/* Atendimento Preferencial? */}
            <div>
              <Label className="mb-2" htmlFor="cpf">
                CPF
              </Label>
              <Input id="cpf" readOnly />
            </div>

            {/* Atendimento para: */}
            <div>
              <Label className="mb-2" htmlFor="dataNascimento">
                Data de Nascimento
              </Label>
              <Input id="dataNascimento" value="" readOnly />
            </div>

            {/* Setor solicitado */}
            <div>
              <Label className="mb-2" htmlFor="setorSolicitado">
                Setor solicitado
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
              <Label className="mb-2" htmlFor="horarioSenha">
                Horário da criação da senha
              </Label>
              <Input type="time" id="horarioSenha" value="" readOnly />
            </div>

            {/* Horário de chegada */}
            <div>
              <Label className="mb-2" htmlFor="horarioChegada">
                Horário de chegada
              </Label>
              <Input type="time" id="horarioChegada" />
            </div>

            {/* Senha */}
            <div>
              <Label className="mb-2" htmlFor="senha">
                Senha
              </Label>
              <Input id="senha" />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Atualizar
            </Button>
          </div>
        </div>
    </>
  );
};

export default Usuario;