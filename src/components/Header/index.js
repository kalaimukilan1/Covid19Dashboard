import {Component} from 'react'
import {Link} from 'react-router-dom'
import {GrFormClose} from 'react-icons/gr'

import './index.css'

class Header extends Component {
  state = {showNavLink: false}

  onToggleNavLink = () =>
    this.setState(prevState => ({
      showNavLink: !prevState.showNavLink,
    }))

  onCloseNavLink = () => {
    this.setState({showNavLink: false})
  }

  render() {
    const {showNavLink} = this.state
    const smNavLink = showNavLink ? '' : 'hide-nav-link-sm-container'

    return (
      <div className="header-bg-container">
        <div className="header-container">
          <Link to="/" className="covid-19-heading-link">
            <h1 className="covid19Heading">
              COVID19<span className="covid19HeadingSpan">INDIA</span>
            </h1>
          </Link>
          <div className="nav-link-container">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </div>

          <button
            className="nav-sm-button"
            type="button"
            onClick={this.onToggleNavLink}
          >
            <img
              src="https://res.cloudinary.com/dkydhvcix/image/upload/v1696940326/add-to-queue_1_diknih.png"
              alt="nav-bar"
            />
          </button>
        </div>

        <div className={`nav-link-sm-container ${smNavLink}`}>
          <div>
            <Link to="/" className="nav-link nav-link-sm ">
              Home
            </Link>
            <Link to="/about" className="nav-link nav-link-sm ">
              About
            </Link>
          </div>

          <button
            type="button"
            className="close-image-button"
            onClick={this.onCloseNavLink}
          >
            <GrFormClose size={15} />
          </button>
        </div>
      </div>
    )
  }
}

export default Header
