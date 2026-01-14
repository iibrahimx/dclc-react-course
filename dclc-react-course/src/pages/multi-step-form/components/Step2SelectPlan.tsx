import React from "react";
import type { StepProps, BillingCycle, PlanType } from "../types";
import { PLANS } from "../data";

const Step2SelectPlan: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handlePlanSelect = (planId: PlanType) => {
    updateFormData({ selectedPlan: planId });
  };

  const toggleBillingCycle = () => {
    const newCycle: BillingCycle =
      formData.billingCycle === "monthly" ? "yearly" : "monthly";
    updateFormData({ billingCycle: newCycle });
  };

  const getPlanPrice = (planId: PlanType) => {
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) return 0;
    return formData.billingCycle === "monthly"
      ? plan.monthlyPrice
      : plan.yearlyPrice;
  };

  const getBillingSuffix = () => {
    return formData.billingCycle === "monthly" ? "/mo" : "/yr";
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
        Select your plan
      </h1>
      <p className="text-grey-500 mt-2 mb-8">
        You have the option of monthly or yearly billing.
      </p>

      <div className="space-y-4 mb-8">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => handlePlanSelect(plan.id)}
            className={`w-full flex items-center gap-4 p-4 border rounded-lg text-left hover:border-purple-600 transition-colors ${
              formData.selectedPlan === plan.id
                ? "border-purple-600 bg-blue-50"
                : "border-purple-200"
            }`}
          >
            <img src={plan.icon} alt={plan.name} className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-blue-950">{plan.name}</h3>
              <p className="text-grey-500">
                ${getPlanPrice(plan.id)}
                {getBillingSuffix()}
              </p>
              {formData.billingCycle === "yearly" && (
                <p className="text-sm text-blue-950 mt-1">2 months free</p>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 p-4 bg-blue-50 rounded-lg">
        <span
          className={`font-medium ${
            formData.billingCycle === "monthly"
              ? "text-blue-950"
              : "text-grey-500"
          }`}
        >
          Monthly
        </span>
        <button
          type="button"
          onClick={toggleBillingCycle}
          className="relative w-12 h-6 bg-blue-950 rounded-full"
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              formData.billingCycle === "monthly" ? "left-1" : "left-7"
            }`}
          />
        </button>
        <span
          className={`font-medium ${
            formData.billingCycle === "yearly"
              ? "text-blue-950"
              : "text-grey-500"
          }`}
        >
          Yearly
        </span>
      </div>

      <div className="flex justify-between mt-12">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 text-grey-500 hover:text-blue-950 transition-colors"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2SelectPlan;
