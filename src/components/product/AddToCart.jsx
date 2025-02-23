import { useStore } from '../../context/StoreContext';

function AddToCart({ product }) {
  const { cart, setCart } = useStore();

  const addToCart = () => {
    setCart({
      ...cart,
      items: [...cart.items, product]
    });
  };

  return (
    <button
      onClick={addToCart}
      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Add to Cart
    </button>
  );
}

export default AddToCart;