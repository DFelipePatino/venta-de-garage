import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProductImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Reset selected image when images prop changes
  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden"
        >
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative rounded-lg overflow-hidden aspect-w-1 aspect-h-1 ${
              selectedImage === image
                ? 'ring-2 ring-primary-500'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;