import React, { useState, useEffect } from 'react';

interface QueueListProps {
  setorUuid: string;
}

interface PacienteItem {
  id: string;
  nome: string;
  // Adicione outros campos conforme o backend
}

interface AtendimentoItem {
  id: string;
  ticket: string;
  prioridade: string;
  pacienteId: string;
  // Adicione outros campos conforme o backend
}

interface QueuePatient {
  name: string;
  code: string;
  status: string;
  isPriority: boolean;
}

const QueueList = ({ setorUuid }: QueueListProps) => {
  const [pacientes, setPacientes] = useState<PacienteItem[]>([]);
  const [atendimentos, setAtendimentos] = useState<AtendimentoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pacientes
        const pacientesResponse = await fetch("https://fabrica-kqdb.onrender.com/api/paciente/");
        if (!pacientesResponse.ok) {
          throw new Error(`Erro ao buscar pacientes: ${pacientesResponse.status}`);
        }
        const pacientesData: PacienteItem[] = await pacientesResponse.json();
        setPacientes(pacientesData);

        // Fetch atendimentos
        const atendimentosResponse = await fetch(`https://fabrica-kqdb.onrender.com/api/setor/${setorUuid}/atendimento`);
        if (!atendimentosResponse.ok) {
          throw new Error(`Erro ao buscar atendimentos: ${atendimentosResponse.status}`);
        }
        const atendimentosData: AtendimentoItem[] = await atendimentosResponse.json();
        setAtendimentos(atendimentosData);
      } catch (err) {
        console.error("Erro ao buscar dados da fila:", err);
        setError("Falha ao carregar dados da fila.");
      } finally {
        setLoading(false);
      }
    };

    if (setorUuid) {
      fetchData();
    }
  }, [setorUuid]);

  // Combinar dados para exibir
  const queuePatients: QueuePatient[] = atendimentos.map(atendimento => {
    const paciente = pacientes.find(p => p.id === atendimento.pacienteId);
    return {
      code: atendimento.ticket,
      name: paciente ? paciente.nome : 'Desconhecido',
      status: atendimento.prioridade,
      isPriority: atendimento.prioridade.toLowerCase() === 'prioridade' || atendimento.prioridade.toLowerCase() === 'alta',
    };
  });

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">FILA</h2>
      {loading && <p>Carregando fila...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && queuePatients.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm">
          <span className="font-medium text-gray-800">{item.code}</span>
          <span className="font-medium text-gray-800">{item.name}</span>
          <span className={item.isPriority ? "text-red-500 font-semibold" : "text-gray-600"}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QueueList;
