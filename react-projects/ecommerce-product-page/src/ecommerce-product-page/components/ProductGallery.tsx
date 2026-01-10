import { useState } from "react";
import { images } from "./data/images";
import Lightbox from "./Lightbox";

const ProductGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div>
        <img
          src={images[currentIndex].full}
          // className="rounded-2xl w-full mb-4"
          className="rounded-2xl cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        />

        <div className="grid grid-cols-4 gap-4 mt-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-lg border-2 cursor-pointer ${
                i === currentIndex ? "border-orange-500" : "border-transparent"
              }`}
            >
              <img src={img.thumb} className="rounded-md" />
            </button>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          initialIndex={currentIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default ProductGallery;
