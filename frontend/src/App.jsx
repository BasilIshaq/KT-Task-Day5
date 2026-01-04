import { useState, useEffect } from 'react'
import axios from 'axios'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import './App.css'

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  // Fetch students from API
  const fetchStudents = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_URL}/students`)
      setStudents(response.data.data)
    } catch (err) {
      setError('Failed to fetch students. Make sure the backend is running on port 3000.')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents()
  }, [])

  // Handle adding a new student
  const handleAddStudent = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/students`, formData)
      if (response.data.success) {
        setStudents([...students, response.data.data])
        setShowForm(false)
      }
    } catch (err) {
      alert('Error adding student: ' + (err.response?.data?.message || err.message))
    }
  }

  // Handle updating a student
  const handleUpdateStudent = async (formData) => {
    try {
      const response = await axios.put(`${API_URL}/students/${editingStudent._id}`, formData)
      if (response.data.success) {
        setStudents(students.map(s => s._id === editingStudent._id ? response.data.data : s))
        setEditingStudent(null)
        setShowForm(false)
      }
    } catch (err) {
      alert('Error updating student: ' + (err.response?.data?.message || err.message))
    }
  }

  // Handle deleting a student
  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return

    try {
      const response = await axios.delete(`${API_URL}/students/${studentId._id || studentId}`)
      if (response.data.success) {
        setStudents(students.filter(s => (s._id || s.id) !== (studentId._id || studentId)))
      }
    } catch (err) {
      alert('Error deleting student: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleEditClick = (student) => {
    setEditingStudent(student)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingStudent(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Student Management System</h1>
        <p>Manage student records efficiently</p>
      </header>

      <main className="app-main">
        <div className="action-bar">
          <button 
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add New Student'}
          </button>
          <button 
            className="btn-secondary"
            onClick={fetchStudents}
          >
            🔄 Refresh
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <StudentForm 
            student={editingStudent}
            onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
            onCancel={handleCloseForm}
          />
        )}

        {loading && <div className="loading">Loading students...</div>}

        {!loading && students.length === 0 && !showForm && (
          <div className="empty-state">
            <h2>No students found</h2>
            <p>Click "Add New Student" to get started!</p>
          </div>
        )}

        {!loading && students.length > 0 && (
          <StudentList 
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDeleteStudent}
          />
        )}
      </main>
    </div>
  )
}

export default App
