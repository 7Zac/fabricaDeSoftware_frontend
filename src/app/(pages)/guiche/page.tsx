"use client";

import { Button } from "@/components/ui/button";
import QueueList from "@/app/components/QueueList";
import QueueListStand from "@/app/components/QueueListStand";
import Paciente from "@/app/components/Paciente";
import PacienteStand from "@/app/components/PacienteStand";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderGuiche from "@/app/components/HeaderGuiche";


const AddPatientPage = () => {

  const [activeTab, setActiveTab] = useState<"G" | "S">("G");


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-500 overflow-hidden">
      {/* Cabeçalho */}

       <HeaderGuiche activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conteúdo Principal */}
      <main className="flex-1 flex p-4 space-x-4 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "G" ? (
            <motion.div
              key="guiche"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-1 space-x-4"
            >
              {/* Seção FILA */}
              <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
                <QueueList setorUuid="guiche" />
              </div>

              {/* Seção PACIENTE */}
              <Paciente />
            </motion.div>
          ) : (
            <motion.div
              key="standby"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-1 space-x-4"
            >
              {/* Seção STAND-BY */}
              <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  STAND-BY
                </h2>
                <QueueListStand />
              </div>

              {/* Seção PACIENTE STAND-BY */}
              <PacienteStand />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Botão Flutuante com transição */}
      <AnimatePresence mode="wait">
        {activeTab === "G" ? (
          <motion.div
            key="btnG"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8"
          >
            <Button className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-4 rounded-full shadow-lg">
              Chamar o Próximo
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="btnS"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8"
          >
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-8 py-4 rounded-full shadow-lg">
              Chamar o Próximo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AddPatientPage;