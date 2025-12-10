import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


const CreateAnuncio = () => {
  return (
    <>
        {/* Seção USUÁRIO */}
        <div className="w-2/3 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">ADICIONAR ANÚNCIO</h2>
          <div className="flex items-center justify-center p-3 max-w-sm min-h-[200px] bg-gray-300 rounded-md shadow-sm">
            Foto do Anúncio
          </div>
          <div className="grid grid-cols-2 mt-5 gap-4">
            {/* Nome Completo */}
            <div className="col-span-2">
              <Label className="mb-2" htmlFor="nomeAnuncio">
                Nome do Anúncio:
              </Label>
              <Input id="nomeAnuncio" readOnly />
            </div>

            {/* Atendimento Preferencial? */}
            <div>
              <Label className="mb-2" htmlFor="linkAnuncio">
                Link do Anúncio:
              </Label>
              <Input id="linkAnuncio" readOnly />
            </div>
            {/* Horário da criação da senha */}
            <div>
              <Label className="mb-2" htmlFor="tempoAnuncio">
                Tempo do Anúncio:
              </Label>
              <Input type="time" id="tempoAnuncio" value="" readOnly />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-2 mt-30">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Adicionar
            </Button>
          </div>
        </div>
    </>
  );
};

export default CreateAnuncio;