import { useState } from 'react'
import anecdotes from './database/data'

function App() {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const maxVotes = Math.max(...votes)
  const mostVoted = votes.indexOf(maxVotes)

  return (
    <>
    <h1>Anecdotes</h1>
    
    <p>{anecdotes[selected]}</p>
    
    <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next anecdote</button>
    <button onClick={() => {
      const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
    }}>Vote</button>
    
    <p>has {votes[selected]} votes</p>
    <h2>Anecdote with most votes</h2>
    <p>{anecdotes[mostVoted]}</p>
    </>
  )
}

export default App
