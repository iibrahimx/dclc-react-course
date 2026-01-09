import productImage from "./assets/images/image-product-1.jpg";
import productThumbnail from "./assets/images/image-product-1-thumbnail.jpg";

const ProductGallery = () => {
  return (
    <div>
      <img
        src={productImage}
        alt="Sneaker"
        className="rounded-2xl w-full mb-4"
      />

      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-lg border-2 border-transparent hover:border-orange-500 cursor-pointer"
          >
            <img
              src={productThumbnail}
              alt="Thumbnail"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
