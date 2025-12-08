import React from 'react';
import { X } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onClose }) => {
  const toggleArrayFilter = (filterKey, value) => {
    const current = filters[filterKey] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange({ [filterKey]: updated });
  };

  const handleRangeChange = (filterKey, key, value) => {
    onFilterChange({ [filterKey]: value });
  };

  const FilterSection = ({ title, options, filterKey }) => (
    <div className="mb-4">
      <h4 className="font-semibold text-sm mb-2 text-gray-700">{title}</h4>
      <div className="space-y-1">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input
              type="checkbox"
              checked={filters[filterKey]?.includes(option) || false}
              onChange={() => toggleArrayFilter(filterKey, option)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-64 flex-shrink-0 max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 pb-3 border-b">
        <h3 className="font-bold text-lg">Filters</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <FilterSection
        title="Customer Region"
        options={['South', 'North', 'East', 'West']}
        filterKey="customerRegion"
      />

      <FilterSection
        title="Gender"
        options={['Male', 'Female']}
        filterKey="gender"
      />

      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2 text-gray-700">Age Range</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minAge || ''}
            onChange={(e) => handleRangeChange('minAge', null, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxAge || ''}
            onChange={(e) => handleRangeChange('maxAge', null, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <FilterSection
        title="Product Category"
        options={['Clothing', 'Electronics', 'Home', 'Sports']}
        filterKey="productCategory"
      />

      <FilterSection
        title="Tags"
        options={['Summer', 'Winter', 'Sale', 'New']}
        filterKey="tags"
      />

      <FilterSection
        title="Payment Method"
        options={['Credit Card', 'Debit Card', 'Cash', 'UPI']}
        filterKey="paymentMethod"
      />

      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2 text-gray-700">Date Range</h4>
        <div className="space-y-2">
          <input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => handleRangeChange('startDate', null, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => handleRangeChange('endDate', null, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;