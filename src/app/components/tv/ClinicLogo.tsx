import React from "react";
import Image from "next/image";

const ClinicLogo = () => {
  return (
    <div className="flex items-start">
      <Image
        src="/Logo.svg"
        alt="Clínica Saúde Logo"
        width={18}
        height={150}
        className="w-25 h-30 object-contain"
        priority
      />
    </div>
  );
};

export default ClinicLogo;
