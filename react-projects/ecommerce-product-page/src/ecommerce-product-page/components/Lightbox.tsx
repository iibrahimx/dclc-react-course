import { useState } from "react";
import { images } from "./data/images";

type Props = {
  initialIndex: number;
  onClose: () => void;
};

const Lightbox = ({ initialIndex, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  return (
    <div className="fixed inset-0 bg-black/75 z-50 hidden md:flex items-center justify-center">
      <div className="relative max-w-xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl"
        >
          x
        </button>

        <img src={images[currentIndex].full} className="rounded-xl mb-6" />

        <div className="flex gap-4 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-lg overflow-hidden border-2 ${
                i === currentIndex ? "border-orange-500" : "border-transparent"
              }`}
            >
              <img src={img.thumb} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
