import { useState } from "react";
import Header from "./components/Header";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import CartDropdown from "./components/CartDropdown";
import { product } from "./components/data/product";

export type CartItem = {
  productId: number;
  quantity: number;
};

const EcommerceProductPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen font=[Kumbh Sans] bg-white">
      <Header onCartClick={() => setIsCartOpen((prev) => !prev)} />

      {isCartOpen && <CartDropdown cartItems={cartItems} product={product} />}

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
