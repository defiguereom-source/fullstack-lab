import { useState } from 'react'
import People from './database/data.json'
import './stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css'

function App() {
  const [people, setPeople] = useState(People.people)
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = () => {
    const newPerson = {
      name: newName,
      age: parseInt(newAge),
      number: newNumber,
    }

    setPeople([...people, newPerson])

    setNewName('')
    setNewAge('')
    setNewNumber('')
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        
        <h2 className="mb-4 text-center">People</h2>

        <div className="row g-2 mb-3">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className="col-md">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
          </div>

          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>

          <div className="col-md-auto">
            <button
              className="btn btn-primary"
              onClick={addPerson}
            >
              Add
            </button>
          </div>
        </div>

        <ul className="list-group">
          {people.map((person, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{person.name}</strong> - {person.age} years - {person.number}
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  setPeople(people.filter((_, i) => i !== index))
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default App