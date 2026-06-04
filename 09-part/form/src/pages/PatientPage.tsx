import { useEffect, useState } from 'react';
import AddEntryForm from '../components/AddEntryForm';
import EntryDetails from '../components/EntryDetails';
import patientService from '../services/patientService';
import type { Patient } from '../type/index';

const PatientPage = () => {
  const [patient, setPatient] =
    useState<Patient | null>(null);

  useEffect(() => {
    patientService
      .getPatient('1')
      .then(setPatient)
      .catch(console.error);
  }, []);

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h1>{patient.name}</h1>

      <p>
        {patient.gender} - {patient.occupation}
      </p>

      <AddEntryForm />

      <h3>Entries</h3>

      {patient.entries.map(entry => (
        <EntryDetails
          key={entry.id}
          entry={entry}
        />
      ))}
    </div>
  );
};

export default PatientPage;