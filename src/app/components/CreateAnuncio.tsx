"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const CreateAnuncio = () => {
  const [titulo, setTitulo] = useState("");
  const [urlYoutube, setUrlYoutube] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Token de autorização não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const res = await fetch("https://fabrica-kqdb.onrender.com/api/ad/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, urlYoutube, ativo }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText || "Erro na requisição");
      }

      await res.json();
      toast.success("Anúncio criado com sucesso.");
      setTitulo("");
      setUrlYoutube("");
      setAtivo(true);
    } catch (err) {
      toast.error(
        "Erro ao criar anúncio: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/3 bg-white rounded-lg shadow-md p-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        ADICIONAR ANÚNCIO
      </h2>
      <div className="grid grid-cols-2 mt-5 gap-4">
        <div className="col-span-2">
          <Label className="mb-2" htmlFor="nomeAnuncio">
            Nome do Anúncio:
          </Label>
          <Input
            id="nomeAnuncio"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título do anúncio"
            required
          />
        </div>

        <div className="col-span-2">
          <Label className="mb-2" htmlFor="linkAnuncio">
            Link do Anúncio (YouTube):
          </Label>
          <Input
            id="linkAnuncio"
            value={urlYoutube}
            onChange={(e) => setUrlYoutube(e.target.value)}
            placeholder="https://www.youtube.com/..."
            required
          />
        </div>

        <div className="flex w-20 items-center col-span-2">
          <Checkbox
            id="ativoAnuncio"
            checked={ativo}
            onCheckedChange={(checked: boolean) => setAtivo(checked)}
            className="mr-2"
          />
          <Label htmlFor="ativoAnuncio">Ativo</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Adicionar"}
        </Button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-gray-700" aria-live="polite">
          {message}
        </p>
      )}
    </form>
  );
};

export default CreateAnuncio;
