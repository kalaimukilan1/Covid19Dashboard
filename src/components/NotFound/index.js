import './index.css'

const NotFound = props => {
  const onClickNotFoundHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dkydhvcix/image/upload/v1697974342/Group_7484_zqy4yn.png"
        alt="not-found-pic"
        className="not-found-image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found
        <br />
        Please go back to the homepage
      </p>
      <button
        type="button"
        className="not-found-home-button"
        onClick={onClickNotFoundHome}
      >
        Home
      </button>
    </div>
  )
}

export default NotFound
