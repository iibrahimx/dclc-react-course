type ButtonProps = {
  label: string;
};

export default function Button({ label }: ButtonProps) {
  const isWide = label === "RESET" || label === "=";

  return (
    <button
      className={`
        ${isWide ? "col-span-2" : ""}
        h-14 rounded-lg font-bold text-xl
        bg-[hsl(0,0%,90%)] text-[hsl(221,14%,31%)]
        shadow-[0_4px_0_hsl(28,16%,65%)]
        active:translate-y-1
      `}
    >
      {label}
    </button>
  );
}
