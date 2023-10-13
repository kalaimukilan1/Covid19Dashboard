import './index.css'

const CaseStatusTab = props => {
  const {tabDetails, countDetails} = props
  const {tabId, tabDisplayText} = tabDetails
  console.log(countDetails.tabId)
  let statusImageUrl

  switch (tabId) {
    case 'confirmed':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697180655/check-mark_1_pkiuei.png'
      break
    case 'active':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697180696/protection_1_vxy2bc.png'
      break
    case 'recovered':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697179251/recovered_1_wbfx0v.png'
      break
    case 'deceased':
      statusImageUrl =
        'https://res.cloudinary.com/dkydhvcix/image/upload/v1697179278/breathing_1_cli0qn.png'
      break
    default:
      statusImageUrl = null
  }

  return (
    <div data-testid={`countryWide${tabDisplayText}Cases`}>
      <p>{tabDisplayText}</p>
      <img src={statusImageUrl} alt={`country wide ${tabId} cases pic`} />
      <p>{countDetails.tabId}5478</p>
    </div>
  )
}

export default CaseStatusTab
