"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface Setor {
  id: string;
  nomeSetor: string;
  isPrimeiroContato: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Token() {
  const [setorUuid, setSetorUuid] = useState<string>("");
  const [setores, setSetores] = useState<Setor[]>([]);

  useEffect(() => {
    const fetchSetores = async () => {
      try {
        const response = await fetch(
          "https://fabrica-kqdb.onrender.com/api/setor"
        );
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data: Setor[] = await response.json();
        setSetores(data);
        if (data.length > 0) {
          setSetorUuid(data[0].id);
        }
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      }
    };
    fetchSetores();
  }, []);
  // Estados de tela: "inicio", "form" ou "senha"
  const [stage, setStage] = useState<"inicio" | "form" | "senha">("inicio");
  // Estados para os botões de seleção
  const [preferencial, setPreferencial] = useState<"sim" | "nao" | null>(null);
  const [tipoAtendimento, setTipoAtendimento] = useState<
    "crianca" | "adulto" | null
  >(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {/* === TELA 1: INÍCIO === */}
        {stage === "inicio" && (
          <motion.div
            key="inicio"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <Image
              src="/Logo.svg"
              alt="Logo da Clínica"
              width={100}
              height={100}
              priority
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Bem vindo à Clínica Mais Saúde
            </h1>
            <p className="text-gray-600 mt-2">
              Para iniciar o atendimento clique no botão abaixo
            </p>

            <Button
              onClick={() => setStage("form")}
              className="mt-6 w-[280px] h-[80px] bg-[#00B49F] hover:bg-[#007668] text-white text-xl font-semibold transition-transform hover:scale-105"
            >
              Iniciar atendimento
            </Button>
          </motion.div>
        )}

        {/* === TELA 2: FORMULÁRIO === */}
        {stage === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md"
          >
            <Image
              src="/Logo.svg"
              alt="Logo da Clínica"
              width={100}
              height={100}
              className="mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Adicione as informações do paciente
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStage("senha"); // Muda para a tela final
              }}
              className="flex flex-col w-full gap-4 text-left"
            >
              <label className="font-medium text-gray-700">
                Nome Completo:
              </label>
              <input
                type="text"
                placeholder="Digite o nome completo"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B49F]"
                required
              />

              {/* Seções de seleção */}
              <div className="flex justify-between mt-2 flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Atendimento Preferencial?
                  </span>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPreferencial("sim")}
                      className={`bg-gray-100 text-gray-800 hover:bg-gray-200 ${
                        preferencial === "sim"
                          ? "bg-[#00B49F] text-white border-[#00B49F]"
                          : ""
                      }`}
                    >
                      Sim
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPreferencial("nao")}
                      className={`bg-gray-100 text-gray-800 hover:bg-gray-200 ${
                        preferencial === "nao"
                          ? "bg-[#00B49F] text-white border-[#00B49F]"
                          : ""
                      }`}
                    >
                      Não
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Atendimento para:
                  </span>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setTipoAtendimento("crianca")}
                      className={`bg-gray-100 text-gray-800 hover:bg-gray-200 ${
                        tipoAtendimento === "crianca"
                          ? "bg-[#00B49F] text-white border-[#00B49F]"
                          : ""
                      }`}
                    >
                      Criança
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setTipoAtendimento("adulto")}
                      className={`bg-gray-100 text-gray-800 hover:bg-gray-200 ${
                        tipoAtendimento === "adulto"
                          ? "bg-[#00B49F] text-white border-[#00B49F]"
                          : ""
                      }`}
                    >
                      Adulto
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-medium text-gray-700">
                  Qual setor do seu atendimento?
                </label>
                <Select
                  onValueChange={(value) => setSetorUuid(value)}
                  value={setorUuid}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((setor) => (
                      <SelectItem key={setor.id} value={setor.id}>
                        {setor.nomeSetor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={!preferencial || !tipoAtendimento}
                className={`mt-6 font-semibold py-2 ${
                  !preferencial || !tipoAtendimento
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#00B49F] hover:bg-[#007668] text-white"
                }`}
              >
                Gerar Senha
              </Button>
            </form>
          </motion.div>
        )}

        {/* === TELA 3: SENHA GERADA === */}
        {stage === "senha" && (
          <motion.div
            key="senha"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <Image
              src="/Logo.svg"
              alt="Logo da Clínica"
              width={100}
              height={100}
            />
            <h2 className="text-3xl font-semibold text-gray-900">
              Senha gerada!
            </h2>
            <p className="text-gray-600 max-w-md">
              Favor, retire sua senha impressa e aguarde na sala de espera.
            </p>

            <Button
              onClick={() => {
                setStage("inicio");
                setPreferencial(null);
                setTipoAtendimento(null);
              }}
              className="mt-4 bg-[#00B49F] hover:bg-[#007668] text-white font-semibold"
            >
              Voltar ao início
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
