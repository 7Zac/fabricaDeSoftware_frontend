"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita o recarregamento da página

    try {
      const response = await fetch("https://fabrica-kqdb.onrender.com/api/login", { // Rota de login corrigida
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: email, senha: password }), // Assumindo que o login espera 'login' e 'senha'
      });

      if (response.ok) {
        const data = await response.json();
        // Supondo que a API retorna um token na resposta de sucesso. Ajuste conforme a sua API.
        if (data && data.token) {
          localStorage.setItem("authToken", data.token); // Armazenar o token
        }
        alert("Login bem-sucedido!");
        router.push("/admin/home"); // Redireciona para a página admin/home
      } else {
        const errorData = await response.json();
        alert(`Erro de login: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      alert("Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <Card className="w-full max-w-sm gap-6">
      <CardHeader className="flex justify-center">
        <CardTitle>Entre para continuar</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleLoginSubmit}> {/* Adiciona o onSubmit ao formulário */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="login-form"> {/* O type="submit" no botão acionará o onSubmit do formulário */}
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
