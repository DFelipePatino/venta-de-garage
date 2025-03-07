import { useState, useMemo, useEffect } from 'react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import ProductFilters from '../components/product/ProductFilters';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../redux/productActions';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { getProducts } from '../redux/productActions';
import Tooltip from '@mui/material/Tooltip';

function Home() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { searchTerm, filterPrice, sortBy } = useStore();
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFiltersOpen2, setIsFiltersOpen2] = useState(false);
  // const productsEndPoint = useSelector(state => state.product.productsEndPoint);
  const [showNotification, setShowNotification] = useState(false);
  const [showNotification2, setShowNotification2] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    setTimeout(() => {
      setShowNotification(true);
    }, 1500);
    setTimeout(() => {
      setShowNotification2(true);
    }, 2000);
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const allProducts = [
      ...products.map(p => ({
        ...p,
        isLocalProduct: true
      })),
      ...([]).map(p => ({
        id: p.id,
        name: p.nombre,
        price: parseFloat(p.precio),
        description: p.descripcion,
        images: [p.imagen],
        inventory: p.stock,
        isLocalProduct: false
      }))
    ];

    return allProducts
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
      {/* {showNotification && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded">
          This is a notification! Click the button to dismiss.
          <button
            onClick={() => setShowNotification(false)}
            className="ml-4 underline"
          >
            Dismiss
          </button>
        </div>
      )} */}
      <div className="mb-6 flex justify-between items-center w-full">
        

        <div className="flex-none">
         

          <Transition
            show={isFiltersOpen2}
            enter="transition-all duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0 -translate-y-2"
            enterTo="transform scale-100 opacity-100 translate-y-0"
            leave="transition-all duration-200 ease-in"
            leaveFrom="transform scale-100 opacity-100 translate-y-0"
            leaveTo="transform scale-95 opacity-0 -translate-y-2"
          >
            <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <Tooltip title="Aqui puedes agregar productos" arrow placement="right">
                <button
                  onClick={() => {
                    // Navigate to an external link
                    window.open('https://inventario-simba-back.onrender.com/inventario/productos/', '_blank'); // Replace with the actual URL for Filter 1
                    setShowNotification2(false);
                    setTimeout(() => {
                      setIsFiltersOpen2(false);
                    }, 500); // Match this duration with the CSS transition duration
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Productos
                </button>
              </Tooltip>
              <Tooltip title="Aqui puedes manejar el inventario" arrow placement="right">
                <button
                  onClick={() => {
                    // Navigate to an external link
                    window.open('https://inventario-simba-back.onrender.com/inventario/inventarios/', '_blank'); // Replace with the actual URL for Filter 2
                    setShowNotification2(false);
                    setTimeout(() => {
                      setIsFiltersOpen2(false);
                    }, 500); // Match this duration with the CSS transition duration
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Inventario
                </button>
              </Tooltip>
              {/* <Tooltip title="Aqui puedes ver tus ventas" arrow placement="right">
                <button
                  onClick={() => {
                    // Navigate to an external link
                    window.open('https://inventario-simba-back.onrender.com/inventario/ventas/', '_blank'); // Replace with the actual URL for Filter 3
                    setShowNotification2(false);
                    setTimeout(() => {
                      setIsFiltersOpen2(false);
                    }, 500); // Match this duration with the CSS transition duration
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Ventas
                </button>
              </Tooltip> */}
            </div>
          </Transition>

        </div>
      </div>

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
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md ${selectedProduct?.id === product.id ? 'ring-2 ring-primary-500' : ''
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
                      ${product.price}
                    </p>
                    {/* <p className="text-sm text-gray-500">
                      {product.inventory} disponibles
                    </p> */}
                  </div>
                  {!product.isLocalProduct && (
                    <p className="text-sm text-gray-500 mt-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;