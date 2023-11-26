import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CaseStatusTab from '../CaseStatusTab'
import Charts from '../Charts'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const statusTabList = [
  {
    tabId: 'confirmed',
    tabDisplayText: 'Confirmed',
  },
  {
    tabId: 'active',
    tabDisplayText: 'Active',
  },
  {
    tabId: 'recovered',
    tabDisplayText: 'Recovered',
  },
  {
    tabId: 'deceased',
    tabDisplayText: 'Deceased',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificState extends Component {
  state = {
    stateData: [],
    apiStatus: apiStatusConstants.initial,
    isSpecificState: true,
    activeTab: statusTabList[0].tabId,
  }

  componentDidMount() {
    this.getSpecificStateData()
  }

  getSpecificStateData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
    const response = await fetch(url)
    const responseData = await response.json()

    if (response.ok === true) {
      const listFormatData = this.convertObjectsDataIntoListItemsUsingForInMethod(
        responseData,
        id,
      )

      this.setState({
        stateData: listFormatData[0],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = (data, id) => {
    const resultList = []

    // getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.find(keyName => {
      if (keyName === id) {
        const {total, districts, meta} = data[keyName]
        // if the specific state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0

        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
          districts,
          lastUpdatedDate: meta.last_updated,
        })
      }
      return null
    })

    return resultList
  }

  onChangeActiveTab = tabId => {
    this.setState({activeTab: tabId})
  }

  renderCaseStatusTab = countDetails => {
    const {activeTab, isSpecificState} = this.state
    console.log(isSpecificState)
    return (
      <ul className="status-tab-container">
        {statusTabList.map(eachTab => (
          <CaseStatusTab
            key={eachTab.tabId}
            tabDetails={eachTab}
            countDetails={countDetails}
            onChangeActiveTab={this.onChangeActiveTab}
            activeTab={activeTab}
            isSpecificState
          />
        ))}
      </ul>
    )
  }

  convertDistrictDataIntoList = () => {
    const {stateData} = this.state
    const districtsData = stateData.districts
    const districtList = []

    const keyNames = Object.keys(districtsData)

    keyNames.forEach(eachKey => {
      if (districtsData[eachKey]) {
        const {total} = districtsData[eachKey]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

        districtList.push({
          districtName: eachKey,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })

    return districtList
  }

  renderTopDistrictList = () => {
    const districtListData = this.convertDistrictDataIntoList()
    const {activeTab} = this.state

    districtListData.sort((a, b) => b[activeTab] - a[activeTab])

    // Used activeTab name as CSS property for giving heading color
    return (
      <div>
        <h1 className={`top-district-heading ${activeTab}`}>Top Districts</h1>
        <ul
          className="district-ul-container"
          data-testid="topDistrictsUnorderedList"
        >
          {districtListData.map(eachDistrict => {
            if (eachDistrict[activeTab] !== 0) {
              return (
                <li
                  key={eachDistrict.districtName}
                  className="district-list-item"
                >
                  <p className="district-cases-count">
                    {eachDistrict[activeTab]}
                  </p>
                  <p className="district-name">{eachDistrict.districtName} </p>
                </li>
              )
            }
            return null
          })}
        </ul>
      </div>
    )
  }

  getLastUpdatedDate = lastUpdatedDate => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const wholeDateStr = new Date(lastUpdatedDate)
    const dateStr = wholeDateStr.toLocaleDateString()
    const dateValue = new Date(dateStr)

    const displayDateValue = `Last updated on ${
      months[dateValue.getMonth()]
    } ${dateValue.getDate()}th ${dateValue.getFullYear()}`

    return displayDateValue
  }

  renderSuccessView = () => {
    const {stateData, activeTab} = this.state
    const {name, tested, lastUpdatedDate} = stateData

    const displayLastUpdatedDate = this.getLastUpdatedDate(lastUpdatedDate)

    return (
      <div className="specific-bg-state-container">
        <Header />
        <div className="specific-state-container">
          <div className="state-name-and-tested-container">
            <div className="state-name-container">
              <h1 className="state-name">{name}</h1>
            </div>
            <div>
              <p className="tested-count-para">Tested</p>
              <p className="tested-count-span">{tested}</p>
            </div>
          </div>
          <p className="last-updated-date">{displayLastUpdatedDate}</p>

          {this.renderCaseStatusTab(stateData)}
          {this.renderTopDistrictList()}
          <Charts activeTab={activeTab} />
          <div className="specif-footer">
            <Footer />
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div>
      <Header />
      <div
        data-testid="stateDetailsLoader"
        className="specific-state-route-loader-container"
      >
        <Loader type="TailSpin" color="#007BFF" height="60px" width="60px" />
      </div>
    </div>
  )

  renderSpecificStateRoute = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return this.renderSpecificStateRoute()
  }
}

export default SpecificState
