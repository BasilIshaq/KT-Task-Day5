# Student Management System - Frontend

A modern React/Vite frontend for the Student Management API.

## Features

- ✅ View all students in a responsive grid layout
- ✅ Add new students with form validation
- ✅ Edit existing student information
- ✅ Delete students with confirmation
- ✅ Real-time updates from API
- ✅ Beautiful UI with gradient design
- ✅ Mobile responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port).

## Building for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── StudentForm.jsx      # Form to add/edit students
│   │   ├── StudentForm.css
│   │   ├── StudentList.jsx      # List of all students
│   │   ├── StudentList.css
│   │   ├── StudentCard.jsx      # Individual student card
│   │   └── StudentCard.css
│   ├── App.jsx                  # Main app component
│   ├── App.css
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## API Endpoints Used

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Technologies Used

- **React** - UI library
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## Features Breakdown

### Student List View
- Displays all students in a responsive grid
- Shows student details in cards
- Hover effects and animations

### Add Student Form
- Form validation for all fields
- Real-time error messages
- Auto-fill current date for enrollment
- Email validation

### Edit Student
- Click Edit to modify student information
- Form pre-fills with existing data
- Updates student in the database

### Delete Student
- Confirmation dialog before deletion
- Instant removal from the UI
- Error handling with user feedback

## Notes

- Make sure the backend server is running before starting the frontend
- The API URL is configured in `App.jsx` - update `API_URL` if your backend runs on a different port
- All form fields are required except enrollment date
- Age must be between 1 and 120

## Future Enhancements

- Add search and filter functionality
- Add sorting options (by name, age, course, etc.)
- Add pagination for large datasets
- Add student photo uploads
- Add export to CSV/PDF functionality
- Add dark mode toggle
