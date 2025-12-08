import { loadSalesData } from '../utils/dataLoader.js';
import { applyFilters, applySorting, applyPagination } from '../utils/dataProcessor.js';

let salesData = [];
let isLoading = true;

const initializeData = async () => {
  try {
    console.log('Loading CSV data...');
    salesData = await loadSalesData();
    isLoading = false;
    console.log(` Loaded ${salesData.length} sales records`);
  } catch (error) {
    console.error(' Failed to load sales data:', error);
    salesData = [];
    isLoading = false;
  }
};

initializeData();

export const getFilteredSalesData = async (filters, sortBy, page, limit) => {
  try {
    // Wait if still loading
    if (isLoading) {
      return {
        data: [],
        pagination: { currentPage: 1, pageSize: 10, totalRecords: 0, totalPages: 0 },
        message: 'Loading data, please wait...'
      };
    }

    let filteredData = applyFilters(salesData, filters);
    filteredData = applySorting(filteredData, sortBy);
    const totalRecords = filteredData.length;
    const paginatedData = applyPagination(filteredData, page, limit);

    return {
      data: paginatedData,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit)
      }
    };
  } catch (error) {
    console.error('Error in getFilteredSalesData:', error);
    throw error;
  }
};

export const getSalesStatistics = async () => {
  try {
    if (isLoading) {
      return { totalUnits: 0, totalAmount: 0, totalTransactions: 0 };
    }

    const totalUnits = salesData.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalAmount = salesData.reduce((sum, item) => sum + (item.finalAmount || 0), 0);
    const totalTransactions = salesData.length;

    return { totalUnits, totalAmount, totalTransactions };
  } catch (error) {
    console.error('Error in getSalesStatistics:', error);
    throw error;
  }
};

export const getAvailableFilterOptions = async () => {
  try {
    if (isLoading) {
      return {
        customerRegion: [],
        gender: [],
        productCategory: [],
        tags: [],
        paymentMethod: []
      };
    }

    const regions = [...new Set(salesData.map(item => item.customerRegion).filter(Boolean))];
    const genders = [...new Set(salesData.map(item => item.gender).filter(Boolean))];
    const categories = [...new Set(salesData.map(item => item.productCategory).filter(Boolean))];
    const tags = [...new Set(salesData.map(item => item.tags).filter(Boolean))];
    const paymentMethods = [...new Set(salesData.map(item => item.paymentMethod).filter(Boolean))];

    return {
      customerRegion: regions.sort(),
      gender: genders.sort(),
      productCategory: categories.sort(),
      tags: tags.sort(),
      paymentMethod: paymentMethods.sort()
    };
  } catch (error) {
    console.error('Error in getAvailableFilterOptions:', error);
    throw error;
  }
};