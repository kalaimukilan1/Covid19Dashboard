import './index.css'

const StateTableItem = props => {
  const {stateDetails} = props
  const {
    name,
    confirmed,
    active,
    recovered,
    deceased,
    population,
  } = stateDetails
  return (
    <li className="state-item-list">
      <p className="state-item-states-and-ut-para">{name}</p>
      <p className="state-item-para confirmed-count">{confirmed}</p>
      <p className="state-item-para active-count">{active}</p>
      <p className="state-item-para recovered-count">{recovered}</p>
      <p className="state-item-para deceased-count">{deceased}</p>
      <p className="state-item-para population-count">{population}</p>
    </li>
  )
}
export default StateTableItem
