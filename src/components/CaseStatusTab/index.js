import './index.css'

const CaseStatusTab = props => {
  const {
    tabDetails,
    countDetails,
    isSpecificState,
    onChangeActiveTab,
    activeTab,
  } = props
  const {tabId, tabDisplayText} = tabDetails
  const {confirmed, active, recovered, deceased} = countDetails

  const changeActiveTabId = () => {
    onChangeActiveTab(tabId)
  }

  const containerTestId =
    isSpecificState === true
      ? `stateSpecific${tabDisplayText}CasesContainer`
      : `countryWide${tabDisplayText}Cases`

  const pictureAltText =
    isSpecificState === true
      ? `state specific ${tabId} cases pic`
      : `country wide ${tabId} cases pic`

  let countValue
  let statusImageUrl
  let tabTextColor
  const backgroundColor = activeTab === tabId ? `${tabId}-tab-background` : ''

  switch (tabId) {
    case 'confirmed':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697180655/check-mark_1_pkiuei.png'
      countValue = confirmed
      tabTextColor = 'confirmed-tab'
      break
    case 'active':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697180696/protection_1_vxy2bc.png'
      countValue = active
      tabTextColor = 'active-tab'
      break
    case 'recovered':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697179251/recovered_1_wbfx0v.png'
      countValue = recovered
      tabTextColor = 'recovered-tab'
      break
    case 'deceased':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697179278/breathing_1_cli0qn.png'
      countValue = deceased
      tabTextColor = 'deceased-tab'
      break
    default:
      statusImageUrl = null
  }

  return (
    <li data-testid={containerTestId} className="status-tab-card">
      <button
        type="button"
        className={`status-tab-button ${tabTextColor} ${backgroundColor}`}
        onClick={changeActiveTabId}
      >
        <p className="status-tab-para">{tabDisplayText}</p>
        <img
          src={statusImageUrl}
          alt={pictureAltText}
          className="status-tab-image"
        />
        <p className="status-tab-count">{countValue}</p>
      </button>
    </li>
  )
}

export default CaseStatusTab
