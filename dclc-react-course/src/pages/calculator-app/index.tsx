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
