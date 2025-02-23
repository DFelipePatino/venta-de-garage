import { useStore } from '../context/StoreContext';
import CheckoutForm from '../components/checkout/CheckoutForm';

function Checkout() {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Tu Carrito esta Vacio</h1>
        <p className="text-gray-600 mb-8">Agrega algunos productos a tu carrito para continuar comprando.</p>
        <a
          href="/"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continuar Comprando
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen de la Orden</h2>
            <div className="divide-y">
              {cart.items.map((item) => (
                <div key={item.id} className="py-4 flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 p-1"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Informacion de Envio</h2>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}

export default Checkout;