-- Seed data for Course Platform
-- Passwords are hashed with bcryptjs (password123)

INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin User', 'admin@example.com', '$2a$10$nj7iWUvJ2u.AgQzFOc6mFuiMg.6PPcc4Veg4GMNrtJLRufySKFD1u', 'admin'),
  ('John Student', 'student1@example.com', '$2a$10$V7Sy.pRzoCkTBNPZTleCCeWDpIJJ9kD8Un7CUgwTCeFGvXFw7mYUW', 'student'),
  ('Jane Student', 'student2@example.com', '$2a$10$M2aglRffY2cekc5iM1xBmOQau/rfWzusKng4GF/rdOyQkdRZki6Sq', 'student');

INSERT INTO courses (title, description, instructor_id) VALUES
  ('Google Cybersecurity Professional Certificate', 'Prepare for a career in cybersecurity. Learn how to identify risks, threats, and vulnerabilities.', 1),
  ('Deep Learning Specialization', 'Master Deep Learning, and break into AI. Design and build deep neural networks.', 1),
  ('IBM Data Science Professional Certificate', 'Get started in the high-growth field of data science with professional tools from IBM.', 1),
  ('Meta Front-End Developer', 'Launch your career as a front-end developer. Build a portfolio of web applications.', 1),
  ('AWS Cloud Solutions Architect', 'Learn to design scalable, fault-tolerant, and reliable systems on Amazon Web Services.', 1),
  ('Python for Everybody Specialization', 'Learn to program and analyze data with Python. Master fundamental programming concepts.', 1),
  ('Financial Markets by Yale University', 'An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise.', 1),
  ('Machine Learning by Stanford University', 'Learn the foundation of Machine Learning and how to apply these techniques to real-world problems.', 1),
  ('The Science of Well-Being', 'Engage in a series of challenges designed to increase your own happiness and build more productive habits.', 1),
  ('Bitcoin and Cryptocurrency Technologies', 'To really understand what is special about Bitcoin, we need to understand how it works at a technical level.', 1),
  ('Introduction to Psychology', 'Learn about the most interesting experiments in the field of psychology and how they apply to everyday life.', 1),
  ('Supply Chain Management Specialization', 'Master the flow of goods, services, and information from origin to consumer.', 1),
  ('Google Data Analytics Certificate', 'Gain an immersive understanding of the practices and processes used by a junior or associate data analyst.', 1),
  ('Project Management Professional (PMP)', 'Master the art of leading teams and managing complex projects effectively.', 1),
  ('Excel Skills for Business', 'Develop professional Excel skills to solve complex business problems and increase productivity.', 1),
  ('Digital Marketing Specialization', 'Explore several aspects of the new digital marketing environment, including topics such as digital marketing analytics.', 1),
  ('Graphic Design Specialization', 'Equip yourself with the fundamental skills needed to be a graphic designer.', 1),
  ('Full Stack Web Development with React', 'Master the entire web development stack using React, Node.js, and Express.', 1),
  ('Cloud Computing Specialization', 'Learn about cloud architecture, services, and implementation strategies.', 1),
  ('Blockchain Revolution', 'Understand how blockchain technology is transforming industries and creating new economic opportunities.', 1),
  ('Artificial Intelligence in Practice', 'Explore how AI is being used in various industries to drive innovation and efficiency.', 1),
  ('Modern Robotics: Mechanics, Planning, and Control', 'Learn the fundamentals of robot mechanics and how to program autonomous systems.', 1),
  ('Negotiation Skills: Master Your Craft', 'Learn the essential techniques to negotiate effectively in any business or personal situation.', 1);

INSERT INTO lessons (course_id, title, video_url, order_number) VALUES
  (1, 'Cybersecurity Fundamentals', 'https://www.youtube.com/embed/Z5Ez05-2D2U', 1),
  (1, 'Identifying Threats', 'https://www.youtube.com/embed/L13Abt936pE', 2),
  (2, 'Neural Networks Overview', 'https://www.youtube.com/embed/aircAruvnKk', 1),
  (2, 'Backpropagation Explained', 'https://www.youtube.com/embed/Ilg3gGewQ5U', 2),
  (3, 'Introduction to Data Science', 'https://www.youtube.com/embed/X3paOmcrTjQ', 1),
  (4, 'React Hooks in Depth', 'https://www.youtube.com/embed/TNhaISOUy6Q', 1),
  (5, 'S3 and EC2 Architecting', 'https://www.youtube.com/embed/ji_pYQ6k09s', 1),
  (6, 'Programming for Everybody', 'https://www.youtube.com/embed/8DvywoWv6fI', 1),
  (7, 'Global Financial Markets', 'https://www.youtube.com/embed/v8vS8L02B-o', 1),
  (8, 'Supervised Learning', 'https://www.youtube.com/embed/KNAWp2Sbc94', 1),
  (9, 'Happiness Research', 'https://www.youtube.com/embed/7X8mN_y5y5I', 1),
  (10, 'Technical Bitcoin', 'https://www.youtube.com/embed/bBC-nXj3Ng4', 1);

INSERT INTO enrollments (user_id, course_id) VALUES
  (2, 1), (2, 2), (3, 1), (3, 2);

INSERT INTO progress (user_id, lesson_id, completed_at) VALUES
  (2, 1, CURRENT_TIMESTAMP),
  (2, 2, CURRENT_TIMESTAMP),
  (2, 4, CURRENT_TIMESTAMP),
  (3, 1, CURRENT_TIMESTAMP),
  (3, 4, CURRENT_TIMESTAMP);
