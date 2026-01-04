# Student Management Backend API

A Node.js and Express.js REST API for managing student records with full CRUD operations.

## Features

- **Create**: Add new students to the system
- **Read**: Retrieve all students or a specific student by ID
- **Update**: Modify student information
- **Delete**: Remove students from the system

## Project Structure

```
Task_Day3/
├── server.js          # Main Express server with all routes
├── students.json      # JSON file storing student data
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the project directory:
   ```bash
   cd d:\Hackathon\Task_Day3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start the server with:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Get All Students
**GET** `/api/students`

Response:
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": [...]
}
```

### 2. Get Student by ID
**GET** `/api/students/:id`

Example: `GET /api/students/1`

Response:
```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 20,
    "course": "Computer Science",
    "enrollmentDate": "2023-09-01"
  }
}
```

### 3. Create New Student
**POST** `/api/students`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "course": "Data Science",
  "enrollmentDate": "2024-01-15"
}
```

Required fields: `name`, `email`, `age`, `course`
Optional field: `enrollmentDate` (defaults to current date)

### 4. Update Student
**PUT** `/api/students/:id`

Example: `PUT /api/students/1`

Request Body (provide fields to update):
```json
{
  "name": "Updated Name",
  "course": "New Course"
}
```

### 5. Delete Student
**DELETE** `/api/students/:id`

Example: `DELETE /api/students/1`

### 6. Health Check
**GET** `/api/health`

## Testing with Postman

### Prerequisites
- Download and install [Postman](https://www.postman.com/downloads/)
- Start the server with `npm start`

### Test Cases

#### 1. GET All Students
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/students`
- **Headers**: None
- **Body**: None
- **Expected**: Status 200 with all students

#### 2. GET Student by ID
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/students/1`
- **Headers**: None
- **Body**: None
- **Expected**: Status 200 with student details

#### 3. CREATE New Student
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/students`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 21,
    "course": "Web Development"
  }
  ```
- **Expected**: Status 201 with created student

#### 4. UPDATE Student
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/students/1`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
  ```json
  {
    "course": "Advanced Computer Science",
    "age": 21
  }
  ```
- **Expected**: Status 200 with updated student

#### 5. DELETE Student
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/students/3`
- **Headers**: None
- **Body**: None
- **Expected**: Status 200 with deleted student data

#### 6. Health Check
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/health`
- **Headers**: None
- **Body**: None
- **Expected**: Status 200 with server status

### Postman Tips
1. Create a new collection called "Student API" for organizing requests
2. Set a collection variable: `base_url = http://localhost:3000`
3. Use `{{base_url}}/api/students` in your requests
4. Test error cases:
   - GET `/api/students/999` (returns 404)
   - POST without required fields (returns 400)

## Testing with cURL

### Get all students
```bash
curl http://localhost:3000/api/students
```

### Create a new student
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\",\"age\":21,\"course\":\"Engineering\"}"
```

### Get a specific student
```bash
curl http://localhost:3000/api/students/1
```

### Update a student
```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d "{\"course\":\"Advanced Computer Science\"}"
```

### Delete a student
```bash
curl -X DELETE http://localhost:3000/api/students/1
```

## Data Structure

Each student object contains:
- `id` (number): Unique identifier
- `name` (string): Student's full name
- `email` (string): Student's email address
- `age` (number): Student's age
- `course` (string): Course enrolled in
- `enrollmentDate` (string): Date of enrollment (YYYY-MM-DD)

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (missing or invalid fields)
- `404`: Not Found (student doesn't exist)

## Data Persistence

Student data is stored in `students.json` file in the project root. All CRUD operations automatically update this file.

## Dependencies

- **express**: Web framework for Node.js
- **body-parser**: Middleware for parsing request bodies

## License

ISC
