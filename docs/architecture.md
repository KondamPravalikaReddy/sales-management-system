# System Architecture

## Overview

The Retail Sales Management System is built using a modern client-server architecture with clear separation between frontend and backend responsibilities.

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Data Processing**: CSV Parser
- **CORS**: For cross-origin requests

### Folder Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── utils/          # Helper utilities
│   ├── routes/         # API route definitions
│   └── index.js        # Application entry point
├── data/               # CSV data storage
├── package.json
└── README.md
```

### Module Responsibilities

#### Controllers (`controllers/`)
- **salesController.js**: Handles HTTP requests for sales data
  - `getSalesData()`: Processes filter, sort, and pagination requests
  - `getSalesStats()`: Returns aggregated statistics
  - `getFilterOptions()`: Provides available filter values

#### Services (`services/`)
- **salesService.js**: Core business logic
  - Data filtering and transformation
  - Pagination logic
  - Statistics calculation
  - Filter option extraction

#### Utils (`utils/`)
- **dataLoader.js**: CSV file parsing and data loading
  - Reads CSV files using streaming
  - Normalizes column names
  - Converts data types
- **dataProcessor.js**: Data manipulation utilities
  - `applyFilters()`: Multi-criteria filtering
  - `applySorting()`: Sorting logic
  - `applyPagination()`: Pagination calculation

#### Routes (`routes/`)
- **salesRoutes.js**: API endpoint definitions
  - `GET /api/sales` - Filtered sales data
  - `GET /api/sales/stats` - Statistics
  - `GET /api/sales/filter-options` - Filter options

### Data Flow

1. **Request Reception**: Express receives HTTP request
2. **Route Matching**: Router directs to appropriate controller
3. **Controller Processing**: Validates and extracts parameters
4. **Service Execution**: Business logic processes data
5. **Data Filtering**: Utils apply filters, sorting, pagination
6. **Response Formation**: JSON response sent to client

### Error Handling
- Try-catch blocks in controllers
- Global error handling middleware
- Validation of query parameters
- Graceful handling of missing CSV file

## Frontend Architecture

### Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Folder Structure
```
frontend/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API communication
│   ├── styles/        # CSS files
│   ├── App.jsx        # Root component
│   └── main.jsx       # Application entry
├── public/            # Static assets
├── index.html
├── package.json
└── README.md
```

### Component Hierarchy

```
App
└── Dashboard
    ├── SearchBar
    ├── FilterPanel
    ├── SortDropdown
    ├── StatsCards
    ├── SalesTable
    └── Pagination
```

### Module Responsibilities

#### Components (`components/`)
- **Dashboard.jsx**: Main container, state management
- **SearchBar.jsx**: Search input with icon
- **FilterPanel.jsx**: Multi-select filter interface
- **SortDropdown.jsx**: Sorting options dropdown
- **StatsCards.jsx**: Statistics display cards
- **SalesTable.jsx**: Data table with loading states
- **Pagination.jsx**: Page navigation controls

#### Hooks (`hooks/`)
- **useSalesData.js**: Custom hook for data fetching
  - Manages loading, error, and data states
  - Automatically refetches on filter changes
  - Debounced API calls

#### Services (`services/`)
- **api.js**: Axios-based API client
  - `fetchSalesData()`: Get filtered sales data
  - `fetchSalesStats()`: Get statistics
  - `fetchFilterOptions()`: Get filter options
  - Centralized error handling

### State Management

The application uses React's built-in state management:
- **Local State**: Component-specific UI state
- **Lifted State**: Shared state in Dashboard component
- **Derived State**: Computed from primary state

### Data Flow

1. **User Interaction**: User modifies filters/search
2. **State Update**: Dashboard updates filter state
3. **Effect Trigger**: useSalesData hook detects changes
4. **API Call**: Axios sends request to backend
5. **Response Processing**: Hook updates data state
6. **Re-render**: Components display new data

### Performance Optimizations

- **React.memo**: Prevent unnecessary re-renders
- **useEffect Dependencies**: Precise effect triggers
- **Pagination**: Load only 10 records at a time
- **Debouncing**: Delay API calls during typing (recommended)

## API Communication

### Request Flow
```
Frontend Component
    ↓
Custom Hook (useSalesData)
    ↓
API Service (axios)
    ↓
Backend Route
    ↓
Controller
    ↓
Service
    ↓
Utils
    ↓
Response
```

### Request Format
```javascript
GET /api/sales?search=John&customerRegion=South&page=1&limit=10
```

### Response Format
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalRecords": 150,
    "totalPages": 15
  }
}
```

## Security Considerations

- **CORS**: Configured for allowed origins
- **Input Validation**: Query parameters validated
- **Error Messages**: Generic messages to prevent information leakage
- **Environment Variables**: Sensitive config in .env files

## Scalability Considerations

### Backend
- **Caching**: Add Redis for frequently accessed data
- **Database**: Move from CSV to PostgreSQL/MongoDB
- **Load Balancing**: Multiple backend instances
- **Compression**: Gzip responses

### Frontend
- **Code Splitting**: Lazy load components
- **Virtual Scrolling**: For large datasets
- **Service Workers**: Offline support
- **CDN**: Static asset delivery

## Deployment Strategy

### Backend
- **Platform**: Heroku, Railway, or AWS EC2
- **Environment**: Production environment variables
- **Process Manager**: PM2 for process management
- **Monitoring**: Error tracking with Sentry

### Frontend
- **Platform**: Vercel, Netlify, or AWS S3
- **Build**: Production build with optimization
- **Environment**: Production API URL
- **CDN**: Cloudflare for global distribution

## Future Enhancements

1. **Authentication**: User login and role-based access
2. **Real-time Updates**: WebSocket for live data
3. **Export**: CSV/Excel export functionality
4. **Analytics**: Advanced reporting and charts
5. **Bulk Operations**: Batch updates and deletes
6. **Search**: Full-text search with Elasticsearch