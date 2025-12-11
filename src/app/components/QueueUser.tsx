"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewUser from "@/app/components/NewUser";
import { Pencil, Trash2 } from "lucide-react";
import UpdateUser from "./UpdateUser";

interface Atendente {
  id: string;
  nome: string;
  login: string;
  ativo: boolean;
}

const QueueUser = () => {
  const [showNewUser, setShowNewUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [atendentes, setAtendentes] = useState<Atendente[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Adicionando estado de carregamento

  useEffect(() => {
    const fetchAtendentes = async () => {
      try {
        setIsLoading(true); // Inicia o carregamento
        const response = await fetch("https://fabrica-kqdb.onrender.com/api/atendente");
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data: Atendente[] = await response.json();
        setAtendentes(data);
      } catch (error) {
        console.error("Erro ao buscar atendentes:", error);
      } finally {
        setIsLoading(false); // Finaliza o carregamento, independentemente do sucesso ou erro
      }
    };

    fetchAtendentes();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este atendente?")) {
      try {
        const authToken = localStorage.getItem("authToken"); // Recupera o token do localStorage

        if (!authToken) {
          alert("Token de autenticação não encontrado. Faça login novamente.");
          return;
        }

        const response = await fetch(`https://fabrica-kqdb.onrender.com/api/atendente/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${authToken}`, // Adiciona o token ao cabeçalho
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        console.log("Atendente excluído com sucesso:", id);
        // Atualiza a lista de atendentes após a exclusão
        setAtendentes(atendentes.filter(atendente => atendente.id !== id));
      } catch (error) {
        console.error("Erro ao excluir atendente:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg  w-full mx-auto flex flex-col h-[73vh]">
      {/* Lista */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">Aguardando conexão com o servidor...</p>
          </div>
        ) : atendentes.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">Nenhum atendente cadastrado.</p>
          </div>
        ) : (
          atendentes.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm"
            >
              <span className="font-semibold text-gray-800 w-1/4">{item.id}</span>
              <span className="font-medium text-gray-800 w-1/2 text-center">
                {item.nome}
              </span>
              <span className="text-gray-600 w-1/4 text-right">{item.login}</span>
               {/* Ícones de ação */}
                <div className="flex items-center justify-end space-x-3 w-1/5">
                  <button
                    onClick={() => setShowUpdateUser(true)}
                    className="text-teal-500 hover:text-teal-600 transition"
                    title="Editar usuário"
                  >
                    <Pencil size={20} />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-teal-500 hover:text-teal-600 transition"
                    title="Excluir usuário"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
            </div>
          ))
        )}
      </div>

      {/* Botão para abrir o modal */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => setShowNewUser(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white text-2xl w-12 h-12 rounded-full shadow-md transition-transform hover:scale-110"
        >
          +
        </Button>
      </div>

      {/* Modal com fundo borrado */}
      <AnimatePresence>
        {showNewUser && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Conteúdo do modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="flex flex-col items-end">
                {/* Botão para fechar */}
                <Button
                  onClick={() => setShowNewUser(false)}
                  variant="outline"
                  className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 text-gray-700 shadow-md hover:bg-gray-100"
                >
                  ✕
                </Button>

                {/* Componente de criação de usuário */}
                <NewUser />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal com fundo borrado */}
      <AnimatePresence>
        {showUpdateUser && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Conteúdo do modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="flex flex-col items-end">
                {/* Botão para fechar */}
                <Button
                  onClick={() => setShowUpdateUser(false)}
                  variant="outline"
                  className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 text-gray-700 shadow-md hover:bg-gray-100"
                >
                  ✕
                </Button>

                {/* Componente de criação de usuário */}
                <UpdateUser />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QueueUser;