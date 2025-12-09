import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import SortDropdown from './SortDropdown';
import StatsCards from './StatsCards';
import SalesTable from './SalesTable';
import Pagination from './Pagination';
import { useSalesData } from '../hooks/useSalesData';
import { Filter } from 'lucide-react';

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    customerRegion: [],
    gender: [],
    minAge: '',
    maxAge: '',
    productCategory: [],
    tags: [],
    paymentMethod: [],
    startDate: '',
    endDate: '',
    sortBy: 'date-desc',
    page: 1,
    limit: 10
  });

  const { data, stats, pagination, loading, error } = useSalesData(filters);

  const handleSearchChange = (search) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      customerRegion: [],
      gender: [],
      minAge: '',
      maxAge: '',
      productCategory: [],
      tags: [],
      paymentMethod: [],
      startDate: '',
      endDate: '',
      sortBy: 'date-desc',
      page: 1,
      limit: 10
    });
  };

  const activeFiltersCount = [
    ...filters.customerRegion,
    ...filters.gender,
    ...filters.productCategory,
    ...filters.tags,
    ...filters.paymentMethod
  ].length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Sales Management System</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search and Controls - SINGLE ROW */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <SearchBar value={filters.search} onChange={handleSearchChange} />

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition relative"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <SortDropdown value={filters.sortBy} onChange={handleSortChange} />
            </div>
          </div>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Active Filters:</span>
                {[...filters.customerRegion, ...filters.gender, ...filters.productCategory,
                  ...filters.tags, ...filters.paymentMethod].map((filter, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {filter}
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 ml-2"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Filter Panel */}
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1">
            <StatsCards stats={stats} loading={loading} />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <SalesTable data={data} loading={loading} />

            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalRecords={pagination.totalRecords}
                pageSize={pagination.pageSize}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;