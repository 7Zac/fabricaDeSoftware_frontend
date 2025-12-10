"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeaderAdmin = ({}) => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Image alt="Logomarca" src="/Logo.svg" width="50" height="50"
        className="cursor-pointer"
        onClick={() => router.push("/admin/home")} />
        <span className="text-lg font-semibold text-teal-600 cursor-pointer"
        onClick={() => router.push("/admin/home")}>
          CLINICA SAÚDE
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Botão Sair */}
        <Button className="bg-teal-500 hover:bg-teal-600 text-white " 
        onClick={() => router.push("/admin/createAnuncioPage")}>
              Adicionar Anúncio
        </Button>
        <Button
          variant="outline"
          className="text-teal-600 border-teal-600 hover:bg-teal-50"
        >
          Sair
        </Button>
      </div>
    </header>
  );
};

export default HeaderAdmin;