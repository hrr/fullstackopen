import personService from '../services/persons'

const Persons = ({ filteredPersons, setPersons, setFilteredPersons }) => {

  const handleDeletePerson = (event) => {
    const personId = event.target.value
    const conf = window.confirm(`Delete ${filteredPersons.find(p => p.id === personId).name}`)
    if (conf) {
      personService.del(personId)
      const updatedPersons = filteredPersons.filter(p => p.id !== personId)

      setPersons(updatedPersons)
      setFilteredPersons(updatedPersons)
    }
  }
  return <>
    {filteredPersons.map(x => <div key={x.id}>{x.name} {x.number}
      <button type="button" onClick={handleDeletePerson} value={x.id}>delete</button>
    </div>)}
  </>
}

export default Persons