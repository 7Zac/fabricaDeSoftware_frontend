import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QueueList from "@/app/components/QueueList";

const AddPatientPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            alt="Logomarca"
            src="/Logo.svg"
            width="50"
            height="50"
          />
          <span className="text-lg font-semibold text-teal-600">CLINICA Saúde</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">
            Sair
          </Button>
          <Avatar>
            <AvatarFallback className="bg-green-500 text-white">G</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-teal-500 text-white">S</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex p-4 space-x-4">
        {/* Seção FILA */}
        <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">FILA</h2>
          <QueueList />
        </div>

        {/* Seção PACIENTE */}
        <div className="w-2/3 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">PACIENTE</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Nome Completo */}
            <div className="col-span-2">
              <Label htmlFor="nomeCompleto">Nome Completo:</Label>
              <Input id="nomeCompleto" value="maria juarez felizardo" readOnly />
            </div>

            {/* Atendimento Preferencial? */}
            <div>
              <Label htmlFor="atendimentoPreferencial">Atendimento Preferencial?</Label>
              <Input id="atendimentoPreferencial" value="Não" readOnly />
            </div>

            {/* Atendimento para: */}
            <div>
              <Label htmlFor="atendimentoPara">Atendimento para:</Label>
              <Input id="atendimentoPara" value="Adulto" readOnly />
            </div>

            {/* Setor solicitado */}
            <div>
              <Label htmlFor="setorSolicitado">Setor solicitado</Label>
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
              <Label htmlFor="horarioSenha">Horário da criação da senha</Label>
              <Input id="horarioSenha" value="07:00" readOnly />
            </div>

            {/* Horário de chegada */}
            <div>
              <Label htmlFor="horarioChegada">Horário de chegada</Label>
              <Input id="horarioChegada" />
            </div>

            {/* Senha */}
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Direcionar</Button>
            <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">Stand-by</Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Finalizar</Button>
          </div>
        </div>
      </main>

      {/* Botão Flutuante */}
      <div className="fixed bottom-8 right-8">
        <Button className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-4 rounded-full shadow-lg">
          Chamar o Próximo
        </Button>
      </div>
    </div>
  );
};

export default AddPatientPage;
