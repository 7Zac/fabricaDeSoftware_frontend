import React from 'react';

interface QueuePatient {
  name: string;
  code: string;
  Setor: string;
}

const QueueUser = () => {
  const queuePatients: QueuePatient[] = [
    { code: 'U001', name: 'Joana Dark', Setor: 'Guiche' },
    { code: 'U003', name: 'Maria da Silva', Setor: 'Triagem' },
    { code: 'U002', name: 'José Luiz', Setor: 'Guiche' },
  ];

  return (
    <div className="space-y-2">
      {queuePatients.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm">
          <span className="font-medium text-gray-800">{item.code}</span>
          <span className="font-medium text-gray-800">{item.name}</span>
            <span className="text-gray-600">{item.Setor}</span>
        </div>
      ))}
    </div>
  );
};

export default QueueUser;
