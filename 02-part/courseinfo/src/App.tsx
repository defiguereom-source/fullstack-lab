import Course from './components/Course'
import data from './database/data'

function App() {
  const total = data.reduce((sum, course)=> sum + course.exercises, 0)
  return (
    <>
     {data.map((course, index)=> <Course key={index} id={index} name={course.name} exercises={course.exercises} parts={course.parts}/>)}
    
      <h3>total : {total}</h3>
    
    </>
  )
}

export default App
