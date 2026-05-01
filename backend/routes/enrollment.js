import express from 'express';
import pool from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/enrollment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const existing = await pool.query(
      'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    if (existing.rows.length) {
      return res.status(409).json({ error: 'Already enrolled' });
    }

    const result = await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *',
      [userId, courseId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

// GET /api/enrollment
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT c.*, u.name as instructor_name 
       FROM courses c 
       JOIN enrollments e ON c.id = e.course_id 
       JOIN users u ON c.instructor_id = u.id
       WHERE e.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

export default router;
