import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const StatisticLine = ({ text, value, postText }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {postText}</td>
    </tr>
  )
}

const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats
  const total = stats.total()
  if (total == 0)
    return (
      <div>
        No feedback given
      </div>
    )
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={(good - bad) / total} />
          <StatisticLine text="positive" value={(good / total) * 100} postText='%'/>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stats = { good, neutral, bad, total: () => good + neutral + bad }

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text='statistics' />
      <Statistics stats={stats} />
    </div>
  )
}

export default App