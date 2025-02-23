import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const stripeService = {
  createCheckoutSession: async (cartItems, customerData) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          customerData,
        }),
      });

      const session = await response.json();
      
      if (!session || !session.id) {
        throw new Error('Failed to create checkout session');
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }
  },

  createPaymentIntent: async (amount, currency = 'usd') => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Payment intent error:', error);
      throw error;
    }
  }
};