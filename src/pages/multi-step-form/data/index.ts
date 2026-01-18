import type { Plan, Addon } from "../types";
import arcadeIcon from "../assets/images/icon-arcade.svg";
import advancedIcon from "../assets/images/icon-advanced.svg";
import proIcon from "../assets/images/icon-pro.svg";

export const PLANS: Plan[] = [
  {
    id: "arcade",
    name: "Arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: arcadeIcon,
  },
  {
    id: "advanced",
    name: "Advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: advancedIcon,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: proIcon,
  },
];

export const ADDONS: Addon[] = [
  {
    id: "online-service",
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: "larger-storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: "customizable-profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];
