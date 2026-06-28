-- ==============================================================================
-- College ERP System - Sample Seed Data (Production 10/10 Architecture)
-- ==============================================================================

-- 1. Campuses
INSERT INTO campuses (campus_name, campus_code, address) VALUES 
('Main Campus', 'MAIN', '123 University Drive, Tech City'),
('North Campus', 'NORTH', '456 Science Park, Tech City');

-- 2. Departments
WITH c_main AS (SELECT id FROM campuses WHERE campus_code = 'MAIN' LIMIT 1),
     c_north AS (SELECT id FROM campuses WHERE campus_code = 'NORTH' LIMIT 1)
INSERT INTO departments (campus_id, department_name, department_code) VALUES 
((SELECT id FROM c_main), 'Computer Science and Engineering', 'CSE'),
((SELECT id FROM c_main), 'Electronics and Communication Engineering', 'ECE'),
((SELECT id FROM c_north), 'Mechanical Engineering', 'ME');

-- 3. Semesters
INSERT INTO semesters (semester_number, academic_year) VALUES 
(1, '2023-2024'), (2, '2023-2024'), (6, '2023-2024');

-- 4. 1 Admin User
INSERT INTO users (campus_id, name, email, password_hash, role) VALUES 
((SELECT id FROM campuses WHERE campus_code = 'MAIN' LIMIT 1), 'System Admin', 'admin@college.edu', 'hashedpassword123', 'ADMIN');

-- 5. 5 Faculty Users & Records
WITH inserted_users AS (
    INSERT INTO users (campus_id, name, email, password_hash, role)
    SELECT (SELECT id FROM campuses WHERE campus_code = 'MAIN' LIMIT 1), 'Faculty ' || g.i, 'faculty' || g.i || '@college.edu', 'hashedpassword', 'FACULTY'
    FROM generate_series(1, 5) AS g(i)
    RETURNING id, name
),
numbered_users AS (
    SELECT id, row_number() OVER() as rn FROM inserted_users
)
INSERT INTO faculty (user_id, faculty_code, department_id, designation, salary, joining_date, phone)
SELECT 
    nu.id, 
    'FAC' || lpad(nu.rn::text, 3, '0'), 
    (SELECT id FROM departments WHERE department_code = CASE WHEN nu.rn % 3 = 1 THEN 'CSE' WHEN nu.rn % 3 = 2 THEN 'ECE' ELSE 'ME' END),
    'Assistant Professor',
    75000.00 + (random() * 15000),
    CURRENT_DATE - (nu.rn * 100 || ' days')::interval,
    '98765432' || lpad(nu.rn::text, 2, '0')
FROM numbered_users nu;

-- 6. 20 Student Users & Records
WITH inserted_users AS (
    INSERT INTO users (campus_id, name, email, password_hash, role)
    SELECT (SELECT id FROM campuses WHERE campus_code = 'MAIN' LIMIT 1), 'Student ' || g.i, 'student' || g.i || '@college.edu', 'hashedpassword', 'STUDENT'
    FROM generate_series(1, 20) AS g(i)
    RETURNING id, name
),
numbered_users AS (
    SELECT id, row_number() OVER() as rn FROM inserted_users
)
INSERT INTO students (user_id, roll_no, department_id, semester_id, dob, admission_date, phone, address)
SELECT 
    nu.id, 
    'R23' || lpad(nu.rn::text, 4, '0'), 
    (SELECT id FROM departments WHERE department_code = CASE WHEN nu.rn % 3 = 1 THEN 'CSE' WHEN nu.rn % 3 = 2 THEN 'ECE' ELSE 'ME' END),
    (SELECT id FROM semesters WHERE semester_number = CASE WHEN nu.rn % 2 = 0 THEN 1 ELSE 2 END LIMIT 1),
    '2003-01-01'::date + (nu.rn || ' days')::interval,
    '2023-08-01'::date,
    '87654321' || lpad(nu.rn::text, 2, '0'),
    'Campus Hostel Block ' || (nu.rn % 5 + 1)
FROM numbered_users nu;

