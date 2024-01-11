import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country'
import CountryWrapper from './components/CountryWrapper'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [matches, setMatches] = useState(0)

  const handleSearchNameChange = (event) => {
      const newSearchName = event.target.value
      setSearchName(newSearchName)
      setMatches(countries.filter(c => c.name.common.toLowerCase().includes(newSearchName.toLowerCase())))
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {
    setMatches(countries.filter(c => c.name.common.toLowerCase().includes(searchName.toLowerCase())))    
  }, [countries])
  
  return (
    <div>
      find countries <input value={searchName} onChange={handleSearchNameChange} />
      {searchName.length > 0 && matches.length > 10 && <div>Too many matches, specify another filter</div>}
      {searchName.length > 0 && matches.length <= 10 && matches.length !== 1 && matches.map(c => <CountryWrapper key={c.name.common} country={c} /> )}
      {searchName.length > 0 && matches.length === 1 && matches.map(c => <Country key={matches[0].name.common} country={matches[0]}/>)}
    </div>
  )
}

export default App