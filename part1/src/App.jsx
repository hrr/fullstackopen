const App = () => {
  const course = 'Half Stack application development'
  const parts = [{ name: 'part1', title: 'Fundamentals of React', exercise: 10 },
                { name: 'part2', title: 'Using props to pass data', exercise: 7 },
                { name: 'part3', title: 'State of a component', exercise: 14 }]
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part='part1' />
        <Part part='part2' />
        <Part part='part3' />
      </div>
    )
  }

  const Part = (props) => {
    const part = parts.find(x => x.name === props.part)
    return (
      <div>
        <p>
          {part.title} {part.exercise}
        </p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content />
      <p>Number of exercises {parts.length}</p>
    </div>
  )
}

export default App