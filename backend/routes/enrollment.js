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

export default router;
