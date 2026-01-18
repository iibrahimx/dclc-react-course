import { getInitialTheme, saveTheme } from "./utils/theme";
import { useCalculator } from "./hooks/useCalculator";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Screen from "./components/Screen";
import Keypad from "./components/Keypad";
import { type Theme, themes } from "./theme/theme";

export default function CalculatorApp() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  const { current, inputDigit, chooseOperator, evaluate, deleteDigit, reset } =
    useCalculator();

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
      if (e.key === ".") inputDigit(".");
      if (["+", "-", "*", "/"].includes(e.key)) {
        const op = e.key === "*" ? "x" : e.key;
        chooseOperator(op as never);
      }
      if (e.key === "Enter" || e.key === "=") evaluate();
      if (e.key === "Backspace") deleteDigit();
      if (e.key === "Escape") reset();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputDigit, chooseOperator, evaluate, deleteDigit, reset]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: themes[theme].mainBg }}
    >
      <div className="w-full max-w-sm px-4">
        <Header theme={theme} setTheme={setTheme} />

        <Screen theme={theme} value={current} />

        <Keypad
          theme={theme}
          onDigit={inputDigit}
          onOperator={chooseOperator}
          onEqual={evaluate}
          onDelete={deleteDigit}
          onReset={reset}
        />
      </div>
    </div>
  );
}
