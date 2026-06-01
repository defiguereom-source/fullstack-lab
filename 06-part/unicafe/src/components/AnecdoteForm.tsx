import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import type { AppDispatch } from '../store/store'
import '../stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css'

const AnecdoteForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const content = (form.elements.namedItem('anecdote') as HTMLInputElement).value.trim()
    if (!content) return
    dispatch(addAnecdote(content))
    form.reset()
  }

  return (
    <div className="container mt-5">
      <h4 className="mb-3">Create new anecdote</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            name="anecdote"
            type="text"
            className="form-control"
            placeholder="write your anecdote here..."
          />
          <button type="submit" className="btn btn-primary">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm