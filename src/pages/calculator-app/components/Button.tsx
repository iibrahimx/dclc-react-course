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

  const getAriaLabel = (lbl: string) => {
    if (lbl === "DEL") return "Delete last digit";
    if (lbl === "RESET") return "Reset calculator";
    if (lbl === "=") return "Calculate result";
    if (lbl === "x") return "multiply";
    return lbl;
  };

  const styles = {
    number: {
      bg: themes[theme].keyNumBg,
      shadow: themes[theme].keyNumShadow,
      text:
        theme === "theme3"
          ? themes[theme].textMain
          : themes[theme].textSecondary,
    },
    action: {
      bg: themes[theme].keyResetBg,
      shadow: themes[theme].keyResetShadow,
      text: "white",
    },
    equals: {
      bg: themes[theme].keyEqualBg,
      shadow: themes[theme].keyEqualShadow,
      text: theme === "theme3" ? themes[theme].textAccent : "white",
    },

    operator: {
      bg: themes[theme].keyNumBg,
      shadow: themes[theme].keyNumShadow,
      text: themes[theme].textMain,
    },
  };

  return (
    <button
      onClick={onClick}
      aria-label={getAriaLabel(label)}
      className="h-14 rounded-lg text-xl font-bold active:translate-y-1 w-full cursor-pointer"
      style={{
        backgroundColor: styles[variant].bg,
        boxShadow: `0 4px ${styles[variant].shadow}`,
        color: styles[variant].text,
      }}
    >
      {label}
    </button>
  );
}
