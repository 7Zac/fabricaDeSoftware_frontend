"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const Anuncio = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const anuncios = [
    { id: 1, nome: "Anúncio 1" },
    { id: 2, nome: "Anúncio 2" },
    { id: 3, nome: "Anúncio 3" },
  ];

  return (
    <div className="w-2/3 bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      {/* Título */}
      <h2 className="text-xl font-semibold mb-6 text-gray-800">ANÚNCIOS</h2>

      {/* Lista de anúncios */}
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
            <span className="text-lg font-medium text-gray-700">
              {item.nome}
            </span>
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