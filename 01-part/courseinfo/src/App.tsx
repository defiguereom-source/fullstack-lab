import Header from './components/Header.js'
import Content from './components/Content.js'
import Total from './components/Total.js'

import { course, part1, exercises1, part2, exercises2, part3, exercises3 } from './database/datos.ts'

function App() {
  return (
    <div>
      <h1><Header course={course} /></h1>

      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    
    </div>
  )
}

export default App
