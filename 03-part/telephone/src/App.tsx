import { useEffect, useState } from 'react'
import axios from 'axios'
import './stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css'

type Person = {
  id: number
  name: string
  number: string
}

function App() {
  const [people, setPeople] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // GET DATA FROM BACKEND
  useEffect(() => {
    axios.get<Person[]>('http://localhost:3001/api/persons')
      .then(response => {
        setPeople(response.data)
      })
  }, [])

  // ADD PERSON
  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    axios.post<Person>('http://localhost:3001/api/persons', newPerson)
      .then(response => {
        setPeople(prev => prev.concat(response.data))
      })

    setNewName('')
    setNewNumber('')
  }

  // DELETE PERSON
  const deletePerson = (id: number) => {
    axios.delete(`http://localhost:3001/api/persons/${id}`)

    setPeople(prev => prev.filter(person => person.id !== id))
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">

        <h2 className="mb-4 text-center">Telephone</h2>

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
              type="text"
              className="form-control"
              placeholder="Number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>

          <div className="col-md-auto">
            <button className="btn btn-primary" onClick={addPerson}>
              Add
            </button>
          </div>
        </div>

        <ul className="list-group">
          {people.map((person) => (
            <li
              key={person.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{person.name}</strong> - {person.number}
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deletePerson(person.id)}
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