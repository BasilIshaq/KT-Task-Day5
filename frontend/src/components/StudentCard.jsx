import './StudentCard.css'

function StudentCard({ student, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="student-card">
      <div className="card-header">
        <h3>{student.name}</h3>
        <span className="student-id">ID: {student._id}</span>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span className="label">Email:</span>
          <a href={`mailto:${student.email}`} className="email">{student.email}</a>
        </div>

        <div className="info-row">
          <span className="label">Age:</span>
          <span className="value">{student.age} years</span>
        </div>

        <div className="info-row">
          <span className="label">Course:</span>
          <span className="value">{student.course}</span>
        </div>

        <div className="info-row">
          <span className="label">Enrolled:</span>
          <span className="value">{formatDate(student.enrollmentDate)}</span>
        </div>
      </div>

      <div className="card-actions">
        <button 
          className="btn-edit"
          onClick={() => onEdit(student)}
          title="Edit student"
        >
          ✏️ Edit
        </button>
        <button 
          className="btn-delete"
          onClick={() => onDelete(student)}
          title="Delete student"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}

export default StudentCard
