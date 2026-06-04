import axios from 'axios';
import type { Patient, NewEntry, Entry } from '../type/index';

const BASE_URL = 'http://localhost:3001/api/patients';

// GET /api/patients
const getPatients = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(BASE_URL);
  return data;
};

// GET /api/patients/:id  ← esto es lo que PatientPage necesita
const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${BASE_URL}/${id}`);
  return data;
};

// POST /api/patients/:id/entries
const addEntry = async (patientId: string, entry: NewEntry): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${BASE_URL}/${patientId}/entries`,
    entry
  );
  return data;
};

export default { getPatients, getPatient, addEntry };