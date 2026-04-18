# Quick Start Guide

## Prerequisites
- **Java 17+** installed
- **Maven** installed
- **MySQL 8.0+** running
- **Node.js 16+** installed
- **npm** installed

---

## ⚡ 10-Minute Setup

### Step 1: Database Setup (1 minute)
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE cops_db;
EXIT;
```

### Step 2: Start Backend (3 minutes)
```bash
cd backend/cops
mvn clean install
mvn spring-boot:run
```

✅ Backend running on: `http://localhost:8081`

### Step 3: Start Frontend (2 minutes)
```bash
cd cops-frontend
npm install
npm run dev
```

✅ Frontend running on: `http://localhost:5173`

### Step 4: Test Integration (4 minutes)

**Register a new user:**
1. Visit: `http://localhost:5173/register`
2. Fill in the form:
   - Role: Student
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
3. Click "Create Account"
4. Redirected to login page ✓

**Login:**
1. Email: john@example.com
2. Password: password123
3. Role: Student
4. Click "Sign in"
5. Redirected to dashboard ✓

**Verify Integration:**
1. Dashboard shows "Welcome back, John Doe!" ✓
2. Attendance page loads user data ✓
3. Click "Sign out" redirects to login ✓

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 8081 is in use
netstat -ano | findstr :8081

# Check MySQL connection
mysql -u root -p -e "USE cops_db; SHOW TABLES;"

# Check Java version
java -version
```

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install

# Check if port 5173 is in use
netstat -ano | findstr :5173
```

### API calls failing (CORS error)
- Ensure backend is running on port 8081
- Check browser console for exact error
- Verify `apiClient.js` has correct base URL

### Login shows "User not found"
- Make sure you registered the user first
- Check email spelling and case sensitivity
- Verify user exists in database:
  ```bash
  mysql -u root -p
  USE cops_db;
  SELECT * FROM users;
  ```

---

## 📁 Project Structure
```
crew-of-programmers/
├── backend/cops/                 # Spring Boot backend
│   ├── pom.xml
│   └── src/main/java/com/cops/
│       ├── controller/           # REST endpoints
│       ├── service/              # Business logic
│       ├── entity/               # Database models
│       ├── dto/                  # Request/response objects
│       └── security/             # JWT configuration
│
├── cops-frontend/                # React frontend
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/                  # API service layer
│       ├── context/              # Auth context
│       ├── components/           # React components
│       └── pages/                # Page components
│
└── docs/
    ├── INTEGRATION_GUIDE.md      # Detailed setup guide
    ├── INTEGRATION_SUMMARY.md    # What was integrated
    ├── API_CONTRACT.md           # API endpoint documentation
    └── QUICK_START.md            # This file
```

---

## 🔐 Key Credentials

### Database
- **Host**: localhost
- **Port**: 3306
- **Database**: cops_db
- **User**: root
- **Password**: bhvsdew@18

### Application
- **Backend Port**: 8081
- **Frontend Port**: 5173
- **JWT Secret**: cops-secret-key (change in production!)
- **Token Expiry**: 24 hours

---

## 📚 Documentation Files

1. **INTEGRATION_GUIDE.md** - Complete setup and integration guide
2. **INTEGRATION_SUMMARY.md** - Summary of all changes made
3. **API_CONTRACT.md** - Detailed API endpoint documentation
4. **QUICK_START.md** - This file

---

## 🚀 Next Steps

### After successful integration:

1. **Test all features** ✓
   - [x] Register
   - [x] Login
   - [x] View Dashboard
   - [x] Check Attendance
   - [x] Logout

2. **Customize data** 
   - Add more users to database
   - Add attendance records
   - Update dashboard statistics

3. **Implement additional features**
   - Teacher dashboard
   - Schedule management
   - Video meet integration
   - Resource upload/download

4. **Production deployment**
   - Change JWT secret
   - Implement password hashing
   - Enable HTTPS
   - Restrict CORS origins
   - Set up proper environment variables

---

## 💡 Useful Commands

### Backend
```bash
# Run tests
mvn test

# Build JAR
mvn clean package

# Check for compilation errors
mvn compile

# View all dependencies
mvn dependency:tree
```

### Frontend
```bash
# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Install specific package
npm install package-name
```

### MySQL
```bash
# Connect to database
mysql -u root -p cops_db

# View all tables
SHOW TABLES;

# View table structure
DESCRIBE users;
DESC attendance;

# Count records
SELECT COUNT(*) FROM users;

# View all data
SELECT * FROM users;
```

---

## ✅ Integration Checklist

Before considering integration complete:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] JWT token stored in localStorage
- [ ] Dashboard displays user information
- [ ] Attendance page loads attendance data
- [ ] Logout clears token and redirects to login
- [ ] No CORS errors in console
- [ ] No API errors in network tab
- [ ] Can view all menu items
- [ ] Role-based navigation works

---

## 📞 Support Resources

### Common Issues & Solutions

**Q: Port already in use**
```bash
# Kill process on port 8081
lsof -ti :8081 | xargs kill -9
```

**Q: MySQL connection refused**
```bash
# Start MySQL service
sudo service mysql start
# or on Windows
net start MySQL80
```

**Q: npm install fails**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

**Q: Node modules corrupted**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Key Integration Points

### Frontend → Backend Communication
```
Frontend (React)
    ↓
API Service Layer (Axios)
    ↓
Backend (Spring Boot)
    ↓
Database (MySQL)
```

### Authentication Flow
```
1. User registers → POST /api/users/register
2. User logs in → POST /api/users/login
3. Server returns JWT token
4. Token stored in localStorage
5. Token sent with every request (Authorization header)
6. Token expires after 24 hours
7. Auto logout on 401 error
```

---

## 🔍 Verify Installation

### Check Backend Health
```bash
curl http://localhost:8081/api/users/all
# Should return 401 Unauthorized (expected - needs token)
```

### Check Frontend
```bash
curl http://localhost:5173
# Should return HTML page
```

---

## 🎓 Learning Resources

- **Spring Boot**: https://spring.io/projects/spring-boot
- **React**: https://react.dev
- **JWT Auth**: https://jwt.io
- **MySQL**: https://dev.mysql.com/doc/
- **Axios**: https://axios-http.com/docs

---

**Status**: ✅ Ready to integrate!

For detailed information, see **INTEGRATION_GUIDE.md**
