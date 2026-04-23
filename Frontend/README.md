# Library Management Frontend

A modern React + Vite + Tailwind CSS frontend for managing books. This frontend communicates with a Node.js Express backend API.

## Features

- ✨ View all books from the database
- ➕ Add new books
- ✏️ Edit existing books
- 🗑️ Delete books
- 🎨 Beautiful Tailwind CSS UI
- ⚡ Fast development with Vite
- 🔄 Real-time data synchronization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- The Node.js Express backend running on `http://localhost:5000`

## Installation

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Build

Create an optimized production build:
```bash
npm run build
```

## Preview

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Header component
│   ├── BooksList.jsx      # List of books with CRUD operations
│   └── BookForm.jsx       # Form for adding/editing books
├── services/
│   └── api.js             # API client and service methods
├── App.jsx                # Main app component
├── main.jsx               # Entry point
├── index.css              # Tailwind CSS styles
└── assets/                # Static assets
```

## API Integration

The frontend communicates with the following backend endpoints:

- `GET /books` - Fetch all books
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book
- `GET /users` - Fetch all users
- `GET /products` - Fetch all products

## Environment Configuration

To use a different backend URL, update the `API_BASE_URL` in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url:port'
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **JavaScript ES6+** - Modern JavaScript

## Quick Start

### 1. Start the Backend Server
```bash
# In the Node and Express folder
npm start
# or
node bharath.js
```

### 2. Start the Frontend
```bash
cd Frontend
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:5173/`

## License

MIT

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
