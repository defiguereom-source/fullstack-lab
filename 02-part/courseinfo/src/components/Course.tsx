type CourseProps = {
    id: number
    name: string
    exercises: number
    parts: Array<{
        name: string
        exercises: number
    }>
}

function Course(props:CourseProps) {
    
    return(
        <div>
            <h1>{props.name}</h1>
            <p>Number of exercises {props.exercises}</p>
        </div>
    )

}

export default Course 