import { Router, Request, Response } from 'express';
import data from '../database/data.json';
import type { Patient, NewEntry } from '../types/type';

const router = Router();

// GET /api/patients — list all (without entries for brevity)
router.get('/', (_req: Request, res: Response) => {
  const patients = (data.patients as Patient[]).map(
    ({ entries: _entries, ...rest }) => rest
  );
  res.json(patients);
});

// GET /api/patients/:id — full patient with entries
router.get('/:id', (req: Request, res: Response) => {
  const patient = (data.patients as Patient[]).find(
    (p) => p.id === req.params.id
  );
  if (!patient) {
    res.status(404).json({ error: 'Patient not found' });
    return;
  }
  res.json(patient);
});

// POST /api/patients/:id/entries — add an entry
router.post('/:id/entries', (req: Request, res: Response) => {
  const patient = (data.patients as Patient[]).find(
    (p) => p.id === req.params.id
  );
  if (!patient) {
    res.status(404).json({ error: 'Patient not found' });
    return;
  }

  const { description, date, specialist, diagnosisCodes } =
    req.body as NewEntry;

  if (!description || !date || !specialist) {
    res.status(400).json({ error: 'description, date and specialist are required' });
    return;
  }

  const newEntry = {
    id: `e${Date.now()}`,
    date,
    description,
    specialist,
    ...(diagnosisCodes ? { diagnosisCodes } : {})
  };

  patient.entries.push(newEntry as never);
  res.status(201).json(newEntry);
});

export default router;