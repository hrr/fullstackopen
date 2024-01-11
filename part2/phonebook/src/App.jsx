import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [statusMessage, setStatusMessage] = useState({ status: 'hide' })
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const [filteredPersons, setFilteredPersons] = useState([])

  return (
    <div>
      <Notification statusMessage={statusMessage} />
      <h2>Search</h2>
      <Filter setFilteredPersons={setFilteredPersons} persons={persons} />
      <h2>Phonebook</h2>
      <PersonForm setFilteredPersons={setFilteredPersons} setPersons={setPersons} persons={persons} setStatusMessage={setStatusMessage} />
      <h2>Numbers</h2>
      <Persons setFilteredPersons={setFilteredPersons} setPersons={setPersons} filteredPersons={filteredPersons} setStatusMessage={setStatusMessage} />
    </div>
  )
}

export default App