"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AnuncioItem {
  id: string;
  titulo: string;
  urlYoutube: string;
  ativo: boolean;
  createdAt: string;
}

const Anuncio = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [anuncios, setAnuncios] = useState<AnuncioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const response = await fetch("https://fabrica-kqdb.onrender.com/api/ad");
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data: AnuncioItem[] = await response.json();
        setAnuncios(data);
      } catch (err) {
        console.error("Erro ao buscar anúncios:", err);
        setError("Falha ao carregar anúncios.");
        toast.error("Falha ao carregar anúncios.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnuncios();
  }, []);

  return (
    <div className="w-2/3 bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      {/* Título */}
      <h2 className="text-xl font-semibold mb-6 text-gray-800">ANÚNCIOS</h2>

      {loading && <p>Carregando anúncios...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Lista de anúncios */}
      {!loading && !error && (
        <div className="flex flex-col gap-4 mb-6">
          {anuncios.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`flex items-center justify-between cursor-pointer border-2 rounded-lg p-4 h-[140px] transition-all duration-200
                ${
                  selected === item.id
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
            >
              <div>
                <span className="text-lg font-medium text-gray-700">Título: {item.titulo}</span>
                <p className="text-sm text-gray-500">URL: {item.urlYoutube}</p>
                <p className="text-sm text-gray-500">Ativo: {item.ativo ? "Sim" : "Não"}</p>
                <p className="text-sm text-gray-500">Criado em: {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <input
                type="radio"
                name="anuncio"
                checked={selected === item.id}
                onChange={() => setSelected(item.id)}
                className="w-5 h-5 accent-teal-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}

      {/* Botão de ação */}
      
      
      <div className="flex gap-4 justify-end">
        <Button
          className={`${
            selected
              ? "bg-red-500 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed "
          }`}
          disabled={!selected}
        >
          Deletar
        </Button>
        <Button
          className={`${
            selected
              ? "bg-green-500 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed "
          }`}
          disabled={!selected}
        >
          Modificar
        </Button>
        <Button
          className={`${
            selected
              ? "bg-teal-500 hover:bg-teal-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!selected}
        >
          Reproduzir
        </Button>
        
      </div>
    </div>
  );
};

export default Anuncio;