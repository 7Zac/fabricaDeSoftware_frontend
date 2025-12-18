"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface HeaderTriagemProps {
  activeTab: "T" | "S";
  setActiveTab: (tab: "T" | "S") => void;
}

interface AtendenteItem {
  id: string;
  nome: string;
  login: string;
  ativo: boolean;
  admin: string | null;
  fkSetor: string;
  createdAt: string;
  updatedAt: string;
}

const HeaderTriagem = ({ activeTab, setActiveTab }: HeaderTriagemProps) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("userId");
    router.push("/");
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          toast.error("Token ou ID do usuário não encontrado. Faça login novamente.");
          setError("Token ou ID do usuário não encontrado.");
          setLoading(false);
          return;
        }

        const response = await fetch("https://fabrica-kqdb.onrender.com/api/atendente", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data: AtendenteItem[] = await response.json();
        const loggedInUser = data.find((atendente) => atendente.id === userId);

        if (loggedInUser) {
          setUserName(loggedInUser.nome);
        } else {
          setUserName("Usuário"); // Fallback se o usuário logado não for encontrado na lista
        }
      } catch (err) {
        console.error("Erro ao buscar nome do usuário:", err);
        setError("Falha ao carregar nome do usuário.");
        toast.error("Falha ao carregar nome do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Image alt="Logomarca" src="/Logo.svg" width="50" height="50" />
        <span className="text-lg font-semibold text-teal-600">
          CLINICA SAÚDE
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {loading && <p>Carregando nome...</p>}
        {error && <p className="text-red-500">Erro</p>}
        {userName && <span className="text-lg font-semibold text-gray-700">Olá, {userName}</span>}

        {/* Botão Sair */}
        <Button
          variant="outline"
          className="text-teal-600 border-teal-600 hover:bg-teal-50"
          onClick={handleLogout}
        >
          Sair
        </Button>

        {/* Botão G */}
        <Button
          onClick={() => setActiveTab("T")}
          className={`transition-all duration-300 ${
            activeTab === "T"
              ? "bg-[#00B49F] scale-110 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          T
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

export default HeaderTriagem;