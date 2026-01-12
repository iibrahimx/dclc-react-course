import Button from "./Button";

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

export default function Keypad() {
  return (
    <div className="bg-[hsl(223,31%,20%)] p-6 rounded-lg grid grid-cols-4 gap-4">
      {keys.map((key) => (
        <Button key={key} label={key} />
      ))}
    </div>
  );
}
