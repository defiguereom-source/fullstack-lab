type HeaderProps = {
    course: string
}

function Header(props: HeaderProps){{
    console.log(props)
    return(
        <header>
            <h4>{props.course}</h4>
        </header>
    )
}}

export default Header