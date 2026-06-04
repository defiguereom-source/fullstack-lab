export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export interface NewEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}