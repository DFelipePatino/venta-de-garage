import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStore } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

// Only initialize Stripe if the key is available
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

function PaymentProcessor({ formData }) {
  const { cart } = useStore();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      if (!stripePromise) {
        // throw new Error('Stripe has not been properly initialized');
        navigate('/success');
      }

      const stripe = await stripePromise;
      
      // Your payment processing logic here
      console.log('Processing payment...', { cart, formData });
      
      // Mock successful payment for now
      alert('Payment processing would happen here!');
      
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      <button
        onClick={handlePayment}
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Pagar
      </button>
    </div>
  );
}

export default PaymentProcessor;