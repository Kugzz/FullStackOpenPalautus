const Header = (props) => {
    return(
        <>
        <h1>{props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return(
        <>
        <p>
            {props.name} {props.exercises}
        </p>
        </>
    );
}

const Content = ({parts}) => {
    return(
        <>
        {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises}/>)}
        </>
    );
}

const Total = ({parts}) => (
    <>
        <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    </>
)

const Course = ({course}) => (
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

export default Course