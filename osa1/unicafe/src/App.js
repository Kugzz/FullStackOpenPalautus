import { useState } from 'react'

//jatka 1.11

const Button = ({handler, text}) => (<button onClick={handler}>{text}</button>)

const StatisticLine = ({text, value, sign=""}) => (
  <tr>
    <td>{text}</td>
    <td>{value} {sign}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0){
    return(
      <h2>No feedback given</h2>
    )
  }

  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={(good - bad)/(good + neutral + bad)}/>
          <StatisticLine text="positive" value={(good/(good + neutral + bad))} sign='%'/>
        </tbody>
      </table>
    </div>
)}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button handler={handleGood} text="good"/>
      <Button handler={handleNeutral} text="neutral"/>
      <Button handler={handleBad} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App