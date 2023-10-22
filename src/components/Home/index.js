import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import StateTableItem from '../StateTableItem'
import SearchResultItem from '../SearchResultItem'
import CaseStatusTab from '../CaseStatusTab'
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

class Home extends Component {
  state = {
    dataList: [],
    apiStatus: apiStatusConstants.initial,
    searchValue: null,
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'

    const response = await fetch(url)
    const responseData = await response.json()

    if (response.ok === true) {
      const listFormattedData = this.convertObjectsDataIntoListItemsUsingForInMethod(
        responseData,
      )
      this.setState({
        dataList: listFormattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    // getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total, districts} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0

        const stateName = statesList.find(state => state.state_code === keyName)

        if (stateName !== undefined) {
          resultList.push({
            stateCode: keyName,
            name: stateName.state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
            districts,
          })
        }
      }
    })
    return resultList
  }

  onChangeSearchValue = event => {
    if (event.target.value === '') {
      this.setState({searchValue: null})
    } else {
      this.setState({searchValue: event.target.value.toLowerCase()})
    }
  }

  onClickSortAscending = () => {
    const {dataList} = this.state
    const sortedDataList = dataList.sort((a, b) =>
      a.stateCode > b.stateCode ? 1 : -1,
    )
    this.setState({dataList: sortedDataList})
  }

  onClickSortDescending = () => {
    const {dataList} = this.state
    const sortDescDataList = dataList.sort((a, b) =>
      a.stateCode > b.stateCode ? -1 : 1,
    )
    this.setState({dataList: sortDescDataList})
  }

  stateWiseDataTable = () => {
    const {dataList} = this.state
    return (
      <div
        data-testid="stateWiseCovidDataTable"
        className="state-wise-data-container"
      >
        <div className="state-wise-data-header-container">
          <div className="states-ut-header-container">
            <p className="state-wise-data-states-and-ut-header">States/UT</p>
            <button
              type="button"
              data-testid="ascendingSort"
              className="state-wise-sort-button"
              onClick={this.onClickSortAscending}
            >
              <FcGenericSortingAsc className="state-wise-sort-icon" />
            </button>
            <button
              type="button"
              data-testid="descendingSort"
              className="state-wise-sort-button"
              onClick={this.onClickSortDescending}
            >
              <FcGenericSortingDesc className="state-wise-sort-icon" />
            </button>
          </div>
          <p className="state-wise-data-header">Confirmed</p>
          <p className="state-wise-data-header">Active</p>
          <p className="state-wise-data-header">Recovered</p>
          <p className="state-wise-data-header">Deceased</p>
          <p className="state-wise-data-header">Population</p>
        </div>

        <hr className="states-data-horizontal-line" />

        <ul className="state-data-unOrder-list">
          {dataList.map(eachState => (
            <StateTableItem
              key={eachState.stateCode}
              stateDetails={eachState}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderCaseStatusTab = () => {
    const countDetailsConstants = {
      confirmed: 34285612,
      active: 165803,
      recovered: 33661339,
      deceased: 458470,
    }

    return (
      <div className="status-tab-container">
        {statusTabList.map(eachTab => (
          <CaseStatusTab
            key={eachTab.tabId}
            tabDetails={eachTab}
            countDetails={countDetailsConstants}
          />
        ))}
      </div>
    )
  }

  renderSearchResult = () => {
    const {searchValue, dataList} = this.state

    const filteredDataList = dataList.filter(state =>
      state.name.toLowerCase().includes(searchValue),
    )

    if (filteredDataList.length > 0) {
      return (
        <ul className="search-result-ul-container">
          {filteredDataList.map(eachItem => (
            <SearchResultItem
              key={eachItem.stateCode}
              searchDetails={eachItem}
            />
          ))}
        </ul>
      )
    }
    return null
  }

  renderLoader = () => (
    <div>
      <Header />
      <div
        data-testid="homeRouteLoader"
        className="home-route-loader-container"
      >
        <Loader type="TailSpin" color="#007BFF" height="60px" width="60px" />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {dataList} = this.state
    return (
      <div className="home-route-container">
        <Header />
        <div className="search-bar-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            className="search-bar"
            placeholder="Enter the state"
            onChange={this.onChangeSearchValue}
          />
        </div>
        {this.renderSearchResult(dataList)}
        {this.renderCaseStatusTab()}
        {this.stateWiseDataTable(dataList)}
        <Footer />
      </div>
    )
  }

  renderHomeRoute = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return this.renderHomeRoute()
  }
}

export default Home
