import React from "react";

interface CurrentPatientProps {
  name?: string;
  code?: string;
}

const CurrentPatient: React.FC<CurrentPatientProps> = ({
  name = "MARIA EDUARDA SILVA",
  code = "P010",
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <span className="text-white text-lg font-sans tracking-wide uppercase">
        PACIENTE:
      </span>
      <h2 className="text-teal-400 text-5xl lg:text-6xl font-sans font-bold tracking-wide uppercase">
        {name}
      </h2>
      <span className="text-amber-600 text-4xl lg:text-5xl font-sans font-bold tracking-wider uppercase">
        {code}
      </span>
    </div>
  );
};

export default CurrentPatient;
