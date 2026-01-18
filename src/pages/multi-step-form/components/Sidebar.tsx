import React from "react";

// Import your images
import bgSidebarDesktop from "../assets/images/bg-sidebar-desktop.svg?url";

interface Step {
  number: number;
  title: string;
}

interface SidebarProps {
  currentStep: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { number: 1, title: "YOUR INFO" },
    { number: 2, title: "SELECT PLAN" },
    { number: 3, title: "ADD-ONS" },
    { number: 4, title: "SUMMARY" },
  ];

  return (
    <div
      className="relative bg-linear-to-br from-purple-200 via-blue-400 to-indigo-700 bg-cover bg-no-repeat rounded-lg p-8 h-full min-h-144 w-64 hidden md:block"
      style={{
        backgroundImage: `url(${bgSidebarDesktop})`,
      }}
    >
      <div className="flex flex-col gap-8">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border border-white font-bold ${
                currentStep === step.number
                  ? "bg-blue-200 text-blue-950 border-blue-200"
                  : "bg-transparent text-white"
              }`}
            >
              {step.number}
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-purple-200 uppercase">
                Step {step.number}
              </p>
              <p className="font-bold text-white uppercase tracking-wider">
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
