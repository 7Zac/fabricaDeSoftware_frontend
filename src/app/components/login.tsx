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
import { toast } from "sonner";

const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("https://fabrica-kqdb.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: login, senha: senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.token) {
          localStorage.setItem("authToken", data.token); 
          localStorage.setItem("userLogin", data.login);
          localStorage.setItem("userId", data.id); 
        }
        toast.success("Login bem-sucedido!");
        if (data.admin === "ADMIN") {
          router.push("/admin/home"); 
        } else {
          router.push("/triagem");
        }
      } else {
        const errorData = await response.json();
        toast.error(`Erro de login: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      toast.error("Ocorreu um erro ao tentar fazer login.");
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
              <Label htmlFor="Login">Login</Label>
              <Input
                id="login"
                type="text"
                placeholder="Ex: nome.sobrenome"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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
