"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileSymlink, UserPlus } from "lucide-react";

const HeaderAdmin = ({}) => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Image
          alt="Logomarca"
          src="/Logo.svg"
          width="50"
          height="50"
          className="cursor-pointer"
          onClick={() => router.push("/admin/home")}
        />
        <span
          className="text-lg font-semibold text-teal-600 cursor-pointer"
          onClick={() => router.push("/admin/home")}
        >
          CLINICA SAÚDE
        </span>
      </div>

      <div className="flex items-center gap-20">
        {/* Botão Sair */}
        <div className="flex items-center space-x-4">
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white "
            onClick={() => router.push("/admin/createAnuncioPage")}
          >
            <FileSymlink />
            Adicionar Anúncio
          </Button>
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white "
            onClick={() => router.push("/addPatient")}
          >
            <UserPlus />
            Adicionar Paciente
          </Button>
        </div>
        <Button
          variant="outline"
          className="text-teal-600 hover:border-red-700 hover:text-red-700 hover:bg-red-50"
        >
          Sair
        </Button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
