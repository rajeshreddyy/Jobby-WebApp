import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import JobsList from '../JobsList'
import ProfileDetails from '../ProfileDetails'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    jobsResponse: [],
    selectedEmploymentTypes: [],
    selectedSalaryRange: 0,
    isSmallDevice: window.innerWidth < 768,
  }

  componentDidMount() {
    this.getJobs()

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({isSmallDevice: window.innerWidth < 768})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeEmploymentType = (type, isChecked) => {
    if (isChecked) {
      this.setState(
        prev => ({
          selectedEmploymentTypes: [...prev.selectedEmploymentTypes, type],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prev => ({
          selectedEmploymentTypes: prev.selectedEmploymentTypes.filter(
            currType => currType !== type,
          ),
        }),
        this.getJobs,
      )
    }
  }

  changeSalaryRange = salaryRange => {
    this.setState({selectedSalaryRange: salaryRange}, this.getJobs)
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {
      searchInput,
      selectedSalaryRange,
      selectedEmploymentTypes,
    } = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentTypes.join(
      ',',
    )}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApiUrl, options)
    if (response.ok) {
      const jobsSearchResults = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsResponse: jobsSearchResults.jobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  renderFiltersgroup = () => (
    <FiltersGroup
      employmentTypesList={employmentTypesList}
      salaryRangesList={salaryRangesList}
      changeEmploymentType={this.changeEmploymentType}
      changeSalaryRange={this.changeSalaryRange}
    />
  )

  renderSearchInput = () => (
    <div className="search-input-container">
      <input
        placeholder="Search"
        onChange={this.onChangeSearchInput}
        onKeyDown={this.onEnterKey}
        className="search-input"
        type="search"
      />
      <button onClick={this.getJobs} className="search-btn" type="button">
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  getJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingview()
      case apiStatusConstants.failure:
        return this.renderFaliureview()
      default:
        return null
    }
  }

  renderJobsList = () => {
    const {jobsResponse} = this.state
    return (
      <div className="jobs-list-container">
        <JobsList jobs={jobsResponse} />
      </div>
    )
  }

  renderLoadingview = () => (
    <div data-testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFaliureview = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  render() {
    const {isSmallDevice} = this.state
    const jwtToken = Cookie.get('jwt_token')
    console.log(this.state)

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="header-jobs-container">
        <Header />
        <div className="jobs-container">
          {isSmallDevice ? (
            <>
              {this.renderSearchInput()}
              <div className="profile-filters-container">
                <ProfileDetails />
                {this.renderFiltersgroup()}
              </div>
              {this.getJobsList()}
            </>
          ) : (
            <>
              <div className="profile-filters-container">
                <ProfileDetails />
                {this.renderFiltersgroup()}
              </div>

              <div className="jobs-right-container">
                {this.renderSearchInput()}

                {this.getJobsList()}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default Jobs
