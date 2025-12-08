# Sales Management Backend API

RESTful API for the Retail Sales Management System.

## Tech Stack

- Node.js
- Express.js
- CSV Parser

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2.  Create a Folder data

   Place the CSV file at `backend/data/sales_data.csv`

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## API Endpoints

### GET /api/sales
Get filtered, sorted, and paginated sales data.

**Query Parameters:**
- `search` - Search term for customer name or phone
- `customerRegion` - Comma-separated regions
- `gender` - Comma-separated genders
- `minAge` - Minimum age
- `maxAge` - Maximum age
- `productCategory` - Comma-separated categories
- `tags` - Comma-separated tags
- `paymentMethod` - Comma-separated payment methods
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `sortBy` - Sort option (date-desc, quantity, name-asc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### GET /api/sales/stats
Get sales statistics (total units, amount, transactions).

### GET /api/sales/filter-options
Get available filter options from the dataset.

### GET /api/health
Health check endpoint.

## Architecture

The backend follows a layered architecture:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data processing
- **Utils**: Helper functions for data loading and processing
- **Routes**: API route definitions
