import express from 'express';
import pool from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/progress
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT p.*, l.title, l.course_id
       FROM progress p
       JOIN lessons l ON l.id = p.lesson_id
       WHERE p.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST /api/progress
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.body;
    const existing = await pool.query(
      'SELECT * FROM progress WHERE user_id = $1 AND lesson_id = $2',
      [userId, lessonId]
    );

    if (existing.rows.length) {
      return res.status(200).json(existing.rows[0]);
    }

    const result = await pool.query(
      'INSERT INTO progress (user_id, lesson_id) VALUES ($1, $2) RETURNING *',
      [userId, lessonId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

export default router;
