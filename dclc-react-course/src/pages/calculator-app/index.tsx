import Header from "./components/Header";
import Screen from "./components/Screen";
import Keypad from "./components/Keypad";

export default function CalculatorApp() {
  return (
    <div className="min-h-screen bg-[hsl(222,26%,31%)] flex items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <Header />
        <Screen />
        <Keypad />
      </div>
    </div>
  );
}
