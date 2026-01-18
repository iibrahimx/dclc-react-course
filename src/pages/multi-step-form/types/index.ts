export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export type BillingCycle = "monthly" | "yearly";

export type PlanType = "arcade" | "advanced" | "pro";

export interface Plan {
  id: PlanType;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: string;
  description?: string;
}

export type AddonId =
  | "online-service"
  | "larger-storage"
  | "customizable-profile";

export interface Addon {
  id: AddonId;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export interface FormData {
  personalInfo: PersonalInfo;
  selectedPlan: PlanType;
  billingCycle: BillingCycle;
  selectedAddons: AddonId[];
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}
