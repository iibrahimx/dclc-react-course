import avatarImage from "../assets/images/image-avatar.png";
import companyLogo from "../assets/images/logo.svg";
import menuIcon from "../assets/images/icon-menu.svg";
import cartIcon from "../assets/images/icon-cart.svg";

type HeadProps = {
  onCartClick: () => void;
  onMenuClick: () => void;
};

const Header = ({ onCartClick, onMenuClick }: HeadProps) => {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <img
            src={menuIcon}
            alt="Menu icon"
            className="md:hidden cursor-pointer"
            onClick={onMenuClick}
          />
          <img src={companyLogo} alt="Company logo" />
          {/* <h1 className="text-2xl font-bold">Sneakers</h1> */}
          <nav className="hidden md:flex gap-6 text-gray-500">
            <a href="">Collections</a>
            <a href="">Men</a>
            <a href="">Women</a>
            <a href="">About</a>
            <a href="">Contact</a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCartClick();
            }}
            aria-label="Cart"
            className="cart-icon-button cursor-pointer transition-transform duration-300 hover:scale-120 active:scale-110"
          >
            <img src={cartIcon} alt="Cart" className="pointer-events-none" />
            {/* 🛒 */}
          </button>
          <img
            src={avatarImage}
            alt="User avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
