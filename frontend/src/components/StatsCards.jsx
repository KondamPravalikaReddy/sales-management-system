import React from 'react';

const StatsCards = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Units Sold</p>
          <p className="text-2xl font-bold text-gray-800">
            {stats?.totalUnits?.toLocaleString() || 0}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="text-2xl font-bold text-gray-800">
            ₹{stats?.totalAmount?.toLocaleString() || 0}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-800">
            {stats?.totalTransactions?.toLocaleString() || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;