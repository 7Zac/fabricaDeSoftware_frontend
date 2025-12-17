"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Setor {
  id: string;
  nomeSetor: string;
  isPrimeiroContato: boolean;
  createdAt: string;
  updatedAt: string;
}

const QueueSetor = () => {
  const [setores, setSetores] = useState<Setor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSetores = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://fabrica-kqdb.onrender.com/api/setor");
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data: Setor[] = await response.json();
      setSetores(data);
    } catch (error) {
      console.error("Erro ao buscar setores:", error);
      setSetores([]); // Garante que seja um array vazio em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSetores();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este setor?")) {
      try {
        const response = await fetch(`https://fabrica-kqdb.onrender.com/api/setor/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        console.log("Setor excluído com sucesso:", id);
        fetchSetores(); // Atualiza a lista após a exclusão
      } catch (error) {
        console.error("Erro ao excluir setor:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg w-full mx-auto flex flex-col h-[73vh]">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-lg">Aguardando conexão com o servidor...</p>
        </div>
      ) : setores.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-lg">Nenhum setor cadastrado.</p>
        </div>
      ) : (
        <div className="space-y-2 flex-1 overflow-y-auto">
          {setores.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm"
            >
              <span className="font-semibold text-gray-800 w-1/4">{item.nomeSetor}</span>
              <span className="text-gray-600 w-1/4 text-center">
                {item.isPrimeiroContato ? "Primeiro Contato" : "Não Primeiro Contato"}
              </span>
              <span className="text-gray-600 w-1/4 text-right">
                Criado em: {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                    month:"2-digit",
                    year: "numeric"
                    })}
              </span>
              <div className="flex items-center justify-end space-x-3 w-1/5">
                <Button
                  className="text-white hover:text-teal-300 transition"
                  title="Editar setor"
                  // onClick={() => handleEdit(item.id)}
                >
                  <Pencil size={20} />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  className="text-white hover:text-teal-300 transition"
                  title="Excluir setor"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueSetor;
