"use client";

import React from "react";
import ClinicLogo from "@/app/components/tv/ClinicLogo";
import CurrentPatient from "@/app/components/tv/CurrentPatient";
import LastCalledPatients from "@/app/components/tv/LastCalledPatients";
import WelcomeBanner from "@/app/components/tv/WelcomeBanner";

const TVPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden">
      {/* Main Content Area - Black Background */}
      <div className="flex-1 relative bg-black flex flex-col p-8 lg:p-12">
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
          <img
            src="/image 2 (1).svg"
            alt="Medical Professionals"
            className="h-full w-full object-cover opacity-60"
          />
        </div>

        {/* Dark Overlay on Right */}
        <div className="absolute right-0 top-0 w-1/3 h-1/2 bg-slate-900/70 z-1" />

        {/* Decorative Diagonal Lines Pattern */}
        <div
          className="absolute right-0 top-0 w-2/5 h-full z-1 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(148, 163, 184, 0.3) 20px, rgba(148, 163, 184, 0.3) 40px)",
          }}
        />

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
      </div>

      {/* Bottom Banner */}
      <WelcomeBanner />
    </div>
  );
};

export default TVPage;
