import React, { useState, useEffect } from 'react';
import { TeacherCard } from '../components/TeacherCard';
import { StudentCard } from '../components/StudentCard';
import { apiService } from '../services/api';
import { TeacherWithStudents } from '../../../shared/types';
import './TeachersPage.css';


export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherWithStudents[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherWithStudents | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getTeachersWithStudents();
      setTeachers(data);
      
      // Check if we're using fallback data (no students in first teacher)
      if (data.length > 0 && data[0].students.length === 0) {
        setUsingFallback(true);
      }
    } catch (error) {
      console.error('Failed to load teachers:', error);
      setError('Failed to load data. Using demo data instead.');
      setUsingFallback(true);
      
      // Load fallback data manually
      const fallbackData: TeacherWithStudents[] = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          subject: "Mathematics",
          email: "sarah.johnson@school.edu",
          phone: "+1-555-0101",
          experience: "8 years",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          students: [
            {
              id: 1,
              name: "Alice Brown",
              grade: "A",
              email: "alice.brown@student.edu",
              phone: "+1-555-0201",
              teacherId: 1,
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            },
            {
              id: 2,
              name: "Bob Smith",
              grade: "B+",
              email: "bob.smith@student.edu",
              phone: "+1-555-0202",
              teacherId: 1,
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
            }
          ]
        },
        {
          id: 2,
          name: "Prof. Michael Chen",
          subject: "Physics",
          email: "michael.chen@school.edu",
          phone: "+1-555-0102",
          experience: "12 years",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          students: [
            {
              id: 3,
              name: "Carol White",
              grade: "A-",
              email: "carol.white@student.edu",
              phone: "+1-555-0203",
              teacherId: 2,
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
            }
          ]
        }
      ];
      setTeachers(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudents = (teacher: TeacherWithStudents) => {
    setSelectedTeacher(teacher);
  };

  const handleBackToList = () => {
    setSelectedTeacher(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading teachers...</p>
      </div>
    );
  }

  return (
    <div className="teachers-page">
      <div className="header">
        <h1>School Management System</h1>
        <p>List of Teachers and Their Students</p>
        
        {error && (
          <div className="error-banner">
            ⚠️ {error} 
            {usingFallback && (
              <span> 
                Make sure the backend server is running: 
                <code>cd backend && npm start</code>
              </span>
            )}
          </div>
        )}
        
        {usingFallback && !error && (
          <div className="warning-banner">
            🔧 Using demo data - Backend server not detected
          </div>
        )}
      </div>

      {selectedTeacher ? (
        <>
          <div className="header">
            <button className="back-button" onClick={handleBackToList}>
              ← Back to Teachers
            </button>
            <h1>Students of {selectedTeacher.name}</h1>
          </div>
          
          <div className="teacher-detail">
            <img src={selectedTeacher.avatar} alt={selectedTeacher.name} className="teacher-detail-avatar" />
            <div className="teacher-detail-info">
              <h2>{selectedTeacher.name}</h2>
              <p>{selectedTeacher.subject} • {selectedTeacher.experience}</p>
              <p>{selectedTeacher.email}</p>
            </div>
          </div>

          <div className="students-section">
            <h3>Students ({selectedTeacher.students.length})</h3>
            <div className="students-list">
              {selectedTeacher.students.map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="teachers-list">
          {teachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              studentCount={teacher.students.length}
              onViewStudents={() => handleViewStudents(teacher)}
            />
          ))}
        </div>
      )}
    </div>
  );
};