import React from 'react';

interface QueuePatient {
  code: string;
  status: string;
  isPriority: boolean;
}

const QueueList = () => {
  const queuePatients: QueuePatient[] = [
    { code: 'A001', status: 'Normal', isPriority: false },
    { code: 'P001', status: 'Prioridade', isPriority: true },
    { code: 'A002', status: 'Normal', isPriority: false },
  ];

  return (
    <div className="space-y-2">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">FILA-STAND BY</h2>
      {queuePatients.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm">
          <span className="font-medium text-gray-800">{item.code}</span>
          <span className={item.isPriority ? "text-red-500 font-semibold" : "text-gray-600"}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QueueList;
