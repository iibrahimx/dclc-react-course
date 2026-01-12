import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import EcommerceProductPage from "./pages/ecommerce-product-page";
import CalculatorApp from "./pages/calculator-app";
import InteractiveComments from "./pages/interactive-comments-section";
import MultiStepForm from "./pages/multi-step-form";

function Home() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-gray-800 mb-4 underline">
        My React Projects
      </h1>
      <ul className="list-disc list-inside ml-4 space-y-2">
        <li className="text-blue-600 font-semibold">
          <Link to="/ecommerce-product-page">Ecommerce</Link>
        </li>

        <li className="text-blue-600 font-semibold">
          <Link to="/calculator-app">Calculator</Link>
        </li>

        <li className="text-blue-600 font-semibold">
          <Link to="/interactive-comments-section">
            Interactive Comments Section
          </Link>
        </li>

        <li className="text-blue-600 font-semibold">
          <Link to="/multi-step-form">Multiple Step Form</Link>
        </li>
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/ecommerce-product-page"
        element={<EcommerceProductPage />}
      />
      <Route path="/calculator-app" element={<CalculatorApp />} />
      <Route
        path="/interactive-comments-section"
        element={<InteractiveComments />}
      />
      <Route path="/multi-step-form" element={<MultiStepForm />} />
    </Routes>
  );
}
