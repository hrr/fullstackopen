import Weather from './Weather'

const Country = ({ country }) => {

    return <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h2>languages:</h2>
        {Object.keys(country.languages).map(key => <li key={(key)}>{country.languages[key]}</li>)}
        <div><img src={country.flags.png} /></div>
        <Weather country={country} />
    </div>
}

export default Country