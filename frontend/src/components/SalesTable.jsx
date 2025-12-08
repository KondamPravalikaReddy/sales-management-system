import React from 'react';

const SalesTable = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Age
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Region
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.transactionId} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {item.transactionId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.customerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.phoneNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.gender}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.age}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.customerRegion}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.productCategory}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    ₹{item.finalAmount?.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                  No results found. Try adjusting your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;