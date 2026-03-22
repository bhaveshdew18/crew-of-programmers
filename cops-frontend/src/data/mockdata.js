export const studentData = {
  name: "Developer X",
  attendancePercentage: 88,
  problemsSolved: 42,
  upcomingClasses: [
    { id: 1, subject: "Data Structures & Algorithms", time: "10:00 AM Today", instructor: "Dr. Smith" },
    { id: 2, subject: "Database Management", time: "01:30 PM Today", instructor: "Prof. Johnson" },
    { id: 3, subject: "Computer Networks", time: "09:00 AM Tomorrow", instructor: "Dr. Alan" }
  ],
  weeklyActivity: [
    { day: 'Mon', problems: 5 },
    { day: 'Tue', problems: 8 },
    { day: 'Wed', problems: 2 },
    { day: 'Thu', problems: 12 },
    { day: 'Fri', problems: 6 },
    { day: 'Sat', problems: 15 },
    { day: 'Sun', problems: 7 },
  ],
  fullSchedule: [
    { id: 101, day: "Monday", subject: "Data Structures & Algorithms", time: "10:00 AM - 11:30 AM", type: "Lecture", room: "Virtual Room A" },
    { id: 102, day: "Monday", subject: "C++ Programming Lab", time: "01:00 PM - 03:00 PM", type: "Practical", room: "Coding Zone" },
    { id: 103, day: "Tuesday", subject: "Database Management", time: "09:00 AM - 10:30 AM", type: "Lecture", room: "Virtual Room B" },
    { id: 104, day: "Wednesday", subject: "Computer Networks", time: "11:00 AM - 12:30 PM", type: "Lecture", room: "Virtual Room A" },
  ],
  attendanceHistory: [
    { id: 201, date: "Today", subject: "Data Structures", status: "Present" },
    { id: 202, date: "Yesterday", subject: "Computer Networks", status: "Absent" },
    { id: 203, date: "Mar 19", subject: "Database Management", status: "Present" },
    { id: 204, date: "Mar 18", subject: "C++ Programming Lab", status: "Present" },
  ],
  subjectAttendance: [
    { subject: "Data Structures", attended: 22, total: 25, percentage: 88 },
    { subject: "Database Management", attended: 18, total: 20, percentage: 90 },
    { subject: "Computer Networks", attended: 15, total: 20, percentage: 75 },
    { subject: "C++ Programming Lab", attended: 10, total: 10, percentage: 100 },
  ]
};