import React from 'react'
import { FormGroup } from 'react-bootstrap'

const SearchBar = ({onChange}) => {
  return (
    <FormGroup>
        <input type="text" className="form-control" placeholder="Rechercher" onChange={onChange}  />
    </FormGroup>
  )
}

export default SearchBar