import { useState, useEffect } from 'react'
import './StudentForm.css'

function StudentForm({ student, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
    enrollmentDate: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (student) {
      setFormData(student)
    } else {
      const today = new Date().toISOString().split('T')[0]
      setFormData({
        name: '',
        email: '',
        age: '',
        course: '',
        enrollmentDate: today
      })
    }
  }, [student])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age'
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value) || '' : value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className={errors.age ? 'input-error' : ''}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter course name"
              className={errors.course ? 'input-error' : ''}
            />
            {errors.course && <span className="error-text">{errors.course}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="enrollmentDate">Enrollment Date</label>
          <input
            type="date"
            id="enrollmentDate"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {student ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm
