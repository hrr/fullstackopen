import { useState } from 'react'
import personService from '../services/persons'

const Filter = ({ setPersons, persons, setStatusMessage }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.findIndex(x => x.name === newName) >= 0) {
            const conf = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (conf)
                updatePerson()
            clearForm()
            return

        }
        const newPerson = { name: newName, number: newNumber }
        const resp = personService.create(newPerson).then(p => {
            console.log(p);
            const newPersons = persons.concat(p)
            setPersons(newPersons)
            setTimeout(() => {
              setStatusMessage({status: 'hide'})
            }, 5000)  
            setStatusMessage({ status: 'success', message: `Added ${newName}`})
            clearForm()
        })
    }

    const updatePerson = () => {
        const person = persons.find(x => x.name === newName)
        person.number = newNumber
        personService.update(person.id, person)
        const newPersons = persons.filter(p => p.id !== person.id).concat(person)
        setTimeout(() => {
          setStatusMessage({status: 'hide'})
        }, 5000)
  
        setStatusMessage({ status: 'success', message: `Updated ${newName}`})
        setPersons(newPersons)
    }

    const clearForm = () => {
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