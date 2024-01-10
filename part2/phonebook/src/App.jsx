import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  return (
    <div>
      <h2>Search</h2>
      <Filter setFilteredPersons={setFilteredPersons} persons={persons} />
      <h2>Phonebook</h2>
      <PersonForm setFilteredPersons={setFilteredPersons} setPersons={setPersons} persons={persons} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App