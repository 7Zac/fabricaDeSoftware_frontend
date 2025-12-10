"use client";
import { Button } from "@/components/ui/button";
import QueueUser from "@/app/components/QueueUser";

import Usuario from "@/app/components/Usuario";




import HeaderAdmin from "@/app/components/HeaderAdmin";
import Anuncio from "@/app/components/Anuncio";

interface newUser {
  name: string;
  status: string;
  isPriority: boolean;
  timeCreate: string;
  timeStart: string;
}

const AdminHomePage = () => {


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-500 overflow-hidden">
      {/* Cabeçalho */}
       <HeaderAdmin />

      {/* Conteúdo Principal */}
      <main className="flex-1 flex p-4 space-x-4 relative overflow-hidden">
              {/* Seção FILA */}
              <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">USUÁRIOS</h2>
                <QueueUser />
              </div>

              {/* Seção PACIENTE */}
              <Anuncio />
      </main>
    </div>
  );
};

export default AdminHomePage;