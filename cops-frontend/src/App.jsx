import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './components/layout/MainLayout';

// Auth Pages
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import Schedule from './pages/student/Schedule';
import Attendance from './pages/student/Attendance';
import TeacherDashboard from './pages/teacher/TeacherDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - The Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Everything inside here gets the Sidebar & Navbar */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          
          {/* Real Student Routes */}
          <Route path="student/dashboard" element={<StudentDashboard />} />
          <Route path="student/schedule" element={<Schedule />} />
          <Route path="student/attendance" element={<Attendance />} />
          
          {/* Teacher Route Placeholder */}
          <Route path="teacher/dashboard" element={<TeacherDashboard />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;