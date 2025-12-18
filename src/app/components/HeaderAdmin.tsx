"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileSymlink, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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

const HeaderAdmin = () => {
  const router = useRouter();
  const [adminName, setAdminName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("userId");
    router.push("/");
  };

  useEffect(() => {
    const fetchAdminName = async () => {
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
          setAdminName(loggedInUser.nome);
        } else {
          setAdminName("Usuário"); // Fallback se o usuário logado não for encontrado na lista
        }
      } catch (err) {
        console.error("Erro ao buscar nome do administrador:", err);
        setError("Falha ao carregar nome do administrador.");
        toast.error("Falha ao carregar nome do administrador.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminName();
  }, []);

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

      <div className="flex items-center gap-4">
        {loading && <p>Carregando nome...</p>}
        {error && <p className="text-red-500">Erro</p>}
        {adminName && <span className="text-lg font-semibold text-gray-700">Olá, {adminName}</span>}

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
            Totem - Paciente
          </Button>
        </div>
        <Button
          variant="outline"
          className="text-teal-600 hover:border-red-700 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
