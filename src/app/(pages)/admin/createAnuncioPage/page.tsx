"use client";
import { Button } from "@/components/ui/button";
import QueueUser from "@/app/components/QueueUser";

import Usuario from "@/app/components/Usuario";




import HeaderAdmin from "@/app/components/HeaderAdmin";
import Anuncio from "@/app/components/Anuncio";
import CreateAnuncio from "@/app/components/CreateAnuncio";

interface newUser {
  name: string;
  status: string;
  isPriority: boolean;
  timeCreate: string;
  timeStart: string;
}

const CreateAnuncioPage = () => {


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-500 overflow-hidden">
      {/* Cabeçalho */}
       <HeaderAdmin />

      {/* Conteúdo Principal */}
      <main className="flex-1 justify-center mt-5 flex p-4 space-x-4 relative overflow-hidden">
              <CreateAnuncio />
      </main>
    </div>
  );
};

export default CreateAnuncioPage;