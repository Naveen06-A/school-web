import React from 'react';
import { Student } from '../../../shared/types';
import './StudentCard.css';

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="student-card">
      <img src={student.avatar} alt={student.name} className="student-avatar" />
      <div className="student-info">
        <h4 className="student-name">{student.name}</h4>
        <p className="student-email">{student.email}</p>
        <p className="student-phone">{student.phone}</p>
        <span className={`grade-badge grade-${student.grade.replace('+', 'plus').replace('-', 'minus')}`}>
          Grade: {student.grade}
        </span>
      </div>
    </div>
  );
};