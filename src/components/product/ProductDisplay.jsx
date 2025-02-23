import { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductImages from './ProductImages';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';

function ProductDisplay() {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const productsEndPoint = useSelector(state => state.product.productsEndPoint);
  
  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Modified product finding logic to include API products
  const product = selectedProduct?.id?.toString() === id 
    ? selectedProduct 
    : products.find(p => p.id.toString() === id) || 
      productsEndPoint?.find(p => p.id.toString() === id);

  // Transform API product to match local product structure if needed
  const normalizedProduct = product && !product.isLocalProduct ? {
    id: product.id,
    name: product.nombre || product.name,
    price: parseFloat(product.precio || product.price),
    description: product.descripcion || product.description,
    images: product.imagen ? [product.imagen] : product.images,
    inventory: product.stock || product.inventory,
    features: product.features || [],
    specifications: product.specifications || {},
    isLocalProduct: false
  } : product;

  // Add useEffect to handle product loading
  useEffect(() => {
    if (normalizedProduct) {
      setQuantity(1);
    }
  }, [normalizedProduct]);

  if (!normalizedProduct) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900">Producto no encontrado</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(normalizedProduct, quantity);
    setQuantity(1);
  };

  return (
    <motion.div
      key={normalizedProduct.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid md:grid-cols-2 gap-8"
    >
      <ProductImages images={normalizedProduct.images} />
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-b pb-6"
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{normalizedProduct.name}</h1>
          <p className="text-2xl text-primary-600 font-bold">
            ${normalizedProduct.price.toFixed(2)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="prose max-w-none"
        >
          <p className="text-gray-600">{normalizedProduct.description}</p>
        </motion.div>

        {normalizedProduct.isLocalProduct && normalizedProduct.features && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-gray-900">Características</h3>
            <ul className="list-disc list-inside space-y-2">
              {normalizedProduct.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {normalizedProduct.isLocalProduct && normalizedProduct.specifications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-gray-900">Especificaciones</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(normalizedProduct.specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-gray-500 capitalize">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="border-t pt-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="quantity" className="font-medium text-gray-700">
              Cantidad
            </label>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-1 border-none focus:ring-0"
              />
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {normalizedProduct.inventory} unidades disponibles
          </p>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Agregar al carrito</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDisplay;