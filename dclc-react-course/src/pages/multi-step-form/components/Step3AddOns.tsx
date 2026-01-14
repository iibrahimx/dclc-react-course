import React from "react";
import type { StepProps, AddonId } from "../types";
import { ADDONS } from "../data";

const Step3AddOns: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const toggleAddon = (addonId: AddonId) => {
    const newAddons = formData.selectedAddons.includes(addonId)
      ? formData.selectedAddons.filter((id) => id !== addonId)
      : [...formData.selectedAddons, addonId];

    updateFormData({ selectedAddons: newAddons });
  };

  const getAddonPrice = (addonId: AddonId) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    if (!addon) return 0;
    return formData.billingCycle === "monthly"
      ? addon.monthlyPrice
      : addon.yearlyPrice;
  };

  const getBillingSuffix = () => {
    return formData.billingCycle === "monthly" ? "/mo" : "/yr";
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
        Pick add-ons
      </h1>
      <p className="text-grey-500 mt-2 mb-8">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="space-y-4">
        {ADDONS.map((addon) => {
          const isSelected = formData.selectedAddons.includes(addon.id);

          return (
            <button
              key={addon.id}
              type="button"
              onClick={() => toggleAddon(addon.id)}
              className={`w-full flex items-center justify-between p-4 border rounded-lg text-left hover:border-purple-600 transition-colors ${
                isSelected
                  ? "border-purple-600 bg-blue-50"
                  : "border-purple-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-5 h-5 border rounded flex items-center justify-center ${
                    isSelected
                      ? "bg-purple-600 border-purple-600"
                      : "border-purple-200"
                  }`}
                >
                  {isSelected && (
                    <img
                      src="/images/icon-checkmark.svg"
                      alt="Selected"
                      className="w-3 h-3"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-blue-950">{addon.name}</h3>
                  <p className="text-sm text-grey-500">{addon.description}</p>
                </div>
              </div>
              <div className="text-purple-600">
                +${getAddonPrice(addon.id)}
                {getBillingSuffix()}
              </div>
            </button>
          );
        })}
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

export default Step3AddOns;
