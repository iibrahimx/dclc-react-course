import { type Theme, themes } from "../theme/theme";

type ScreenProps = {
  theme: Theme;
};

export default function Screen({ theme }: ScreenProps) {
  return (
    <div
      className="text-right text-4xl font-bold rounded-lg p-6 mb-6"
      style={{
        backgroundColor: themes[theme].screenBg,
        color: themes[theme].text,
      }}
    >
      399,981
    </div>
  );
}
