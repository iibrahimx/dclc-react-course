import React from "react";
import type { StepProps } from "../types";
import { PLANS, ADDONS } from "../data";

const Step4Summary: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const selectedPlan = PLANS.find((p) => p.id === formData.selectedPlan);
  const selectedAddons = ADDONS.filter((a) =>
    formData.selectedAddons.includes(a.id)
  );

  const getPlanPrice = () => {
    if (!selectedPlan) return 0;
    return formData.billingCycle === "monthly"
      ? selectedPlan.monthlyPrice
      : selectedPlan.yearlyPrice;
  };

  const getAddonPrice = (addonId: string) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    if (!addon) return 0;
    return formData.billingCycle === "monthly"
      ? addon.monthlyPrice
      : addon.yearlyPrice;
  };

  const getTotalPrice = () => {
    const planPrice = getPlanPrice();
    const addonsPrice = formData.selectedAddons.reduce(
      (total, addonId) => total + getAddonPrice(addonId),
      0
    );
    return planPrice + addonsPrice;
  };

  const handlePlanChange = () => {
    updateFormData({});
    // Go back to step 2
    prevStep();
    prevStep();
  };

  const getBillingSuffix = () => {
    return formData.billingCycle === "monthly" ? "/mo" : "/yr";
  };

  const getBillingText = () => {
    return formData.billingCycle === "monthly" ? "Monthly" : "Yearly";
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
        Finishing up
      </h1>
      <p className="text-grey-500 mt-2 mb-8">
        Double-check everything looks OK before confirming.
      </p>

      <div className="bg-blue-50 rounded-lg p-6">
        {/* Plan Summary */}
        <div className="flex items-center justify-between border-b border-purple-200 pb-6">
          <div>
            <div className="font-bold text-blue-950">
              {selectedPlan?.name} ({getBillingText()})
            </div>
            <button
              type="button"
              onClick={handlePlanChange}
              className="text-grey-500 underline hover:text-purple-600 transition-colors"
            >
              Change
            </button>
          </div>
          <div className="font-bold text-blue-950">
            ${getPlanPrice()}
            {getBillingSuffix()}
          </div>
        </div>

        {/* Addons Summary */}
        <div className="space-y-4 pt-6">
          {selectedAddons.map((addon) => (
            <div key={addon.id} className="flex items-center justify-between">
              <span className="text-grey-500">{addon.name}</span>
              <span className="text-blue-950">
                +${getAddonPrice(addon.id)}
                {getBillingSuffix()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between p-6">
        <span className="text-grey-500">
          Total (per {formData.billingCycle === "monthly" ? "month" : "year"})
        </span>
        <span className="text-xl font-bold text-purple-600">
          ${getTotalPrice()}
          {getBillingSuffix()}
        </span>
      </div>

      <div className="flex justify-between mt-8">
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
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Step4Summary;
