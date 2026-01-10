import { useState } from "react";
import { images } from "./data/images";

type Props = {
  initialIndex: number;
  onClose: () => void;
};

const Lightbox = ({ initialIndex, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return (
    <div className="fixed inset-0 bg-black/75 z-50 hidden md:flex flex-col items-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-orange-500 transition-colors"
      >
        ×
      </button>

      {/* Main image container - takes available space */}
      <div className="flex-1 flex items-center justify-center max-w-3xl w-full">
        <img
          src={images[currentIndex].full}
          className="rounded-xl max-h-[70vh] object-contain"
        />
      </div>

      <div className="mt-8 flex gap-4 justify-center max-w-3xl w-full pb-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`rounded-lg overflow-hidden border-2 shrink-0 ${
              i === currentIndex
                ? "border-orange-500"
                : "border-transparent hover:border-orange-300"
            }`}
          >
            <img src={img.thumb} className="w-20 h-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
