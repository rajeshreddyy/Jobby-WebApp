import {withRouter, Redirect, Link} from 'react-router-dom'
import Cookie from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = props => {
  const jwtToken = Cookie.get('jwt_token')

  const navigateToJobsRoute = () => {
    const {history} = props
    history.push('/jobs')
  }

  const renderHomeDescription = () => (
    <div className="home-description-container">
      <div className="home-description-text">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>

        <Link to="/jobs">
          <button
            onClick={navigateToJobsRoute}
            className="find-jobs-btn"
            type="button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home">
      <Header />
      {renderHomeDescription()}
    </div>
  )
}

export default withRouter(Home)
