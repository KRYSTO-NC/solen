import React from 'react'
import { FormGroup } from 'react-bootstrap'

const SearchBar = () => {
  return (
    <FormGroup>
        <input type="text" className="form-control" placeholder="Rechercher" />
    </FormGroup>
  )
}

export default SearchBar