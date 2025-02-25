import { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { useClickOutside } from '../../hooks/useClickOutside';

function MiniCart() {
  const { cart, removeFromCart, cartTotal } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);
  useClickOutside(cartRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={cartRef}>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center group"
      >
        <span className="mr-2 text-gray-600 group-hover:text-primary-600">Carrito</span>
        <span className="bg-primary-500 text-white rounded-full px-2.5 py-1 text-sm font-medium min-w-[1.5rem] text-center pulse-animation">
          {cart?.items?.length || 0}
        </span>
      </button>

      {/* Cart Dropdown */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Carrito de Compras</h3>
            
            <AnimatePresence>
              {cart.items.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 text-center py-4"
                >
                  Tu carrito esta vacio
                </motion.p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-auto">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {cart.items.length > 0 && (
              <motion.div
                layout
                className="border-t mt-4 pt-4"
              >
                <div className="flex justify-between font-medium mb-4">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Finalizar Compra
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default MiniCart;