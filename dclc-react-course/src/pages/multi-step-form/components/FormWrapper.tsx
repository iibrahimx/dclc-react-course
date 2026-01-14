import React from "react";
import Sidebar from "./Sidebar";

interface FormWrapperProps {
  children: React.ReactNode;
  currentStep: number;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, currentStep }) => {
  return (
    <div className="min-h-screen bg-blue-100 font-ubuntu flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for desktop */}
          <div className="hidden md:block">
            <Sidebar currentStep={currentStep} />
          </div>

          {/* Mobile step indicator */}
          <div className="md:hidden absolute top-0 left-0 right-0 h-40 bg-sidebar-mobile bg-cover bg-no-repeat">
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
          <div className="md:flex-1 md:pt-10 md:px-16 mt-32 md:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
