export interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  experience: string;
  avatar: string;
}

export interface Student {
  id: number;
  name: string;
  grade: string;
  email: string;
  phone: string;
  teacherId: number;
  avatar: string;
}

export interface TeacherWithStudents extends Teacher {
  students: Student[];
}