import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';

function Success() {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Trigger confetti animation on load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Mock order details - replace with actual API call
    setOrderDetails({
      orderId: 'ORD-' + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      items: [
        {
          name: 'Premium Wireless Headphones',
          quantity: 1,
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
        }
      ],
      shipping: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        country: 'US',
        postalCode: '10001'
      },
      total: 199.99
    });
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Orden Confirmada!
        </h1>
        <p className="text-gray-600">
          Gracias por tu compra. Tu orden ha sido recibida.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Numero de Orden</p>
              <p className="font-medium">{orderDetails.orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-medium">{orderDetails.date}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Detalles de la Orden</h2>
          {orderDetails.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Detalles de Envio</h2>
          <div className="text-gray-600">
            <p>{orderDetails.shipping.name}</p>
            <p>{orderDetails.shipping.address}</p>
            <p>
              {orderDetails.shipping.city}, {orderDetails.shipping.postalCode}
            </p>
            <p>{orderDetails.shipping.country}</p>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          Continuar Comprando
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Imprimir Recibo
        </button>
      </div>
    </div>
  );
}

export default Success;