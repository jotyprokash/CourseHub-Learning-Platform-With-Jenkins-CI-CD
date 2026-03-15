import express from 'express';
import pool from '../db.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// POST /api/lessons
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { courseId, title, videoUrl, order } = req.body;
    const result = await pool.query(
      'INSERT INTO lessons (course_id, title, video_url, order_number) VALUES ($1, $2, $3, $4) RETURNING *',
      [courseId, title, videoUrl, order]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
});

// GET /api/lessons/course/:courseId
router.get('/course/:courseId', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await pool.query(
      'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_number',
      [courseId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

export default router;