-- 7. Parent Guardian Details
WITH student_list AS (SELECT id, row_number() OVER() as rn FROM students)
INSERT INTO parent_guardian_details (student_id, father_name, mother_name, primary_phone, emergency_contact)
SELECT 
    sl.id,
    'Father of ' || sl.rn,
    'Mother of ' || sl.rn,
    '77777777' || lpad(sl.rn::text, 2, '0'),
    '66666666' || lpad(sl.rn::text, 2, '0')
FROM student_list sl;

-- 8. 10 Courses
WITH dept_list AS (SELECT id, department_code FROM departments LIMIT 1)
INSERT INTO courses (course_name, course_code, department_id, course_type, duration_years, total_credits_required)
SELECT 
    'B.Tech ' || g.i, 
    'BT' || (100 + g.i), 
    (SELECT id FROM departments WHERE department_code = 'CSE' LIMIT 1),
    'UG',
    4,
    160
FROM generate_series(1, 5) AS g(i);

-- 9. Subjects
WITH params AS (
    SELECT 
        (SELECT id FROM departments WHERE department_code = 'CSE' LIMIT 1) as d_id,
        (SELECT id FROM courses LIMIT 1) as c_id,
        (SELECT id FROM semesters WHERE semester_number = 1 LIMIT 1) as s_id
),
fac_list AS (SELECT id, row_number() OVER() as rn FROM faculty)
INSERT INTO subjects (subject_name, subject_code, department_id, course_id, faculty_id, semester_id, credits)
SELECT 
    sub.name, sub.code, p.d_id, p.c_id, (SELECT id FROM fac_list WHERE rn = (sub.rn % 5) + 1), p.s_id, 3
FROM (
    SELECT name, code, row_number() OVER() as rn FROM (
        VALUES 
            ('Database Management Systems', 'DBMS101'), ('Operating Systems', 'OS101'), 
            ('Artificial Intelligence', 'AI101'), ('Machine Learning', 'ML101'), 
            ('Computer Networks', 'CN101'), ('Data Structures', 'DS101'), 
            ('Design and Analysis of Algorithms', 'DAA101'), ('Software Engineering', 'SE101'), 
            ('Compiler Design', 'CD101'), ('Computer Architecture', 'CA101')
    ) AS s(name, code)
) AS sub
CROSS JOIN params p;

-- 10. Enrollments & Subject Enrollments
INSERT INTO enrollments (student_id, course_id)
SELECT s.id, (SELECT id FROM courses LIMIT 1)
FROM students s;

INSERT INTO subject_enrollments (student_id, subject_id)
SELECT s.id, sub.id
FROM students s
JOIN LATERAL (
    SELECT id FROM subjects ORDER BY random() LIMIT 3
) sub ON true;

-- 11. Attendance (Subject-wise)
INSERT INTO attendance (student_id, subject_id, attendance_date, status)
SELECT 
    se.student_id, 
    se.subject_id, 
    CURRENT_DATE - (g.i || ' days')::interval, 
    (CASE WHEN random() > 0.15 THEN 'PRESENT'::attendance_status ELSE 'ABSENT'::attendance_status END)
FROM subject_enrollments se
CROSS JOIN generate_series(1, 5) AS g(i);

-- 12. Assignments & Submissions
WITH sub_list AS (SELECT id, row_number() OVER() as rn FROM subjects)
INSERT INTO assignments (subject_id, title, description, due_date)
SELECT 
    (SELECT id FROM sub_list WHERE rn = g.i LIMIT 1),
    'Assignment ' || g.i,
    'Description for assignment ' || g.i,
    CURRENT_DATE + (g.i || ' days')::interval
FROM generate_series(1, 5) AS g(i);

INSERT INTO assignment_submissions (student_id, assignment_id, file_url, marks_obtained)
SELECT 
    se.student_id, 
    a.id, 
    'https://s3.bucket/assignments/' || se.student_id || '_' || a.id || '.pdf',
    floor(random() * 20) + 5
FROM subject_enrollments se
JOIN assignments a ON a.subject_id = se.subject_id;

