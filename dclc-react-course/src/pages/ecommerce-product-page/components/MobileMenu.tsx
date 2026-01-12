type Props = {
  onClose: () => void;
};

const MobileMenu = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />

      {/* Menu */}
      <div className="relative bg-white w-64 h-full p-6">
        <button onClick={onClose} className="text-2xl font-bold mb-8">
          ×
        </button>

        <nav className="flex flex-col gap-4 font-bold text-lg">
          <a href="#">Collections</a>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
