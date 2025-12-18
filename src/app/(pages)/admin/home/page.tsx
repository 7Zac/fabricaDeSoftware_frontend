"use client";

import QueueUser from "@/app/components/QueueUser";

import HeaderAdmin from "@/app/components/HeaderAdmin";
import Anuncio from "@/app/components/Anuncio";
import Setor from "../setor/page";


const AdminHomePage = () => {
 

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-500">
      {/* Cabeçalho */}
      <HeaderAdmin />

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-wrap p-4 gap-4 relative">
        {/* Seção FILA */}
        <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">USUÁRIOS</h2>
          <QueueUser />
        </div>

        <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
         <Setor/>
        </div>

        {/* Seção PACIENTE */}
        <Anuncio />
      </main>
    </div>
  );
};

export default AdminHomePage;
