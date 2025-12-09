import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

export const fetchSalesData = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.customerRegion?.length) params.append('customerRegion', filters.customerRegion.join(','));
    if (filters.gender?.length) params.append('gender', filters.gender.join(','));
    if (filters.minAge) params.append('minAge', filters.minAge);
    if (filters.maxAge) params.append('maxAge', filters.maxAge);
    if (filters.productCategory?.length) params.append('productCategory', filters.productCategory.join(','));
    if (filters.tags?.length) params.append('tags', filters.tags.join(','));
    if (filters.paymentMethod?.length) params.append('paymentMethod', filters.paymentMethod.join(','));
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/sales?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw error;
  }
};

export const fetchSalesStats = async () => {
  try {
    const response = await api.get('/sales/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching sales stats:', error);
    throw error;
  }
};

export default api;