import React from "react";

interface LastCalledPatient {
  name: string;
  code: string;
  isHighlighted?: boolean;
}

interface LastCalledPatientsProps {
  patients?: LastCalledPatient[];
}

const LastCalledPatients: React.FC<LastCalledPatientsProps> = ({
  patients = [
    { name: "ANA C.", code: "P009", isHighlighted: true },
    { name: "PEDRO R.", code: "P008", isHighlighted: false },
    { name: "MARCOS A.", code: "P007", isHighlighted: false },
  ],
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-center">
        <span className="text-white text-lg font-sans tracking-wide uppercase">
          ÚLTIMOS CHAMADOS:
        </span>
        <div className="border-t border-gray-400 w-full mt-2"></div>
      </div>

      <div className="flex justify-center gap-20">
        {patients.map((patient, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 ${
              patient.isHighlighted ? "bg-orange-700 px-4 py-2 rounded" : ""
            }`}
          >
            <span
              className={`text-xl font-sans font-bold ${
                patient.isHighlighted ? "text-white" : "text-white"
              }`}
            >
              {patient.name}
            </span>
            <span className="text-xl font-sans text-white">
              ({patient.code})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastCalledPatients;
