import { useState } from 'react'
import Country from './Country'

const CountryWrapper = ({ country }) => {
    const [showInfo, setShowInfo] = useState(false)
    const onClickShowCountry = (event) => {
        setShowInfo(!showInfo)
    }

    return <div>
        {country.name.common}
        <button onClick={onClickShowCountry} value={country.name.common}>{!showInfo ? 'show' : 'hide'}</button>
        {showInfo && <Country country={country} />}
    </div>
}

export default CountryWrapper