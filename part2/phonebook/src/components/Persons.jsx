import { useState } from 'react'

const Persons = ({ filteredPersons }) => {
    return <>
      {filteredPersons.map(x => <div key={x.id}>{x.name} {x.number}</div>)}
    </>
}

export default Persons