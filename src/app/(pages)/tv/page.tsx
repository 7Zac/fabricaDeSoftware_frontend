"use client";

import React, { useEffect, useState } from "react";
import ClinicLogo from "@/app/components/tv/ClinicLogo";
import CurrentPatient from "@/app/components/tv/CurrentPatient";
import LastCalledPatients from "@/app/components/tv/LastCalledPatients";
import WelcomeBanner from "@/app/components/tv/WelcomeBanner";
import Image from "next/image";
import AnuncioPage from "./anuncio/[id]/anuncioID"; // Importar AnuncioPage

interface Anuncio {
  id: string;
  titulo: string;
  urlYoutube: string;
  ativo: boolean;
}

const TVPage = () => {
  const [activeAdId, setActiveAdId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("https://fabrica-kqdb.onrender.com/api/ad");
        if (!response.ok) {
          throw new Error(`Erro ao buscar anúncios: ${response.statusText}`);
        }
        const ads: Anuncio[] = await response.json();
        const activeAd = ads.find((ad) => ad.ativo);

        if (activeAd) {
          setActiveAdId(activeAd.id);
        } else {
          setActiveAdId(null);
        }
      } catch (err) {
        console.error("Erro ao buscar anúncios:", err);
        setActiveAdId(null);
      }
    };

    fetchAds();
    const interval = setInterval(fetchAds, 30000); // Poll a cada 30 segundos
    return () => clearInterval(interval);
  }, []); // Dependência vazia, pois router não é mais usado para redirecionar

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden">
      {/* Main Content Area - Black Background */}
      <div className="flex-1 relative bg-black flex flex-col p-8 lg:p-12">
        {/* Renderiza o AnuncioPage se houver um activeAdId */}
        {activeAdId ? (
          <div className="h-full w-full absolute inset-0 flex items-center justify-center">
            <AnuncioPage params={{ id: activeAdId }} />
          </div>
        ) : (
          <>
            {/* Background Image Placeholder - Medical Professionals */}
            <div
              className="absolute right-5 top-8 w-5/6 h-full z-0 "
              // style={{
              //   background:
              //     "linear-gradient(135deg, rgba(255, 22, 22, 0.1) 0%, rgba(255, 0, 0, 0.1) 100%)",
              //   filter: "red(3px)",
              // }}
            />

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
        )}
      </div>

      {/* Bottom Banner */}
      <WelcomeBanner />
    </div>
  );
};

export default TVPage;
