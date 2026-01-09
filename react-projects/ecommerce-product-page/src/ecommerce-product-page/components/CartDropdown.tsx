import { useEffect, useRef } from "react";
import type { CartItem } from "../index";

type Props = {
  cartItems: CartItem[];
  product: {
    name: string;
    price: number;
    thumbnail: string;
  };
  onClose: () => void;
};

const CartDropdown = ({ cartItems, product, onClose }: Props) => {
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const clickedInsideModal = cartRef.current?.contains(target);

      const clickedToggleButton = target.closest(".cart-icon-button");

      if (!clickedInsideModal && !clickedToggleButton) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={cartRef}
      className="absolute right-4 top-24 w-80 bg-white rounded-lg shadow-xl"
    >
      <h3 className="p-4 font-bold border-b-2 border-gray-200">Cart</h3>

      {cartItems.length === 0 ? (
        <p className="p-6 text-center text-gray-500 font-semibold">
          Your cart is empty.
        </p>
      ) : (
        <div className="p-4">
          <div className="flex items-center gap-4">
            <img src={product.thumbnail} className="w-12 rounded" />
            <div className="flex-1">
              <p className="text-gray-500">{product.name}</p>
              <p>
                ${product.price} x {cartItems[0].quantity}
                <span className="font-bold">
                  ${product.price * cartItems[0].quantity}
                </span>
              </p>
            </div>
          </div>

          <button className="mt-4 w-full bg-orange-500 text-black font-bold py-3 rounded-lg">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
