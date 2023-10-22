import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {faqDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getFaqDetails()
  }

  getFaqDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/covid19-faqs'

    const response = await fetch(url)
    const responseData = await response.json()

    if (response.ok === true) {
      this.setState({
        faqDetails: responseData.faq,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {faqDetails} = this.state
    return (
      <div className="about-whole-container">
        <Header />

        <div className="about-bg-container">
          <div className="about-container">
            <h1 className="about-title">About</h1>
            <p className="about-description">
              COVID-19 vaccines be ready for distribution
            </p>

            <ul className="faq-ul-container" data-testid="faqsUnorderedList">
              {faqDetails.map(eachFaq => (
                <li key={eachFaq.qno} className="faq-list">
                  <p className="faq-question">{eachFaq.question}</p>
                  <p className="faq-answer">{eachFaq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div>
      <Header />
      <div
        data-testid="aboutRouteLoader"
        className="home-route-loader-container"
      >
        <Loader type="TailSpin" color="#007BFF" height="60px" width="60px" />
      </div>
    </div>
  )

  renderAboutRoute = () => {
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
    return this.renderAboutRoute()
  }
}

export default About
