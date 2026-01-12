import { type Theme, themes } from "../theme/theme";
import Button from "./Button";

type KeypadProps = {
  theme: Theme;
  onDigit: (digit: string) => void;
  onOperator: (op: "+" | "-" | "x" | "/") => void;
  onEqual: () => void;
  onDelete: () => void;
  onReset: () => void;
};

const keys = [
  "7",
  "8",
  "9",
  "DEL",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "x",
  "RESET",
  "=",
];

export default function Keypad({
  theme,
  onDelete,
  onReset,
  onEqual,
  onOperator,
  onDigit,
}: KeypadProps) {
  const wideKeys = ["RESET", "="];

  function handleClick(key: string) {
    if (key === "DEL") return onDelete();
    if (key === "RESET") return onReset();
    if (key === "=") return onEqual();

    if (["+", "-", "x", "/"].includes(key)) {
      return onOperator(key as "+" | "-" | "x" | "/");
    }

    return onDigit(key);
  }

  return (
    <div
      className="p-6 rounded-lg grid grid-cols-4 gap-4"
      style={{ backgroundColor: themes[theme].keypadBg }}
    >
      {keys.map((key) => (
        <div key={key} className={wideKeys.includes(key) ? "col-span-2" : ""}>
          <Button label={key} theme={theme} onClick={() => handleClick(key)} />
        </div>
      ))}
    </div>
  );
}