-- 13. Exams & Exam Results
WITH sub_list AS (SELECT id, row_number() OVER() as rn FROM subjects)
INSERT INTO exams (subject_id, exam_type, exam_date, max_marks)
SELECT 
    (SELECT id FROM sub_list WHERE rn = g.i LIMIT 1),
    (ARRAY['Mid Sem', 'End Sem', 'Quiz'])[g.i % 3 + 1],
    CURRENT_DATE + (g.i * 10 || ' days')::interval,
    100
FROM generate_series(1, 5) AS g(i);

INSERT INTO exam_results (student_id, subject_id, exam_id, marks_obtained, grade)
SELECT 
    se.student_id, 
    se.subject_id, 
    e.id, 
    floor(random() * 80) + 20,
    'A'
FROM subject_enrollments se
JOIN exams e ON e.subject_id = se.subject_id;

-- 14. Timetable (Subject-wise)
WITH schedule_data AS (
    SELECT 
        sub.id AS subject_id, 
        sub.faculty_id,
        (ARRAY['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'])[floor(random() * 5) + 1]::day_of_week AS day,
        'Room ' || (floor(random() * 10) + 101)::text AS room_no,
        ('09:00:00'::time + (floor(random() * 6) || ' hours')::interval) AS start_time
    FROM subjects sub
)
INSERT INTO timetable (subject_id, faculty_id, day, room_no, start_time, end_time)
SELECT 
    subject_id, 
    faculty_id,
    day,
    room_no,
    start_time,
    start_time + '1 hour 30 minutes'::interval
FROM schedule_data;

-- 15. Fees & Fee Transactions
WITH student_list AS (SELECT id, row_number() OVER() as rn FROM students)
INSERT INTO fees (student_id, fee_type, amount, payment_status, due_date)
SELECT 
    (SELECT id FROM student_list WHERE rn = g.i LIMIT 1),
    'Tuition Fee',
    15000.00,
    (ARRAY['PAID', 'PENDING', 'PARTIAL'])[g.i % 3 + 1],
    CURRENT_DATE + (30 || ' days')::interval
FROM generate_series(1, 10) AS g(i);

INSERT INTO fee_transactions (fee_id, transaction_reference, payment_method, amount_paid)
SELECT 
    id,
    'TXN-' || floor(random() * 1000000)::text,
    (ARRAY['Credit Card', 'Bank Transfer', 'UPI'])[floor(random() * 3) + 1],
    CASE WHEN payment_status = 'PAID' THEN amount ELSE amount / 2 END
FROM fees
WHERE payment_status IN ('PAID', 'PARTIAL');

-- 16. Leave Requests & Announcements
WITH student_list AS (SELECT id, row_number() OVER() as rn FROM students)
INSERT INTO leave_requests (student_id, reason, status)
SELECT 
    (SELECT id FROM student_list WHERE rn = (g.i % 20) + 1 LIMIT 1),
    'Medical leave for ' || g.i || ' days',
    (ARRAY['PENDING', 'APPROVED', 'REJECTED'])[g.i % 3 + 1]
FROM generate_series(1, 5) AS g(i);

INSERT INTO announcements (title, message, created_by)
SELECT 
    'Announcement ' || g.i, 'Message body for announcement ' || g.i,
    (SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1)
FROM generate_series(1, 3) AS g(i);

-- 17. Books & Issue Records
INSERT INTO books (title, author, isbn, total_copies, available_copies)
SELECT b.title, b.author, b.isbn, b.copies, b.copies
FROM (
    VALUES 
        ('Clean Code', 'Robert C. Martin', '9780132350884', 3),
        ('Design Patterns', 'Erich Gamma', '9780201633610', 4)
) AS b(title, author, isbn, copies);

WITH student_list AS (SELECT id, row_number() OVER() as rn FROM students),
     book_list AS (SELECT id, row_number() OVER() as rn FROM books)
INSERT INTO book_issue_records (student_id, book_id, issue_date, return_date)
SELECT 
    (SELECT id FROM student_list WHERE rn = g.i LIMIT 1),
    (SELECT id FROM book_list WHERE rn = g.i LIMIT 1),
    CURRENT_DATE - (g.i || ' days')::interval,
    CASE WHEN g.i % 2 = 0 THEN CURRENT_DATE + (7 || ' days')::interval ELSE NULL END
FROM generate_series(1, 2) AS g(i);
