import { useState } from 'react'
import './stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css'
import Country from './database/data.json'
function App() {
  // State to hold the list of countries and the search term
  const [countries, setCountries] = useState(Country.Country)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Function to handle search
  const handleSearch = () => {
    const filteredCountries = Country.Country.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setCountries(filteredCountries)
  }

  return (
    <div className="container mt-4">
      <h1>Countries</h1>
      
      <input type="text" placeholder="Search countries..." className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      
      <button className="btn btn-primary mt-2" onClick={handleSearch}>
        Search
      </button>

      <p className="mt-4">Showing {countries.length} countries</p>

      {/* Display the list of countries */}
      <div className="row">
        {countries.map((country, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{country.name}</h5>
                <p className="card-text">Capital: {country.capital}</p>
                <p className="card-text">Population: {country.population}</p>
                <p className="card-text">Area: {country.area} km²</p>
                <img src={country.flag} alt={`${country.name} flag`} className="card-img-top" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
