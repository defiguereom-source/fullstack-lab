import axios from 'axios';
import type { Diagnosis } from '../type/index';

const BASE_URL = 'http://localhost:3001/api/diagnoses';

const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(BASE_URL);
  return data;
};

export default { getDiagnoses };