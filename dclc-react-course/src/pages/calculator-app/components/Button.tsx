import { type Theme, themes } from "../theme/theme";

type ButtonVariant = "number" | "operator" | "action" | "equals";

type ButtonProps = {
  label: string;
  theme: Theme;
  onClick?: () => void;
};

function getVariant(label: string): ButtonVariant {
  if (label === "DEL" || label === "RESET") return "action";
  if (label === "=") return "equals";
  if (["+", "-", "x", "/"].includes(label)) return "operator";
  return "number";
}

export default function Button({ label, theme, onClick }: ButtonProps) {
  const variant = getVariant(label);

  const styles = {
    number: {
      bg: "hsl(0, 0%, 90%)",
      shadow: "hsl(28, 16%, 65%)",
      text: themes[theme].text,
    },
    operator: {
      bg: "hsl(0, 0%, 90%)",
      shadow: "hsl(28, 16%, 65%)",
      text: themes[theme].text,
    },
    action: {
      bg: "hsl(225, 21%, 49%)",
      shadow: "hsl(224, 28%, 35%)",
      text: "white",
    },
    equals: {
      bg: "hsl(6, 63%, 50%)",
      shadow: "hsl(6, 70%, 34%)",
      text: "white",
    },
  };

  const style = styles[variant];

  return (
    <button
      onClick={onClick}
      className="h-14 rounded-lg text-xl font-bold active:translate-y-1 w-full"
      style={{
        backgroundColor: style.bg,
        boxShadow: `0 4px ${style.shadow}`,
        color: style.text,
      }}
    >
      {label}
    </button>
  );
}
