import React, { useState } from "react";
import type { FormData } from "./types";
import FormWrapper from "./components/FormWrapper";
import Step1PersonalInfo from "./components/Step1PersonalInfo";
import Step2SelectPlan from "./components/Step2SelectPlan";
import Step3AddOns from "./components/Step3AddOns";
import Step4Summary from "./components/Step4Summary";
import Step5ThankYou from "./components/Step5ThankYou";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
    },
    selectedPlan: "arcade",
    billingCycle: "monthly",
    selectedAddons: ["online-service"],
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      nextStep,
      prevStep,
    };

    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo {...stepProps} />;
      case 2:
        return <Step2SelectPlan {...stepProps} />;
      case 3:
        return <Step3AddOns {...stepProps} />;
      case 4:
        return <Step4Summary {...stepProps} />;
      case 5:
        return <Step5ThankYou />;
      default:
        return <Step1PersonalInfo {...stepProps} />;
    }
  };

  return <FormWrapper currentStep={currentStep}>{renderStep()}</FormWrapper>;
};

export default MultiStepForm;
