import { type Theme, themes } from "../theme/theme";
import Button from "./Button";

type KeypadProps = {
  theme: Theme;
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

export default function Keypad({ theme }: KeypadProps) {
  return (
    <div
      className="p-6 rounded-lg grid grid-cols-4 gap-4"
      style={{ backgroundColor: themes[theme].keypadBg }}
    >
      {keys.map((key) => (
        <Button key={key} label={key} />
      ))}
    </div>
  );
}
