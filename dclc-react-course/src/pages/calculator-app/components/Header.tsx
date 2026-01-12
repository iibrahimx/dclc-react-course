export default function Header() {
  return (
    <header className="flex items-center justify-between text-white mb-6">
      <h1 className="text-2xl font-bold">calc</h1>

      <div className="flex items-center gap-4">
        <span className="text-xs tracking-widest">THEME</span>

        <div className="flex flex-col items-end">
          <div className="flex gap-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>

          <div className="w-16 h-6 rounded-full bg-[hsl(223,31%,20%)] mt-1 relative">
            <div className="w-4 h-4 bg-red-500 rounded-full absolute left-1 top-1" />
          </div>
        </div>
      </div>
    </header>
  );
}
