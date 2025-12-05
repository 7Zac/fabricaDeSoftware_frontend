"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeaderAdmin = ({}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Image alt="Logomarca" src="/Logo.svg" width="50" height="50" />
        <span className="text-lg font-semibold text-teal-600">
          CLINICA Saúde
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Botão Sair */}
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