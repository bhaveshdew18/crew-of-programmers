# API Contract Documentation

## Base URLs
- **Backend API**: `http://localhost:8081/api`
- **Frontend**: `http://localhost:5173`

## Request/Response Format
All requests and responses use JSON format with `Content-Type: application/json`

---

## Authentication Endpoints

### 1. Register User
**Endpoint**: `POST /api/users/register`

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"  // "STUDENT" or "TEACHER"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "User created",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT",
    "createdAt": "2024-04-02T10:30:00"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "Email already exists",
  "data": null
}
```

---

### 2. Login User
**Endpoint**: `POST /api/users/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"  // "STUDENT" or "TEACHER"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "STUDENT"
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "message": "Invalid password",
  "data": null
}
```

---

### 3. Get All Users
**Endpoint**: `GET /api/users/all`

**Headers**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT",
    "createdAt": "2024-04-02T10:30:00"
  },
  {
    "id": 2,
    "name": "Jane Teacher",
    "email": "jane@example.com",
    "role": "TEACHER",
    "createdAt": "2024-04-02T10:35:00"
  }
]
```

---

## Attendance Endpoints

### 1. Mark Attendance
**Endpoint**: `POST /api/attendance/mark`

**Headers**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "userId": 1,
  "classId": 5,
  "status": "PRESENT",  // "PRESENT" or "ABSENT"
  "date": "2024-04-02"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Attendance saved",
  "data": {
    "id": 10,
    "userId": 1,
    "classId": 5,
    "status": "PRESENT",
    "date": "2024-04-02",
    "createdAt": "2024-04-02T14:30:00"
  }
}
```

---

### 2. Get User Attendance
**Endpoint**: `GET /api/attendance/user/{userId}`

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "OK",
  "data": [
    {
      "id": 10,
      "userId": 1,
      "className": "Mathematics",
      "classId": 5,
      "status": "PRESENT",
      "date": "2024-04-02",
      "createdAt": "2024-04-02T14:30:00"
    },
    {
      "id": 11,
      "userId": 1,
      "className": "Physics",
      "classId": 6,
      "status": "ABSENT",
      "date": "2024-04-01",
      "createdAt": "2024-04-01T14:30:00"
    }
  ]
}
```

---

### 3. Get Class Attendance
**Endpoint**: `GET /api/attendance/class/{classId}`

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
[
  {
    "id": 10,
    "userId": 1,
    "userName": "John Doe",
    "status": "PRESENT",
    "date": "2024-04-02",
    "createdAt": "2024-04-02T14:30:00"
  },
  {
    "id": 12,
    "userId": 2,
    "userName": "Alice Smith",
    "status": "ABSENT",
    "date": "2024-04-02",
    "createdAt": "2024-04-02T14:30:00"
  }
]
```

---

### 4. Get Attendance by Date
**Endpoint**: `GET /api/attendance/date?date={date}`

**Headers**:
```
Authorization: Bearer {token}
```

**Query Parameters**:
- `date` (required): Date in format `YYYY-MM-DD`

**Response** (200 OK):
```json
[
  {
    "id": 10,
    "userId": 1,
    "userName": "John Doe",
    "className": "Mathematics",
    "status": "PRESENT",
    "date": "2024-04-02",
    "createdAt": "2024-04-02T14:30:00"
  },
  {
    "id": 11,
    "userId": 3,
    "userName": "Bob Wilson",
    "className": "Physics",
    "status": "PRESENT",
    "date": "2024-04-02",
    "createdAt": "2024-04-02T14:30:00"
  }
]
```

---

## Dashboard Endpoints

### 1. Get Dashboard Statistics
**Endpoint**: `GET /api/dashboard/stats`

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "attendancePercentage": 85,
    "problemsSolved": 24,
    "upcomingClasses": [
      {
        "id": 1,
        "subject": "Advanced Mathematics",
        "time": "14:00 - 15:00",
        "instructor": "Dr. Smith",
        "meetLink": "https://meet.google.com/abc-def-ghi"
      },
      {
        "id": 2,
        "subject": "Physics Lab",
        "time": "16:00 - 17:00",
        "instructor": "Prof. Johnson",
        "meetLink": "https://meet.google.com/xyz-abc-def"
      }
    ]
  }
}
```

