import { useState, useEffect } from 'react'

const Filter = ({ setFilteredPersons, persons }) => {
    const [searchName, setSearchName] = useState('')

    useEffect(() => {
      filterPersons(searchName)
    }, [persons])

    const handleSearchNameChange = (event) => {
        const newSearchName = event.target.value
        setSearchName(newSearchName)
        filterPersons(newSearchName)
    }

    const filterPersons = (newSearchName) => {
        setFilteredPersons(persons.filter(x => x.name.toLowerCase().includes(newSearchName.toLowerCase())))
    }

    return <form>
        <div>
            filter shown with: <input value={searchName} onChange={handleSearchNameChange} />
        </div>
    </form>
}

export default Filter