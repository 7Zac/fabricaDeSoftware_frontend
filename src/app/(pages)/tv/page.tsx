"use client";

import ClinicLogo from "@/app/components/tv/ClinicLogo";
import CurrentPatient from "@/app/components/tv/CurrentPatient";
import LastCalledPatients from "@/app/components/tv/LastCalledPatients";
import WelcomeBanner from "@/app/components/tv/WelcomeBanner";
import Image from "next/image";

const TVPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden">
      {/* Main Content Area - Black Background */}
      <div className="flex-1 relative bg-transparent flex flex-col p-8 lg:p-12">
        {/* Renderiza o AnuncioPage se houver um activeAdId */}

        <div className=" bg-transparent absolute top-0 right-0 w-1/4 h-1/4 p-4 z-20">
          {" "}
          {/* Adicionado p-4 e z-20 para espaçamento e sobreposição */}
          {/* <AnuncioPage params={{ id: activeAdId }} /> */}
        </div>

        <>
          {/* Background Image Placeholder - Medical Professionals */}
          <div className="absolute right-5 top-8 w-5/6 h-full z-0 " />

          {/* Medical Image - Medical Professionals */}
          <div className="absolute right-0 top-0 w-2,5/5 h-full z-0">
            <Image
              width={1000}
              height={1000}
              src="/image2(1).svg"
              alt="Medical Professionals"
              className="h-full w-full opacity-60"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col">
            {/* Top Section - Logo */}
            <div className="mb-8">
              <ClinicLogo />
            </div>

            {/* Main Patient Info Section */}
            <div className="flex-1 flex flex-col justify-between max-w-3xl">
              {/* Left Side - Current Patient */}
              <div className="mb-12">
                <CurrentPatient />
              </div>

              {/* Bottom - Last Called Patients */}
              <div className="mt-auto">
                <LastCalledPatients />
              </div>
            </div>
          </div>
        </>
      </div>

      {/* Bottom Banner */}
      <WelcomeBanner />
    </div>
  );
};

export default TVPage;
