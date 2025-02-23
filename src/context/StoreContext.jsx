import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Add storeConfig state
  const [storeConfig, setStoreConfig] = useState({
    storeName: 'DanielP Store', // Default store name
    domain: window.location.hostname,
    product: {
      name: '',
      price: 0,
      description: '',
      images: [],
      inventory: 0
    },
    influencers: [],
    coupons: []
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], couponCode: null };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }

      return {
        ...prevCart,
        items: [...prevCart.items, { ...product, quantity }]
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.id !== productId)
    }));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    }));
  };

  const clearCart = () => {
    setCart({ items: [], couponCode: null });
  };

  const cartTotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        storeConfig,
        setStoreConfig,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        searchTerm,
        setSearchTerm,
        filterPrice,
        setFilterPrice,
        sortBy,
        setSortBy
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}