import personService from '../services/persons'

const Persons = ({ filteredPersons, setPersons, setFilteredPersons, setStatusMessage }) => {

  const handleDeletePerson = (event) => {
    const personId = event.target.value
    const personName = filteredPersons.find(p => p.id === personId).name
    const conf = window.confirm(`Delete ${personName}`)
    if (conf) {
      personService.del(personId).catch(err => {
        setStatusMessage({ status: false, message: `Information of ${personName} has already been removed from server` })
        setTimeout(() => {
          setStatusMessage({status: 'hide'})
        }, 5000)
      })
      const updatedPersons = filteredPersons.filter(p => p.id !== personId)
      setStatusMessage({ status: 'success', message: `Deleted ${personName}` })
      setTimeout(() => {
        setStatusMessage({status: 'hide'})
      }, 5000)

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