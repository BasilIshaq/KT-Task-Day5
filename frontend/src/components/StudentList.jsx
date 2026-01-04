import StudentCard from './StudentCard'
import './StudentList.css'

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="student-list">
      <h2>All Students ({students.length})</h2>
      <div className="students-grid">
        {students.map(student => (
          <StudentCard
            key={student._id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default StudentList
