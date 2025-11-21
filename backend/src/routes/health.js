// backend/src/routes/health.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'up' : 'down';
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    dbState
  });
});

export default router;
