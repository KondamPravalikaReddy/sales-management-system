import { useState, useEffect } from 'react';
import { fetchSalesData, fetchSalesStats } from '../services/api';

export const useSalesData = (filters) => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [salesResult, statsResult] = await Promise.all([
          fetchSalesData(filters),
          fetchSalesStats()
        ]);

        setData(salesResult.data || []);
        setPagination(salesResult.pagination);
        setStats(statsResult);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [
    filters.search,
    filters.customerRegion?.join(','),
    filters.gender?.join(','),
    filters.minAge,
    filters.maxAge,
    filters.productCategory?.join(','),
    filters.tags?.join(','),
    filters.paymentMethod?.join(','),
    filters.startDate,
    filters.endDate,
    filters.sortBy,
    filters.page,
    filters.limit
  ]);

  return { data, stats, pagination, loading, error };
};