import { useState, useMemo } from 'react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import ProductFilters from '../components/product/ProductFilters';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../redux/productActions';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

function Home() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { searchTerm, filterPrice, sortBy } = useStore();
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);


  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= filterPrice.min &&
        product.price <= filterPrice.max
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [searchTerm, filterPrice, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="max-w-7xl mx-auto px-4 pt-0 pb-8"
    >
      <div className="mb-6">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <span>Filtros</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isFiltersOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <Transition
          show={isFiltersOpen}
          enter="transition-all duration-300 ease-out"
          enterFrom="transform scale-95 opacity-0 -translate-y-2"
          enterTo="transform scale-100 opacity-100 translate-y-0"
          leave="transition-all duration-200 ease-in"
          leaveFrom="transform scale-100 opacity-100 translate-y-0"
          leaveTo="transform scale-95 opacity-0 -translate-y-2"
        >
          <div className="mt-4">
            <ProductFilters />
          </div>
        </Transition>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Productos Disponibles</h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay productos disponibles que coincidan con tu busqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  dispatch(setSelectedProduct(product));
                  navigate(`/product/${product.id}`);
                }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md ${
                  selectedProduct?.id === product.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-left">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-primary-600 font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.inventory} disponibles
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* 
  {selectedProduct && ( 

           <div className="bg-white rounded-xl shadow-lg p-6 mt-0">
         <ProductDisplay product={selectedProduct} />
       </div>
      )} */}
    </motion.div>
  );
}

export default Home;