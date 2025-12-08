# Sales Management Frontend

React-based frontend for the Retail Sales Management System.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React (Icons)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with:
```
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Features

- **Search**: Real-time search across customer name and phone number
- **Filters**: Multi-select filters for regions, gender, categories, tags, payment methods, age range, and date range
- **Sorting**: Sort by date, quantity, or customer name
- **Pagination**: Navigate through data with 10 items per page
- **Statistics**: View total units sold, amount, and transactions
- **Responsive Design**: Works on desktop and mobile devices

## Architecture

The frontend follows a component-based architecture:
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for data fetching
- **Services**: API communication layer
- **Styles**: Tailwind CSS utilities