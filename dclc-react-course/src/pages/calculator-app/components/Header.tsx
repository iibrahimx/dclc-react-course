import type { Theme } from "../theme/theme";

type HeaderProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export default function Header({ theme, setTheme }: HeaderProps) {
  const themes: Theme[] = ["theme1", "theme2", "theme3"];

  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold" style={{ color: "white" }}>
        calc
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-xs tracking-widest text-white">THEME</span>

        <div>
          <div className="flex justify-between text-xs text-white mb-1">
            {themes.map((t, i) => (
              <span key={t}>{i + 1}</span>
            ))}
          </div>

          <div role="group" aria-label="Theme selector">
            <div className="relative w-16 h-6 rounded-full bg-black/20 flex items-center">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  aria-checked={theme === t}
                  role="radio"
                  className={`z-10 w-4 h-4 mx-1 rounded-full transition-colors cursor-pointer ${
                    theme === t
                      ? "bg-red-500"
                      : "bg-transparent hover:bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
