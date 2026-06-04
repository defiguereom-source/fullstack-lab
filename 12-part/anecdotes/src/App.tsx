import { useState } from 'react'
import { useField } from './hooks'
import anecdotes from './database/data'

function App() {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [anecdoteList, setAnecdoteList] = useState(anecdotes)

  const { inputProps: contentProps, reset: resetContent } = useField('text')

  const maxVotes = Math.max(...votes)
  const mostVoted = votes.indexOf(maxVotes)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!contentProps.value.trim()) return
    setAnecdoteList([...anecdoteList, contentProps.value])
    setVotes([...votes, 0])
    resetContent()
  }

  return (
    <>
      <h1>Anecdotes</h1>

      <p>{anecdoteList[selected]}</p>

      <button onClick={() => setSelected(Math.floor(Math.random() * anecdoteList.length))}>
        Next anecdote
      </button>
      <button onClick={() => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
      }}>
        Vote
      </button>

      <p>has {votes[selected]} votes</p>

      <h2>Anecdote with most votes</h2>
      <p>{anecdoteList[mostVoted]}</p>

      <h2>Add anecdote</h2>
      <form onSubmit={handleSubmit}>
        <input {...contentProps} placeholder="Write anecdote here" />
        <button type="submit">Add</button>
        <button type="button" onClick={resetContent}>Reset</button>
      </form>
    </>
  )
}

export default App