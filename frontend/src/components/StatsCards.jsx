import React from 'react';
import { ChevronDown } from 'lucide-react';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="date-desc">Date (Newest First)</option>
        <option value="date-asc">Date (Oldest First)</option>
        <option value="quantity">Quantity (High to Low)</option>
        <option value="name-asc">Customer Name (A-Z)</option>
        <option value="name-desc">Customer Name (Z-A)</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;