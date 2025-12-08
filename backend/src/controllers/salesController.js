import * as salesService from '../services/salesService.js';

export const getSalesData = async (req, res) => {
  try {
    const {
      search = '',
      customerRegion = '',
      gender = '',
      minAge = '',
      maxAge = '',
      productCategory = '',
      tags = '',
      paymentMethod = '',
      startDate = '',
      endDate = '',
      sortBy = 'date-desc',
      page = 1,
      limit = 10
    } = req.query;

    const filters = {
      search,
      customerRegion: customerRegion ? customerRegion.split(',') : [],
      gender: gender ? gender.split(',') : [],
      minAge: minAge ? parseInt(minAge) : null,
      maxAge: maxAge ? parseInt(maxAge) : null,
      productCategory: productCategory ? productCategory.split(',') : [],
      tags: tags ? tags.split(',') : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',') : [],
      startDate,
      endDate
    };

    const result = await salesService.getFilteredSalesData(
      filters,
      sortBy,
      parseInt(page),
      parseInt(limit)
    );

    res.json(result);
  } catch (error) {
    console.error('Error in getSalesData:', error);
    res.status(500).json({ 
      error: 'Failed to fetch sales data',
      message: error.message 
    });
  }
};

export const getSalesStats = async (req, res) => {
  try {
    const stats = await salesService.getSalesStatistics();
    res.json(stats);
  } catch (error) {
    console.error('Error in getSalesStats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch sales statistics',
      message: error.message 
    });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    const options = await salesService.getAvailableFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch filter options',
      message: error.message 
    });
  }
};