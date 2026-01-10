import { useState } from "react";
import minusIcon from "./assets/images/icon-minus.svg";
import plusIcon from "./assets/images/icon-plus.svg";
import cartIcon from "./assets/images/icon-cart.svg";

type ProductInfoProps = {
  onAddToCart: (quantity: number) => void;
};

const ProductInfo = ({ onAddToCart }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <p className="uppercase tracking-widest text-gray-500 font-semibold text-sm">
        Sneaker Company
      </p>

      <h2 className="text-4xl font-bold mt-4 mb-6">
        Fall Limited Edition <br /> Sneakers
      </h2>

      <p className="text-gray-500 mb-6">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </p>

      <div>
        <span className="text-3xl font-bold">$125.00</span>
        <span className="bg-orange-100 text-orange-500 font-bold px-2 py-1 mx-4 rounded-md">
          50%
        </span>
      </div>

      <p className="line-through text-gray-400 mb-8">$250.00</p>

      <div className="grid grid-cols-[1fr_2.5fr] gap-4">
        <div className="flex items-center justify-between bg-gray-100 rounded-lg">
          <button
            onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
            className="cursor-pointer py-4"
          >
            <img src={minusIcon} alt="Minus" className="px-4" />
          </button>

          <span className="font-bold">{quantity}</span>

          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="cursor-pointer py-4"
          >
            <img src={plusIcon} alt="Plus" className="px-4" />
          </button>
        </div>

        <button
          onClick={() => {
            onAddToCart(quantity);
            setQuantity(0);
          }}
          className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-lg py-4 hover:shadow-lg hover:shadow-orange-200 cursor-pointer"
        >
          <img src={cartIcon} alt="Cart icon" className="px-3 brightness-0" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
