import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchResultItem = props => {
  const {searchDetails} = props
  const {name, stateCode} = searchDetails

  return (
    <Link to={`/state/${stateCode}`} className="search-item-link">
      <li className="search-item-list">
        <p className="search-item-state-para">{name}</p>
        <button type="button" className="search-item-link-button">
          {stateCode} <BiChevronRightSquare size={15} />
        </button>
      </li>
    </Link>
  )
}

export default SearchResultItem
