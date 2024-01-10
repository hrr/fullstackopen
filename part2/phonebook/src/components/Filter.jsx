import { useState } from 'react'

const Filter = ({ setFilteredPersons, persons }) => {
    const [searchName, setSearchName] = useState('')

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value)
        setFilteredPersons(persons.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    return <form>
        <div>
            filter shown with: <input value={searchName} onChange={handleSearchNameChange} />
        </div>
    </form>
}

export default Filter