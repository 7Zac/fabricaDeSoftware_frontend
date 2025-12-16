"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateSetorProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateSetor: React.FC<CreateSetorProps> = ({ onClose, onSuccess }) => {
  const [nomeSetor, setNomeSetor] = useState("");
  const [isPrimeiroContato, setIsPrimeiroContato] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://fabrica-kqdb.onrender.com/api/setor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomeSetor, isPrimeiroContato }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP! Status: ${response.status}`);
      }

      await response.json();
      setMessage("Setor criado com sucesso!");
      setNomeSetor("");
      setIsPrimeiroContato(false);
      onSuccess(); // Chama a função de sucesso para atualizar a lista de setores, se houver
    } catch (error) {
      console.error("Erro ao criar setor:", error);
      setMessage("Erro ao criar setor: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">CRIAR NOVO SETOR</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomeSetor" className="block text-sm font-medium text-gray-700">
              Nome do Setor:
            </Label>
            <Input
              id="nomeSetor"
              type="text"
              value={nomeSetor}
              onChange={(e) => setNomeSetor(e.target.value)}
              placeholder="Digite o nome do setor"
              required
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPrimeiroContato"
              checked={isPrimeiroContato}
              onCheckedChange={(checked) => setIsPrimeiroContato(checked ? true : false)}
            />
            <Label htmlFor="isPrimeiroContato" className="text-sm font-medium text-gray-700">
              É Primeiro Contato?
            </Label>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Setor"}
            </Button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center" aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateSetor;
