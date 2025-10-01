import { Teacher, Student, TeacherWithStudents } from '../../../shared/types';

const API_BASE_URL = 'http://localhost:3001';

// Fallback mock data in case backend is not available
const fallbackTeachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    email: "sarah.johnson@school.edu",
    phone: "+1-555-0101",
    experience: "8 years",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Physics",
    email: "michael.chen@school.edu",
    phone: "+1-555-0102",
    experience: "12 years",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  }
];

const fallbackStudents: Student[] = [
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
  },
  {
    id: 3,
    name: "Carol White",
    grade: "A-",
    email: "carol.white@student.edu",
    phone: "+1-555-0203",
    teacherId: 2,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  }
];

let isBackendAvailable = true;

export const apiService = {
  async getTeachers(): Promise<Teacher[]> {
    if (!isBackendAvailable) {
      return fallbackTeachers;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/teachers`);
      if (!response.ok) throw new Error('Failed to fetch teachers');
      return response.json();
    } catch (error) {
      console.warn('Backend not available, using fallback data:', error);
      isBackendAvailable = false;
      return fallbackTeachers;
    }
  },

  async getStudents(): Promise<Student[]> {
    if (!isBackendAvailable) {
      return fallbackStudents;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    } catch (error) {
      console.warn('Backend not available, using fallback data:', error);
      isBackendAvailable = false;
      return fallbackStudents;
    }
  },

  async getTeachersWithStudents(): Promise<TeacherWithStudents[]> {
    try {
      const [teachers, students] = await Promise.all([
        this.getTeachers(),
        this.getStudents()
      ]);

      return teachers.map(teacher => ({
        ...teacher,
        students: students.filter(student => student.teacherId === teacher.id)
      }));
    } catch (error) {
      console.error('Error combining data:', error);
      // Return fallback combined data
      return fallbackTeachers.map(teacher => ({
        ...teacher,
        students: fallbackStudents.filter(student => student.teacherId === teacher.id)
      }));
    }
  }
};