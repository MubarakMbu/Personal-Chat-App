import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';

export default function Search() {
    const{searchValue, getAndSetSearchValue} = useContext(SearchContext);

    return (
        <div className='search'>
    <div className="searchForm">
        <input
          type="text"
          placeholder="Find a Friend"
          onChange={(e) => getAndSetSearchValue(e.target.value)}
          value={searchValue}
        />
    </div>
    </div>
  )
}
