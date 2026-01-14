import React from "react";
import Sidebar from "./Sidebar";
import bgSidebarMobile from "../assets/images/bg-sidebar-mobile.svg?url";

interface FormWrapperProps {
  children: React.ReactNode;
  currentStep: number;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, currentStep }) => {
  return (
    <div className="min-h-screen bg-blue-100 font-ubuntu flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-4 md:p-6 relative">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar - hidden on mobile */}
          <Sidebar currentStep={currentStep} />

          {/* Mobile step indicator with mobile background */}
          <div
            className="md:hidden bg-linear-to-br from-purple-400 via-purple-300 to-indigo-700 absolute top-0 left-0 right-0 h-40 bg-cover bg-no-repeat z-10"
            style={{
              backgroundImage: `url(${bgSidebarMobile})`,
            }}
          >
            <div className="flex justify-center gap-4 pt-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                    currentStep === step
                      ? "bg-blue-200 text-blue-950 border-blue-200"
                      : "border-white text-white"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Main form content */}
          <div className="md:flex-1 md:pt-10 md:px-16 mt-42 md:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
