export const studentData = {
  name: 'Developer X',
  attendancePercentage: 88,
  problemsSolved: 42,
  totalClasses: 12,
  upcomingClasses: [
    {
      id: 1,
      subject: 'Data Structures & Algorithms',
      time: '10:00 AM Today',
      instructor: 'Dr. Smith',
      room: 'Virtual Room A',
      meetLink: 'https://meet.google.com/',
    },
    {
      id: 2,
      subject: 'Database Management',
      time: '01:30 PM Today',
      instructor: 'Prof. Johnson',
      room: 'Lab 2',
    },
    {
      id: 3,
      subject: 'Computer Networks',
      time: '09:00 AM Tomorrow',
      instructor: 'Dr. Alan',
      room: 'Virtual Room B',
      meetLink: 'https://meet.google.com/',
    },
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
    {
      id: 101,
      day: 'Monday',
      subject: 'Data Structures & Algorithms',
      time: '10:00 AM - 11:30 AM',
      type: 'Lecture',
      room: 'Virtual Room A',
      instructor: 'Dr. Smith',
      meetLink: 'https://meet.google.com/',
    },
    {
      id: 102,
      day: 'Monday',
      subject: 'C++ Programming Lab',
      time: '01:00 PM - 03:00 PM',
      type: 'Practical',
      room: 'Coding Zone',
      instructor: 'Ms. Priya',
    },
    {
      id: 103,
      day: 'Tuesday',
      subject: 'Database Management',
      time: '09:00 AM - 10:30 AM',
      type: 'Lecture',
      room: 'Virtual Room B',
      instructor: 'Prof. Johnson',
      meetLink: 'https://meet.google.com/',
    },
    {
      id: 104,
      day: 'Wednesday',
      subject: 'Computer Networks',
      time: '11:00 AM - 12:30 PM',
      type: 'Lecture',
      room: 'Room 204',
      instructor: 'Dr. Alan',
    },
  ],
  attendanceHistory: [
    { id: 201, date: '2026-03-20', className: 'Data Structures', status: 'PRESENT' },
    { id: 202, date: '2026-03-19', className: 'Computer Networks', status: 'ABSENT' },
    { id: 203, date: '2026-03-18', className: 'Database Management', status: 'PRESENT' },
    { id: 204, date: '2026-03-17', className: 'C++ Programming Lab', status: 'PRESENT' },
  ],
};

export const codingChallenges = [
  {
    id: 'cp-01',
    title: 'Two Sum Variants',
    difficulty: 'Easy',
    tags: ['Arrays', 'Hashing'],
    status: 'Solved',
  },
  {
    id: 'cp-02',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    tags: ['Sorting', 'Intervals'],
    status: 'In Progress',
  },
  {
    id: 'cp-03',
    title: 'LRU Cache',
    difficulty: 'Hard',
    tags: ['Design', 'Hash Map'],
    status: 'Queued',
  },
];

export const teacherData = {
  totalStudents: 126,
  activeClassrooms: 4,
  todaySchedule: [
    {
      id: 501,
      subject: 'Database Systems',
      time: '09:00 AM - 10:30 AM',
      day: 'Today',
      room: 'Room 301',
      type: 'Lecture',
    },
    {
      id: 502,
      subject: 'Operating Systems Lab',
      time: '01:00 PM - 02:30 PM',
      day: 'Today',
      room: 'Lab 1',
      type: 'Lab',
    },
  ],
  classrooms: [
    {
      id: 'cls-1',
      name: 'Database Systems',
      batch: 'CSE 3A',
      students: 32,
      nextSession: 'Today, 09:00 AM',
    },
    {
      id: 'cls-2',
      name: 'Operating Systems Lab',
      batch: 'CSE 3B',
      students: 28,
      nextSession: 'Today, 01:00 PM',
    },
    {
      id: 'cls-3',
      name: 'System Design',
      batch: 'CSE 4A',
      students: 22,
      nextSession: 'Tomorrow, 11:00 AM',
    },
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Week 6 Assignment',
      course: 'Database Systems',
      dueDate: '2026-04-05',
      submissions: 24,
      totalStudents: 32,
      status: 'Open',
    },
    {
      id: 'task-2',
      title: 'Lab Sheet 4',
      course: 'Operating Systems Lab',
      dueDate: '2026-04-03',
      submissions: 18,
      totalStudents: 28,
      status: 'Review',
    },
  ],
  resources: [
    {
      id: 'res-1',
      title: 'Normalization Cheat Sheet',
      type: 'PDF',
      audience: 'Database Systems',
      updatedAt: '2026-04-01',
    },
    {
      id: 'res-2',
      title: 'Process Scheduling Slides',
      type: 'Slides',
      audience: 'Operating Systems Lab',
      updatedAt: '2026-03-31',
    },
  ],
};

export const buildStudentClassrooms = (scheduleItems = studentData.fullSchedule) => {
  const classroomMap = new Map();

  scheduleItems.forEach((session) => {
    const key = session.subject || 'General';
    const entry = classroomMap.get(key) ?? {
      id: key,
      subject: key,
      sessions: [],
      instructor: session.instructor || 'Faculty',
    };

    entry.sessions.push(session);
    classroomMap.set(key, entry);
  });

  return Array.from(classroomMap.values());
};
