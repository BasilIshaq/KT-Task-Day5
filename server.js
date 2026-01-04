const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;
// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://basilishaq18_db_user:UGaXucnddjM95nLj@cluster0.7csnxho.mongodb.net/student_management';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  enrollmentDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, { timestamps: true });

// Student Model
const Student = mongoose.model('Student', studentSchema);

// Routes

// GET - Retrieve all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving students',
      error: error.message
    });
  }
});

// GET - Retrieve a specific student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving student',
      error: error.message
    });
  }
});

// POST - Create a new student
app.post('/api/students', async (req, res) => {
  const { name, email, age, course, enrollmentDate } = req.body;

  // Validation
  if (!name || !email || !age || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: name, email, age, course'
    });
  }

  try {
    const newStudent = new Student({
      name,
      email,
      age,
      course,
      enrollmentDate: enrollmentDate || new Date().toISOString().split('T')[0]
    });

    const savedStudent = await newStudent.save();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: savedStudent
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
});

// PUT - Update a student
app.put('/api/students/:id', async (req, res) => {
  const { name, email, age, course, enrollmentDate } = req.body;

  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Update fields if provided
    if (name) student.name = name;
    if (email) student.email = email;
    if (age) student.age = age;
    if (course) student.course = course;
    if (enrollmentDate) student.enrollmentDate = enrollmentDate;

    const updatedStudent = await student.save();

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// DELETE - Remove a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`
  Available endpoints:
  - GET    /api/students           (Get all students)
  - GET    /api/students/:id       (Get specific student)
  - POST   /api/students           (Create new student)
  - PUT    /api/students/:id       (Update student)
  - DELETE /api/students/:id       (Delete student)
  - GET    /api/health             (Health check)
  `);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
