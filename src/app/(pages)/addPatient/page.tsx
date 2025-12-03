"use client";
import { useState } from "react";
import Image from "next/image";
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
import QueueList from "@/app/components/QueueList";
import DirectionDialog from "@/app/components/Direction";
import QueueList_Standby from "@/app/components/QueueList_Standby";

interface newPatient {
  name: string;
  status: string;
  isPriority: boolean;
  timeCreate: string;
  timeStart: string;
}

const AddPatientPage = () => {
  const [isStandby, setIsStandby] = useState(false);

  const handleStandby = () => {
    setIsStandby(true);
  };

  const handleReturnAttendance = () => {
    setIsStandby(false);
  };

  const handleCallNext = () => {
    console.log("Chamar o próximo"); // substituir pela lógica real
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Image alt="Logomarca" src="/Logo.svg" width="50" height="50" />
          <span className="text-lg font-semibold text-teal-600">
            CLINICA Saúde
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            Sair
          </Button>

          <Button className="bg-[#00B49F]">
            <a href="#">G</a>
          </Button>

          <Button className="bg-green-500">
            <a href="#">S</a>
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex p-4 space-x-4">
        {/* Seção FILA */}
        <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
          {isStandby ? <QueueList_Standby /> : <QueueList />}
        </div>
        

        {/* Seção PACIENTE */}
        <div className="w-2/3 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">PACIENTE</h2>
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
              <Label className="mb-2" htmlFor="atendimentoPreferencial">
                Atendimento Preferencial?
              </Label>
              <Input id="atendimentoPreferencial" readOnly />
            </div>

            {/* Atendimento para: */}
            <div>
              <Label className="mb-2" htmlFor="atendimentoPara">
                Atendimento para:
              </Label>
              <Input id="atendimentoPara" value="" readOnly />
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
            <DirectionDialog />
            {!isStandby && (
              <Button
                onClick={handleStandby}
                variant="outline"
                className="border-teal-500 text-teal-500 hover:bg-teal-50"
              >
                Stand-by
              </Button>
            )}
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Finalizar
            </Button>
          </div>
        </div>
      </main>

       {/* Botões Flutuantes */}
      {isStandby ? (
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={handleReturnAttendance}
            className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-4 rounded-full shadow-lg"
          >
            Retornar Atendimento
          </Button>
        </div>
      ) : (
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={handleCallNext}
            className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-4 rounded-full shadow-lg"
          >
            Chamar o Próximo
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddPatientPage;
