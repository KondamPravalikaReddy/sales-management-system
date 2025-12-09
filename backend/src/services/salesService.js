import Sale from '../models/Sale.js';

export const getFilteredSalesData = async (filters, sortBy, page, limit) => {
  try {
    // Build query
    const query = {};

    // Search filter
    if (filters.search && filters.search.trim() !== '') {
      query.$or = [
        { customerName: { $regex: filters.search, $options: 'i' } },
        { phoneNumber: { $regex: filters.search, $options: 'i' } }
      ];
    }

    // Region filter
    if (filters.customerRegion && filters.customerRegion.length > 0) {
      query.customerRegion = { $in: filters.customerRegion };
    }

    // Gender filter
    if (filters.gender && filters.gender.length > 0) {
      query.gender = { $in: filters.gender };
    }

    // Age range filter
    if (filters.minAge !== null || filters.maxAge !== null) {
      query.age = {};
      if (filters.minAge !== null) query.age.$gte = filters.minAge;
      if (filters.maxAge !== null) query.age.$lte = filters.maxAge;
    }

    // Product category filter
    if (filters.productCategory && filters.productCategory.length > 0) {
      query.productCategory = { $in: filters.productCategory };
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    // Payment method filter
    if (filters.paymentMethod && filters.paymentMethod.length > 0) {
      query.paymentMethod = { $in: filters.paymentMethod };
    }

    // Date range filter
    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) query.date.$gte = new Date(filters.startDate);
      if (filters.endDate) query.date.$lte = new Date(filters.endDate);
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'date-desc':
        sort = { date: -1 };
        break;
      case 'date-asc':
        sort = { date: 1 };
        break;
      case 'quantity':
        sort = { quantity: -1 };
        break;
      case 'name-asc':
        sort = { customerName: 1 };
        break;
      case 'name-desc':
        sort = { customerName: -1 };
        break;
      default:
        sort = { date: -1 };
    }

    // Get total count
    const totalRecords = await Sale.countDocuments(query);

    // Get paginated data
    const skip = (page - 1) * limit;
    const data = await Sale.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance

    return {
      data,
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
    const stats = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalUnits: { $sum: '$quantity' },
          totalAmount: { $sum: '$finalAmount' },
          totalTransactions: { $sum: 1 }
        }
      }
    ]);

    if (stats.length === 0) {
      return { totalUnits: 0, totalAmount: 0, totalTransactions: 0 };
    }

    return {
      totalUnits: stats[0].totalUnits,
      totalAmount: stats[0].totalAmount,
      totalTransactions: stats[0].totalTransactions
    };
  } catch (error) {
    console.error('Error in getSalesStatistics:', error);
    throw error;
  }
};

export const getAvailableFilterOptions = async () => {
  try {
    const [regions, genders, categories, tags, paymentMethods] = await Promise.all([
      Sale.distinct('customerRegion'),
      Sale.distinct('gender'),
      Sale.distinct('productCategory'),
      Sale.distinct('tags'),
      Sale.distinct('paymentMethod')
    ]);

    return {
      customerRegion: regions.filter(Boolean).sort(),
      gender: genders.filter(Boolean).sort(),
      productCategory: categories.filter(Boolean).sort(),
      tags: tags.filter(Boolean).sort(),
      paymentMethod: paymentMethods.filter(Boolean).sort()
    };
  } catch (error) {
    console.error('Error in getAvailableFilterOptions:', error);
    throw error;
  }
};