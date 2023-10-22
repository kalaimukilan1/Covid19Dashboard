import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

import {LineChart, XAxis, YAxis, Legend, Line, BarChart, Bar} from 'recharts'

const spreadsList = [
  {
    id: 'confirmed',
  },
  {
    id: 'active',
  },
  {
    id: 'recovered',
  },
  {
    id: 'deceased',
  },
  {
    id: 'tested',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Chats extends Component {
  state = {timelineData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getStateTimeLineData()
  }

  getStateTimeLineData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/covid19-timelines-data/${id}`

    const response = await fetch(url)
    const responseData = await response.json()

    const listFormatTimeLineData = this.convertListFormatTimeLineData(
      responseData[id].dates,
    )

    if (response.ok === true) {
      this.setState({
        timelineData: listFormatTimeLineData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  convertListFormatTimeLineData = data => {
    const resultList = []
    const keysName = Object.keys(data)

    keysName.forEach(eachKey => {
      if (data[eachKey]) {
        const {total} = data[eachKey]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const date = eachKey

        resultList.push({
          confirmed,
          deceased,
          recovered,
          active: confirmed - (deceased + recovered),
          tested,
          date,
        })
      }
    })

    return resultList
  }

  dataFormatter = number => {
    if (number > 100000) {
      return `${(number / 100000).toString()}L`
    }
    if (number > 1000 && number < 100000) {
      return `${(number / 1000).toString()}K`
    }
    return number.toString()
  }

  renderBarChart = () => {
    const {activeTab} = this.props
    const {timelineData} = this.state
    const TimeLineLength = timelineData.length

    const last10DaysData = timelineData.splice(
      TimeLineLength - 10,
      TimeLineLength,
    )

    const changeDateFormat = date => {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]

      const dateValue = new Date(date)

      const monthName = months[dateValue.getMonth()]
      const day = dateValue.getDate()
      const dateStr = `${day} ${monthName}`

      return dateStr
    }

    let barColor = '#9A0E31'

    switch (activeTab) {
      case 'confirmed':
        barColor = '#9A0E31'
        break
      case 'active':
        barColor = '#0A4FA0'
        break
      case 'recovered':
        barColor = '#216837'
        break
      case 'deceased':
        barColor = '#474C57'
        break
      default:
        break
    }

    return (
      <div>
        <div className="bar-chart-container">
          <BarChart width={950} height={300} data={last10DaysData}>
            <XAxis dataKey="date" tickFormatter={changeDateFormat} />
            <YAxis tickFormatter={this.dataFormatter} />
            <Bar dataKey={`${activeTab}`} fill={barColor} barSize="5%" />
          </BarChart>
        </div>

        <div className="sm-bar-chart-container">
          <BarChart width={300} height={300} data={last10DaysData}>
            <XAxis dataKey="date" tickFormatter={changeDateFormat} />
            <YAxis tickFormatter={this.dataFormatter} />
            <Bar dataKey={`${activeTab}`} fill={barColor} barSize="5%" />
          </BarChart>
        </div>

        <div className="lg-bar-chart-container">
          <BarChart width={450} height={300} data={last10DaysData}>
            <XAxis dataKey="date" tickFormatter={changeDateFormat} />
            <YAxis tickFormatter={this.dataFormatter} />
            <Bar dataKey={`${activeTab}`} fill={barColor} barSize="5%" />
          </BarChart>
        </div>
      </div>
    )
  }

  spreadTrendCharts = dataKeyVal => {
    const {timelineData} = this.state

    let strokeColor = '#FF073A'

    switch (dataKeyVal) {
      case 'confirmed':
        strokeColor = '#FF073A'
        break
      case 'active':
        strokeColor = ' #007bff'
        break
      case 'recovered':
        strokeColor = '#28a745'
        break
      case 'deceased':
        strokeColor = '#6c757d'
        break
      case 'tested':
        strokeColor = '#9673B9'
        break
      default:
        strokeColor = '#6c757d'
    }

    return (
      <div
        className={`lineChart-container ${dataKeyVal}-background `}
        data-testid="lineChartsContainer"
      >
        <LineChart height={260} width={950} data={timelineData}>
          <XAxis dataKey="date" stroke={strokeColor} />
          <YAxis tickFormatter={this.dataFormatter} stroke={strokeColor} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="square"
          />
          <Line
            type="monotone"
            dataKey={dataKeyVal}
            stroke={strokeColor}
            fill={strokeColor}
          />
        </LineChart>
      </div>
    )
  }

  renderSpreadTrend = () => (
    <ul className="sm-spread-trends-list-container">
      {spreadsList.map(each => (
        <li key={each.id}>{this.spreadTrendCharts(each.id)}</li>
      ))}
    </ul>
  )

  renderLoadingView = () => (
    <div
      data-testid="timelinesDataLoader"
      className="specific-state-route-loader-container"
    >
      <Loader type="TailSpin" color="#007BFF" height="60px" width="60px" />
    </div>
  )

  renderChartsSuccessView = () => (
    <div>
      {this.renderBarChart()}
      <h1 className="speared-trend-title">Daily Speared Trends</h1>
      {this.renderSpreadTrend()}
    </div>
  )

  renderCharts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderChartsSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCharts()}</div>
  }
}

export default withRouter(Chats)
