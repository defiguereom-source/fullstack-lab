import { Router, Request, Response } from 'express';
import data from '../database/data.json';
import type { Diagnosis } from '../types/type';

const router = Router();

// GET /api/diagnoses
router.get('/', (_req: Request, res: Response) => {
  res.json(data.diagnoses as Diagnosis[]);
});

export default router;