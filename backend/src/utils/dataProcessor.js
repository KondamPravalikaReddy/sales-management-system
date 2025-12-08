export const applyFilters = (data, filters) => {
  let filtered = [...data];

  if (filters.search && filters.search.trim() !== '') {
    const searchTerm = filters.search.toLowerCase().trim();
    filtered = filtered.filter(item => {
      const customerName = (item.customerName || '').toLowerCase();
      const phoneNumber = (item.phoneNumber || '').toLowerCase();
      return customerName.includes(searchTerm) || phoneNumber.includes(searchTerm);
    });
  }

  if (filters.customerRegion && filters.customerRegion.length > 0) {
    filtered = filtered.filter(item => filters.customerRegion.includes(item.customerRegion));
  }

  if (filters.gender && filters.gender.length > 0) {
    filtered = filtered.filter(item => filters.gender.includes(item.gender));
  }

  if (filters.minAge !== null || filters.maxAge !== null) {
    filtered = filtered.filter(item => {
      const age = item.age;
      const minAge = filters.minAge !== null ? filters.minAge : 0;
      const maxAge = filters.maxAge !== null ? filters.maxAge : 150;
      return age >= minAge && age <= maxAge;
    });
  }

  if (filters.productCategory && filters.productCategory.length > 0) {
    filtered = filtered.filter(item => filters.productCategory.includes(item.productCategory));
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(item => filters.tags.includes(item.tags));
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    filtered = filtered.filter(item => filters.paymentMethod.includes(item.paymentMethod));
  }

  if (filters.startDate || filters.endDate) {
    filtered = filtered.filter(item => {
      if (!item.date) return false;
      const itemDate = new Date(item.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : new Date(0);
      const endDate = filters.endDate ? new Date(filters.endDate) : new Date();
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  return filtered;
};

export const applySorting = (data, sortBy) => {
  const sorted = [...data];

  switch (sortBy) {
    case 'date-desc':
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'date-asc':
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'quantity':
      sorted.sort((a, b) => b.quantity - a.quantity);
      break;
    case 'name-asc':
      sorted.sort((a, b) => (a.customerName || '').localeCompare(b.customerName || ''));
      break;
    case 'name-desc':
      sorted.sort((a, b) => (b.customerName || '').localeCompare(a.customerName || ''));
      break;
    default:
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return sorted;
};

export const applyPagination = (data, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
};