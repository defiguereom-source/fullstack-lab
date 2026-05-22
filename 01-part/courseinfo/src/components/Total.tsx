type TotalProps = {
    exercises1: number,
    exercises2: number,
    exercises3: number
}

function Total(props: TotalProps){{
    return(
        <p>
            Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
        </p>
    )
}}

export default Total