import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Setor {
  id: string;
  nomeSetor: string;
  isPrimeiroContato: boolean;
  createdAt: string;
  updatedAt: string;
}

const NewUser = () => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [admin, setAdmin] = useState<string | null>(null);
  const [ativo, setAtivo] = useState(true);
  const [setorUuid, setSetorUuid] = useState<string>("");
  const [setores, setSetores] = useState<Setor[]>([]);

  useEffect(() => {
    const fetchSetores = async () => {
      try {
        const response = await fetch("https://fabrica-kqdb.onrender.com/api/setor");
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


  const handleSubmit = async () => {
    const userData = {
      nome,
      login,
      senha,
      ativo,
      admin: admin === "ADMIN" ? "ADMIN" : null,
      setorUuid,
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
      <div className="grid grid-cols-2 gap-5 flex-1 overflow-auto">
        {/* Nome Completo */}
        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="nome">
            Nome Completo:
          </Label>
          <Input id="nome" placeholder="Digite o nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        
        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="login">
            Login:
          </Label>
          <Input id="login" type="email" placeholder="Exemplo: nome.sobrenome" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>

        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="senha">
            Senha:
          </Label>
          <Input id="senha" type="password" placeholder="Digite a senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        {/* Admin */}
        <div className="col-span-1 flex items-center space-x-2">
          <Checkbox id="admin" checked={admin === "ADMIN"} onCheckedChange={(checked) => setAdmin(checked ? "ADMIN" : null)} />
          <Label htmlFor="admin">Administrador</Label>
        </div>

        {/* Ativo */}
        <div className="col-span-1 flex items-center space-x-2">
          <Checkbox id="ativo" checked={ativo} onCheckedChange={(checked) => setAtivo(checked ? true : false)} />
          <Label htmlFor="ativo">Ativo</Label>
        </div>

        {/* Setor */}
        <div className="col-span-2">
          <Label className="mb-1 block" htmlFor="setor">Setor:</Label>
          <Select onValueChange={(value) => setSetorUuid(value)} value={setorUuid}>
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
