import type { Entry } from '../type/index';

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6>{entry.date}</h6>

        <p>{entry.description}</p>

        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map(code => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        )}

        <small>Specialist: {entry.specialist}</small>
      </div>
    </div>
  );
};

export default EntryDetails;    