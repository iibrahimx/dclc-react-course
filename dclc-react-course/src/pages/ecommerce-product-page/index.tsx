import { useState } from "react";
import Header from "./components/Header";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import CartDropdown from "./components/CartDropdown";
import { product } from "./data/product";
import MobileMenu from "./components/MobileMenu";

export type CartItem = {
  productId: number;
  quantity: number;
};

const EcommerceProductPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font=[Kumbh Sans] bg-white">
      <Header
        onCartClick={() => setIsCartOpen((prev) => !prev)}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {isCartOpen && (
        <CartDropdown
          cartItems={cartItems}
          product={product}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}

      <main className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery />
        <ProductInfo
          onAddToCart={(quantity) => {
            if (quantity === 0) return;
            setCartItems([{ productId: product.id, quantity }]);
          }}
        />
      </main>
    </div>
  );
};

export default EcommerceProductPage;
