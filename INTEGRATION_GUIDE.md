# Backend and Frontend Integration Guide

This guide explains how to successfully run and integrate the COPS (Crew of Programmers) backend and frontend.

## Prerequisites

- **Backend**: Java 17, Maven, MySQL
- **Frontend**: Node.js (v16+), npm

## Setting Up the Backend

### 1. Database Setup
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE cops_db;
```

### 2. Configure Database Connection
Update [backend/cops/src/main/resources/application.properties](backend/cops/src/main/resources/application.properties) if needed:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cops_db
spring.datasource.username=root
spring.datasource.password=bhvsdew@18
```

### 3. Build and Run Backend
```bash
cd backend/cops
mvn clean install
mvn spring-boot:run
```

The backend will start on **http://localhost:8081**

## Setting Up the Frontend

### 1. Install Dependencies
```bash
cd cops-frontend
npm install
```

### 2. Configure API Base URL
The frontend is pre-configured to use `http://localhost:8081/api` (see [src/api/apiClient.js](cops-frontend/src/api/apiClient.js))

### 3. Start Development Server
```bash
npm run dev
```

The frontend will typically run on **http://localhost:5173**

## API Integration Details

### Authentication Flow

1. **Register** (`POST /api/users/register`)
   - Request: `{ fullName, email, password, role }`
   - Response: User object

2. **Login** (`POST /api/users/login`)
   - Request: `{ email, password, role }`
   - Response: `{ token, userId, email, fullName, role }`
   - Token is stored in `localStorage`

3. **Protected Routes**
   - JWT token is automatically included in all subsequent requests
   - Token is sent as `Authorization: Bearer <token>` header

### Available Endpoints

#### User Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/all` - Get all users (protected)

#### Attendance Endpoints
- `POST /api/attendance/mark` - Mark attendance (protected)
- `GET /api/attendance/user/{id}` - Get user attendance (protected)
- `GET /api/attendance/class/{classId}` - Get class attendance (protected)
- `GET /api/attendance/date?date=YYYY-MM-DD` - Get attendance by date (protected)

#### Dashboard Endpoints
- `GET /api/dashboard/stats` - Get dashboard statistics (protected)

## Key Features Implemented

### Frontend Features
✅ **Authentication Context** - Global state management for auth
✅ **Protected Routes** - Routes require authentication
✅ **API Service Layer** - Centralized API client with interceptors
✅ **JWT Token Management** - Automatic token injection and expiration handling
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Loading indicators during API calls
✅ **Auto Logout** - Redirects to login on token expiration

### Pages Integration
- ✅ Login page now calls `/api/users/login`
- ✅ Register page now calls `/api/users/register`
- ✅ Student Dashboard fetches real data from `/api/dashboard/stats`
- ✅ Attendance page fetches from `/api/attendance/user/{userId}`
- ✅ Logout functionality properly clears tokens

## Testing the Integration

### 1. Test Registration
```
1. Go to http://localhost:5173/register
2. Select "Student" as role
3. Enter credentials (fullName, email, password)
4. Click "Create Account"
5. Should redirect to login page
```

### 2. Test Login
```
1. Go to http://localhost:5173/login
2. Select "Student" as role
3. Enter registered credentials
4. Click "Sign in"
5. Should redirect to dashboard and display your name
```

### 3. Test Dashboard
```
1. After login, visit http://localhost:5173/student/dashboard
2. Should display "Welcome back, [Your Name]!"
3. Attendance percentage and problems solved from backend
4. Upcoming classes from backend
```

### 4. Test Attendance Tracker
```
1. Click "Attendance" in sidebar
2. Should show subject-wise attendance
3. Should display recent attendance records
```

### 5. Test Logout
```
1. Click "Sign out" button in sidebar
2. Should clear token and redirect to login
3. Trying to access protected routes should redirect to login
```

## Troubleshooting

### CORS Error
If you see CORS errors, ensure the backend CORS config is present in `CorsConfig.java`:
```java
config.addAllowedOrigin("*");
config.addAllowedHeader("*");
config.addAllowedMethod("*");
```

### 401 Unauthorized
- Check that token is being sent in requests (check browser DevTools Network tab)
- Verify JWT_SECRET in both frontend and backend match
- Check if token has expired

### API Not Found (404)
- Ensure backend is running on port 8081
- Check endpoint spelling in both frontend and backend
- Verify request method (GET/POST) matches

### Database Connection Failed
- Ensure MySQL is running
- Verify database credentials in `application.properties`
- Check if `cops_db` database exists

## Next Steps

1. **Add Password Encryption** - Use BCrypt instead of plain text
2. **Implement Role-based Authorization** - Restrict endpoints by role
3. **Add Data Validation** - Server-side validation for all inputs
4. **Implement Refresh Tokens** - For better security
5. **Add Modal/Toast Notifications** - For better UX
6. **Complete Teacher Dashboard** - Implement teacher routes
7. **Add Schedule Management** - Calendar/schedule integration

## File Structure

```
cops-frontend/src/
├── api/
│   ├── apiClient.js          # Axios configuration
│   ├── authService.js        # Authentication API calls
│   ├── attendanceService.js  # Attendance API calls
│   └── dashboardService.js   # Dashboard API calls
├── context/
│   └── AuthContext.jsx       # Global auth state
├── components/
│   ├── layout/
│   │   └── Sidebar.jsx       # Updated with logout
│   └── ProtectedRoute.jsx    # Route protection
└── pages/
    ├── auth/
    │   ├── Login.jsx         # Updated with API calls
    │   └── Register.jsx      # Updated with API calls
    └── student/
        ├── StudentDashboard.jsx  # Updated with real data
        └── Attendance.jsx    # Updated with real data
```

## Backend Architecture

```
backend/cops/src/main/java/com/cops/
├── controller/
│   ├── UserController.java
│   ├── AttendanceController.java
│   └── DashboardController.java
├── service/
│   ├── UserService.java
│   ├── AttendanceService.java
│   └── DashboardService.java
├── entity/
│   ├── User.java
│   ├── Attendance.java
│   └── ...
├── dto/
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   ├── RegisterRequest.java
│   └── ...
├── security/
│   ├── JwtUtil.java
│   ├── JwtFilter.java
│   └── SecurityConfig.java
└── config/
    └── CorsConfig.java
```

## Important Notes

1. **JWT Secret** - Change `cops-secret-key` in `JwtUtil.java` to a secure value in production
2. **Password Security** - Implement BCrypt hashing before deploying
3. **CORS** - Restrict origins to your frontend URL in production
4. **Token Expiry** - Currently set to 24 hours (86400000 ms)
