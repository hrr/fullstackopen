const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({ course }) => {
    return (
        <>
            {course.parts.map(p => <Part key={p.id} part={p} />)}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Course = ({ course }) => {
    const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0)
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <b>Number of exercises {total}</b>
        </div>
    )
}

export default Course