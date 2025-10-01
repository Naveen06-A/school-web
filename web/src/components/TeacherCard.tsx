import React from 'react';
import { Teacher } from '../../../shared/types';
import './TeacherCard.css';

interface TeacherCardProps {
  teacher: Teacher;
  studentCount: number;
  onViewStudents: () => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  studentCount,
  onViewStudents
}) => {
  return (
    <div className="teacher-card">
      <img src={teacher.avatar} alt={teacher.name} className="teacher-avatar" />
      <div className="teacher-info">
        <h3 className="teacher-name">{teacher.name}</h3>
        <p className="teacher-subject">{teacher.subject}</p>
        <p className="teacher-experience">{teacher.experience}</p>
        <p className="teacher-email">{teacher.email}</p>
        <p className="student-count">{studentCount} students</p>
      </div>
      <button className="view-students-btn" onClick={onViewStudents}>
        View Students
      </button>
    </div>
  );
};