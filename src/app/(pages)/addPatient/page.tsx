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
import Paciente from "@/app/components/Paciente";
import DirectionDialog from "@/app/components/Direction";

interface newPatient {
  name: string;
  status: string;
  isPriority: boolean;
  timeCreate: string;
  timeStart: string;
}

const AddPatientPage = () => {
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">FILA</h2>
          <QueueList />
        </div>

        {/* Seção PACIENTE */}
        <Paciente />
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
