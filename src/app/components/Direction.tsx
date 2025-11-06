"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Props = {
  onConfirm?: (local: string, observacao?: string) => void;
  triggerText?: string;
};

export default function DirectionDialog({ onConfirm, triggerText = "Direcionar" }: Props) {
  const [local, setLocal] = useState<string>("");
  const [observacao, setObservacao] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Direcionar paciente</DialogTitle>
          <DialogDescription>
            Selecione o local para onde o paciente será encaminhado e adicione observações (opcional).
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="localSelect" className="mb-2">Local</Label>
            <Select onValueChange={(v) => setLocal(v)}>
              <SelectTrigger id="localSelect" className="w-full">
                <SelectValue placeholder="Selecione o local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="triagem">Triagem</SelectItem>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="exames">Exames</SelectItem>
                <SelectItem value="retorno">Retorno</SelectItem>
                <SelectItem value="emergencia">Emergência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="observacao" className="mb-2">Observações</Label>
            <Input
              id="observacao"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Observações (opcional)"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              onClick={() => {
                onConfirm?.(local, observacao);
              }}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}