"use client";

import CreateSetor from "@/app/components/CreateSetor";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import QueueSetor from "@/app/components/QueueSetor";

const Setor = () => {
  const [showCreateSetor, setShowCreateSetor] = useState(false);
  const [refreshSetores, setRefreshSetores] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">SETORES</h2>
      
      <QueueSetor key={refreshSetores ? "refresh" : "no-refresh"} />
      <AnimatePresence>
        {showCreateSetor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <CreateSetor
                onClose={() => setShowCreateSetor(false)}
                onSuccess={() => {
                  setShowCreateSetor(false);
                  setRefreshSetores((prev) => !prev);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setShowCreateSetor(true)}
        className="bg-teal-500 hover:bg-teal-700 transition text-white font-bold py-2 px-4 mb-10 rounded-full"
      >
        +
      </button>
    </div>
  );
};

export default Setor;
