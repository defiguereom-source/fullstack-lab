import type { UnknownAction } from '@reduxjs/toolkit'

export interface Anecdote {
  id: string
  content: string
  votes: number
}

const getId = (): string => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote: string): Anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0,
})

const initialState: Anecdote[] = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place.',
].map(asObject)

export const VOTE = 'VOTE'
export const ADD_ANECDOTE = 'ADD_ANECDOTE'

export const voteAnecdote = (id: string) => ({
  type: VOTE as typeof VOTE,
  payload: { id },
})

export const addAnecdote = (content: string) => ({
  type: ADD_ANECDOTE as typeof ADD_ANECDOTE,
  payload: { content, id: getId() },
})

const anecdoteReducer = (
  state: Anecdote[] = initialState,
  action: UnknownAction
): Anecdote[] => {
  switch (action.type) {
    case VOTE:
      return state.map((anecdote) =>
        anecdote.id === (action.payload as { id: string }).id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    case ADD_ANECDOTE: {
      const { content, id } = action.payload as { content: string; id: string }
      return [...state, { content, id, votes: 0 }]
    }
    default:
      return state
  }
}

export default anecdoteReducer