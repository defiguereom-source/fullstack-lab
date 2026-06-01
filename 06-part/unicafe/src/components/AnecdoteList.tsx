import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import type { RootState, AppDispatch } from '../store/store'
import '../stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css'
const AnecdoteList = () => {
  const anecdotes = useSelector((state: RootState) =>
    [...state.anecdotes].sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="container mt-4">
      <div className="list-group">
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1">{anecdote.content}</p>
              <small className="text-muted">votes: <strong>{anecdote.votes}</strong></small>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => dispatch(voteAnecdote(anecdote.id))}
            >
              vote
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnecdoteList