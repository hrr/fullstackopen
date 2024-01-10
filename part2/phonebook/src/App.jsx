import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex(x => x.name === newName) >= 0)
    {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName, phone: newPhone}))
    setNewName('')
    setNewPhone('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        <div>
        </div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x => <div>{x.name} {x.phone}</div>)}
    </div>
  )
}

export default App