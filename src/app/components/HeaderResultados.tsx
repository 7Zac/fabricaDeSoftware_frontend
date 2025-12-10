"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderResultadosProps {
  activeTab: "R" | "S";
  setActiveTab: (tab: "R" | "S") => void;
}

const HeaderResultados = ({ activeTab, setActiveTab }: HeaderResultadosProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Image alt="Logomarca" src="/Logo.svg" width="50" height="50" />
        <span className="text-lg font-semibold text-teal-600">
          CLINICA SAÚDE
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

        {/* Botão G */}
        <Button
          onClick={() => setActiveTab("R")}
          className={`transition-all duration-300 ${
            activeTab === "R"
              ? "bg-[#00B49F] scale-110 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          R
        </Button>

        {/* Botão S */}
        <Button
          onClick={() => setActiveTab("S")}
          className={`transition-all duration-300 ${
            activeTab === "S"
              ? "bg-yellow-500 scale-125 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          S
        </Button>
      </div>
    </header>
  );
};

export default HeaderResultados;