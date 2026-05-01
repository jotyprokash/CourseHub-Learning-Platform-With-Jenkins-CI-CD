-- Seed data for Course Platform
-- Passwords are hashed with bcryptjs (password123)

INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin User', 'admin@example.com', '$2a$10$nj7iWUvJ2u.AgQzFOc6mFuiMg.6PPcc4Veg4GMNrtJLRufySKFD1u', 'admin'),
  ('John Student', 'student1@example.com', '$2a$10$V7Sy.pRzoCkTBNPZTleCCeWDpIJJ9kD8Un7CUgwTCeFGvXFw7mYUW', 'student'),
  ('Jane Student', 'student2@example.com', '$2a$10$M2aglRffY2cekc5iM1xBmOQau/rfWzusKng4GF/rdOyQkdRZki6Sq', 'student');

INSERT INTO courses (title, description, instructor_id) VALUES
  ('Web Development 101', 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.', 1),
  ('React Fundamentals', 'Master React.js and build interactive user interfaces.', 1),
  ('Python for Data Science', 'Unlock the power of Python to analyze data and build machine learning models.', 1),
  ('DevOps Engineering', 'Master CI/CD pipelines, Docker, Kubernetes, and cloud infrastructure.', 1),
  ('Cloud Architecture with AWS', 'Learn to design scalable and reliable systems on Amazon Web Services.', 1),
  ('Cybersecurity Essentials', 'Protect systems and networks from digital attacks and vulnerabilities.', 1),
  ('Google Cybersecurity Professional Certificate', 'Prepare for a career in cybersecurity. Learn how to identify risks, threats, and vulnerabilities.', 1),
  ('Deep Learning Specialization', 'Master Deep Learning, and break into AI. Design and build deep neural networks.', 1),
  ('IBM Data Science Professional Certificate', 'Get started in the high-growth field of data science with a professional certificate from IBM.', 1),
  ('Meta Front-End Developer', 'Launch your career as a front-end developer. Build a portfolio of web applications.', 1),
  ('Project Management Professional (PMP)', 'Master the art of leading teams and managing complex projects effectively.', 1);

INSERT INTO lessons (course_id, title, video_url, order_number) VALUES
  (1, 'Introduction to HTML', 'https://www.youtube.com/embed/UB3IbeUkNpE', 1),
  (1, 'CSS Styling and Layout', 'https://www.youtube.com/embed/OEV8gMkCHXQ', 2),
  (1, 'JavaScript Basics', 'https://www.youtube.com/embed/jS4aFq5-91o', 3),
  (2, 'React Components and JSX', 'https://www.youtube.com/embed/ZkzkWzWmGXc', 1),
  (2, 'Understanding React Hooks', 'https://www.youtube.com/embed/wGm-S6-zHxc', 2),
  (2, 'State Management with Redux', 'https://www.youtube.com/embed/ZLH_GAC6_P0', 3),
  (3, 'Pandas for Data Analysis', 'https://www.youtube.com/embed/dcqPhpLi78c', 1),
  (4, 'Docker for Beginners', 'https://www.youtube.com/embed/pTFZFxd4hOI', 1),
  (5, 'AWS EC2 Fundamentals', 'https://www.youtube.com/embed/8WBYGZ6y6oY', 1);

INSERT INTO enrollments (user_id, course_id) VALUES
  (2, 1), (2, 2), (3, 1), (3, 2);

INSERT INTO progress (user_id, lesson_id, completed_at) VALUES
  (2, 1, CURRENT_TIMESTAMP),
  (2, 2, CURRENT_TIMESTAMP),
  (2, 4, CURRENT_TIMESTAMP),
  (3, 1, CURRENT_TIMESTAMP),
  (3, 4, CURRENT_TIMESTAMP);
