import { useState } from 'react'
import personService from '../services/persons'

const Filter = ({ setFilteredPersons, setPersons, persons }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.findIndex(x => x.name === newName) >= 0) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        personService.create({ name: newName, number: newNumber, id: persons.length + 1})
        const newPersons = persons.concat({ name: newName, number: newNumber, id: persons.length + 1})
        setPersons(newPersons)
        setFilteredPersons(newPersons)
        setNewName('')
        setNewNumber('')
    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handlePersonChange} />
            <div>
            </div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default Filter