import express from 'express';
import * as salesController from '../controllers/salesController.js';

const router = express.Router();

// Get sales data with filters, sorting, and pagination
router.get('/', salesController.getSalesData);

// Get sales statistics
router.get('/stats', salesController.getSalesStats);

// Get available filter options
router.get('/filter-options', salesController.getFilterOptions);

export default router;