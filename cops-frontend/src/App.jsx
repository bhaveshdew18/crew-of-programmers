import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentAttendance from './pages/student/Attendance';
import StudentClassrooms from './pages/student/Classrooms';
import CodingZone from './pages/student/CodingZone';
import Schedule from './pages/student/Schedule';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherAttendance from './pages/teacher/Attendance';
import TeacherClassrooms from './pages/teacher/Classrooms';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Lectures from './pages/teacher/Lectures';
import Resources from './pages/teacher/Resources';
import Tasks from './pages/teacher/Tasks';
import { useAuth } from './context/useAuth';
import { getDashboardPath } from './utils/roles';

const HomeRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={getDashboardPath(user?.role)} replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute element={<HomeRedirect />} />} />

        <Route
          path="/student"
          element={<ProtectedRoute element={<MainLayout />} requiredRole="STUDENT" />}
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="classrooms" element={<StudentClassrooms />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="coding-zone" element={<CodingZone />} />
        </Route>

        <Route
          path="/teacher"
          element={<ProtectedRoute element={<MainLayout />} requiredRole="TEACHER" />}
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="classrooms" element={<TeacherClassrooms />} />
          <Route path="lectures" element={<Lectures />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="resources" element={<Resources />} />
          <Route path="attendance" element={<TeacherAttendance />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