---

## Error Responses

### 401 Unauthorized
**Triggered when**: JWT token is missing, invalid, or expired

```json
{
  "timestamp": "2024-04-02T15:30:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
**Triggered when**: User doesn't have permission for the resource

```json
{
  "timestamp": "2024-04-02T15:30:00",
  "status": 403,
  "error": "Forbidden",
  "message": "Access denied"
}
```

### 404 Not Found
**Triggered when**: Resource doesn't exist

```json
{
  "timestamp": "2024-04-02T15:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Resource not found",
  "path": "/api/users/999"
}
```

### 500 Internal Server Error
**Triggered when**: Server error occurs

```json
{
  "timestamp": "2024-04-02T15:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Data Models

### User Model
```javascript
{
  id: Number,
  name: String,
  email: String (unique),
  password: String,
  role: "STUDENT" | "TEACHER" | "ADMIN",
  createdAt: DateTime
}
```

### Attendance Model
```javascript
{
  id: Number,
  userId: Number,
  classId: Number,
  className: String,
  status: "PRESENT" | "ABSENT",
  date: Date (YYYY-MM-DD),
  createdAt: DateTime
}
```

### Role Enum
```
STUDENT
TEACHER
ADMIN
```

### ApiResponse Wrapper
```javascript
{
  success: Boolean,
  message: String,
  data: Object | Array | null
}
```

---

## JWT Token Structure

**Token Format**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE3MTIwNjEwMDB9.signature`

**Payload** (decoded):
```json
{
  "sub": "john@example.com",
  "role": "STUDENT",
  "iat": 1712061000,
  "exp": 1712147400
}
```

**Token Details**:
- **Algorithm**: HMAC256
- **Secret**: "cops-secret-key" (should be changed in production)
- **Expiration**: 24 hours (86400000 ms)

---

## Authentication Header Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, POST, PUT |
| 201 | Created | User registered successfully |
| 400 | Bad Request | Invalid data in request |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | User lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## Frontend Integration Example

### Using the API

```javascript
import { authService } from './api/authService';
import { attendanceService } from './api/attendanceService';
import { dashboardService } from './api/dashboardService';

// Register
const registerResponse = await authService.register({
  fullName: "John Doe",
  email: "john@example.com",
  password: "password123",
  role: "student"
});

// Login
const loginResponse = await authService.login("john@example.com", "password123", "student");
// Token is automatically stored in localStorage

// Get Dashboard Stats
const statsResponse = await dashboardService.getStats();
console.log(statsResponse.data.data);

// Get User Attendance
const attendanceResponse = await attendanceService.getAttendanceByUser(userId);
console.log(attendanceResponse.data.data);
```

---

## CORS Headers

**Allowed Origins**: `*` (all origins)
**Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
**Allowed Headers**: Content-Type, Authorization

*Note: In production, restrict origins to your frontend URL.*

---

## Rate Limiting (Not Currently Implemented)

**Recommendation**: Implement rate limiting on authentication endpoints to prevent brute force attacks.

```
POST /api/users/login: Max 5 requests per minute per IP
POST /api/users/register: Max 3 requests per hour per IP
```

---

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **Token Storage**: Consider using httpOnly cookies instead of localStorage
3. **Password Hashing**: Implement BCrypt for password hashing
4. **Input Validation**: Validate all inputs on both client and server
5. **SQL Injection Prevention**: Use parameterized queries (already using JPA)
6. **CSRF Protection**: Enable CSRF tokens for state-changing operations
7. **Sensitive Data**: Never log passwords or tokens
8. **API Key Rotation**: Regularly rotate JWT secret in production

---

**Last Updated**: April 2, 2024
**Version**: 1.0
