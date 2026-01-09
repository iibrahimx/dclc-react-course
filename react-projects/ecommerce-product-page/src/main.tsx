import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EcommerceProductPage from "./ecommerce-product-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EcommerceProductPage />
  </StrictMode>
);
