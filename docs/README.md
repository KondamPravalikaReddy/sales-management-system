# Retail Sales Management System

A full-stack web application for managing and analyzing retail sales data with advanced search, filtering, sorting, and pagination capabilities.

## Overview

This system provides a comprehensive interface for viewing and analyzing retail sales transactions. Built with modern web technologies, it offers real-time search, multi-criteria filtering, and intuitive data visualization.

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React

**Backend:**
- Node.js
- Express.js
- CSV Parser

## Search Implementation Summary

Search functionality allows users to find transactions by customer name or phone number. Implemented using case-insensitive string matching across multiple fields. The search works seamlessly with filters and maintains state across pagination.

**Key Features:**
- Real-time search as user types
- Case-insensitive matching
- Searches across customer name and phone number
- Preserves active filters and sorting
- Resets to page 1 on new search

## Filter Implementation Summary

Multi-select filtering system supporting various criteria with independent and combinable filters.

**Filter Types:**
- Multi-select: Customer Region, Gender, Product Category, Tags, Payment Method
- Range-based: Age Range, Date Range

**Implementation:**
- Each filter works independently
- Multiple filters combine using AND logic
- State maintained across sorting and pagination
- Visual indicators for active filters
- One-click clear all functionality

## Sorting Implementation Summary

Sorting allows users to order data by different criteria while maintaining active search and filter states.

**Sort Options:**
- Date (Newest/Oldest First)
- Quantity (High to Low)
- Customer Name (A-Z / Z-A)

**Implementation:**
- Dropdown interface for sort selection
- Applied on server-side for efficiency
- Preserves current filters and search
- Maintains page position when possible

## Pagination Implementation Summary

Efficient pagination system that handles large datasets while keeping the interface responsive.

**Features:**
- 10 items per page (configurable)
- Next/Previous navigation
- Direct page number selection
- Shows current range (e.g., "Showing 1 to 10 of 150")
- Maintains search, filter, and sort states

**Implementation:**
- Server-side pagination for performance
- Smart page number display (max 5 visible)
- Automatic reset to page 1 on filter/search change
- Disabled navigation at boundaries

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `data` folder and place your CSV file:
```bash
mkdir data
# Place sales_data.csv in backend/data/
```

4. Configure environment (optional):
```bash
# Create .env file
PORT=5000
NODE_ENV=development
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
# Create .env file
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

Frontend will run on `http://localhost:3000`

### Running Both Together

From the root directory, you can run both servers:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## Project Structure

See `/docs/architecture.md` for detailed architecture documentation.

## Features

✅ Real-time search across customer data  
✅ Multi-select filters (Region, Gender, Category, Tags, Payment)  
✅ Range filters (Age, Date)  
✅ Multiple sorting options  
✅ Pagination with 10 items per page  
✅ Statistics dashboard (Total Units, Amount, Transactions)  
✅ Responsive design for mobile and desktop  
✅ Loading states and error handling  
✅ Clean, maintainable code structure  

## API Endpoints

- `GET /api/sales` - Get filtered sales data
- `GET /api/sales/stats` - Get sales statistics
- `GET /api/sales/filter-options` - Get available filter options
- `GET /api/health` - Health check

## Deployment

### Backend Deployment (Heroku/Railway)

1. Create new app on platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy from main branch

### Frontend Deployment (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy

## Contributing

This project follows clean code principles and modular architecture. When contributing:

1. Follow the existing folder structure
2. Write clear, self-documenting code
3. Add comments for complex logic
4. Test all features before committing
5. Update documentation as needed

## License

MIT License - feel free to use this project for learning or development.

## Author

Developed as part of TruEstate SDE Intern Assignment