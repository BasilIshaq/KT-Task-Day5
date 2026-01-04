const { connectToDatabase, Student } = require('./db');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    await connectToDatabase();

    const path = event.path.replace('/.netlify/functions/students', '');
    const method = event.httpMethod;

    // GET all students
    if (method === 'GET' && !path) {
      const students = await Student.find();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Students retrieved successfully',
          data: students
        })
      };
    }

    // GET student by ID
    if (method === 'GET' && path) {
      const id = path.replace('/', '');
      const student = await Student.findById(id);

      if (!student) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Student not found'
          })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Student retrieved successfully',
          data: student
        })
      };
    }

    // POST - Create new student
    if (method === 'POST') {
      const { name, email, age, course, enrollmentDate } = JSON.parse(event.body);

      // Validation
      if (!name || !email || !age || !course) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Please provide all required fields: name, email, age, course'
          })
        };
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

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Student created successfully',
            data: savedStudent
          })
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Email already exists'
            })
          };
        }
        throw error;
      }
    }

    // PUT - Update student
    if (method === 'PUT' && path) {
      const id = path.replace('/', '');
      const { name, email, age, course, enrollmentDate } = JSON.parse(event.body);

      const student = await Student.findById(id);

      if (!student) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Student not found'
          })
        };
      }

      // Update fields if provided
      if (name) student.name = name;
      if (email) student.email = email;
      if (age) student.age = age;
      if (course) student.course = course;
      if (enrollmentDate) student.enrollmentDate = enrollmentDate;

      try {
        const updatedStudent = await student.save();

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Student updated successfully',
            data: updatedStudent
          })
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Email already exists'
            })
          };
        }
        throw error;
      }
    }

    // DELETE - Remove student
    if (method === 'DELETE' && path) {
      const id = path.replace('/', '');
      const student = await Student.findByIdAndDelete(id);

      if (!student) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Student not found'
          })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Student deleted successfully',
          data: student
        })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error.message
      })
    };
  }
};
