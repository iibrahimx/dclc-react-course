import { type Theme, themes } from "../theme/theme";

type ScreenProps = {
  theme: Theme;
  value: string;
};

export default function Screen({ theme, value }: ScreenProps) {
  return (
    <div
      className="text-right text-4xl font-bold rounded-lg p-6 mb-6"
      style={{ backgroundColor: themes[theme].screenBg }}
    >
      {value}
    </div>
  );
}
