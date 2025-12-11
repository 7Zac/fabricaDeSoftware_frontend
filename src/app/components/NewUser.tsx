import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";

const NewUser = () => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    const userData = {
      nome,
      login,
      senha,
      ativo: true, // Assumindo que novos usuários são criados como ativos por padrão
    };

    try {
      const response = await fetch("https://fabrica-kqdb.onrender.com/api/atendente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Usuário criado com sucesso:", result);
      alert("Usuário criado com sucesso!");
      // Limpar formulário após sucesso
      setNome("");
      setLogin("");
      setSenha("");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[700px] h-[550px] flex flex-col justify-between">
      {/* Cabeçalho */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">NOVO USUÁRIO</h2>

      {/* Grid de campos */}
      <div className="grid flex-col gap-10">
        {/* Nome Completo */}
        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="nome">
            Nome Completo:
          </Label>
          <Input id="nome" placeholder="Digite o nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        {/* Login (Email) */}
        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="login">
            Email:
          </Label>
          <Input id="login" type="email" placeholder="Digite o email" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>

        {/* Senha */}
        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="senha">
            Senha:
          </Label>
          <Input id="senha" type="password" placeholder="Digite a senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
      </div>

      {/* Botão de ação */}
      <div className="flex justify-end mt-6">
        <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg" onClick={handleSubmit}>
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default NewUser;
