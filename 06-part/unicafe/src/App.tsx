import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import './stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App