import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  updateProduct: async (productData) => {
    const response = await api.put('/products', productData);
    return response.data;
  },
  
  updateInventory: async (inventory) => {
    const response = await api.put('/products/inventory', { inventory });
    return response.data;
  }
};

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
  
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  }
};

export const analyticsService = {
  getStats: async (dateRange) => {
    const response = await api.get('/analytics/stats', { params: dateRange });
    return response.data;
  },
  
  getInfluencerStats: async () => {
    const response = await api.get('/analytics/influencers');
    return response.data;
  }
};

export const couponService = {
  createCoupon: async (couponData) => {
    const response = await api.post('/coupons', couponData);
    return response.data;
  },
  
  validateCoupon: async (code) => {
    const response = await api.post('/coupons/validate', { code });
    return response.data;
  }
};