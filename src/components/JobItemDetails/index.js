import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoLocationOutline, IoBriefcase} from 'react-icons/io5'
import {FiExternalLink} from 'react-icons/fi'
import Cookie from 'js-cookie'

import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SkillBadge = ({name, icon}) => (
  <li className="skill-item">
    <img src={icon} alt={`${name} icon`} className="skill-icon" />
    <span className="skill-name-text">{name}</span>
  </li>
)

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsApiUrl, options)
    const JobItemData = await response.json()
    if (response.ok) {
      this.updateJobItemData(JobItemData)
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateJobItemData = JobItemDetail => {
    const updatedJobItemData = {
      jobDetails: {
        companyLogoUrl: JobItemDetail.job_details.company_logo_url,
        companyWebsiteUrl: JobItemDetail.job_details.company_website_url,
        employmentType: JobItemDetail.job_details.employment_type,
        id: JobItemDetail.job_details.id,
        jobDescription: JobItemDetail.job_details.job_description,
        lifeAtCompany: {
          description: JobItemDetail.job_details.life_at_company.description,
          imageUrl: JobItemDetail.job_details.life_at_company.image_url,
        },
        location: JobItemDetail.job_details.location,
        packagePerAnnum: JobItemDetail.job_details.package_per_annum,
        rating: JobItemDetail.job_details.rating,
        skills: JobItemDetail.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: JobItemDetail.job_details.title,
      },
      similarJobs: JobItemDetail.similar_jobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        id: eachSimilarJob.id,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      })),
    }
    this.setState({jobItemDetails: updatedJobItemData})
  }

  renderJobDetails = () => {
    const {jobItemDetails} = this.state
    const {jobDetails} = jobItemDetails
    return (
      <div className="details-container">
        <div className="header-container">
          <div className="header-logo-role-container">
            <div className="header-logo-wrapper">
              <img src={jobDetails.companyLogoUrl} alt="website logo" />
            </div>

            <div className="header-info-wrapper">
              <h2 className="header-title-text">{jobDetails.title}</h2>
              <div className="header-rating-container">
                <span className="header-rating-icon">★</span>
                <p className="rating-text">{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="header-info-container">
            <div className="header-location-type-wrapper">
              <div className="location-icon-wrapper">
                <IoLocationOutline />
                <p className="header-location-text">{jobDetails.location}</p>
              </div>

              <div className="job-type-icon-wrapper">
                <IoBriefcase />
                <p className="header-type-text">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="header-salary-text">{jobDetails.packagePerAnnum}</p>
          </div>

          <hr />
        </div>

        <div className="section-container section-description">
          <div className="section-header-container section-header-description">
            <h2 className="section-title-text">Description</h2>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-link-button"
              onClick={this.onClickVisit}
            >
              Visit <FiExternalLink />
            </a>
          </div>
          <p className="description-text">{jobDetails.jobDescription}</p>
        </div>

        <div className="section-container">
          <h2 className="section-title-text">Skills</h2>
          <ul className="skills-grid-container">
            {jobDetails.skills.map(skill => (
              <SkillBadge
                key={skill.id}
                name={skill.name}
                icon={skill.imageUrl}
              />
            ))}
          </ul>
        </div>

        <div className="section-container">
          <h2 className="section-title-text">Life at Company</h2>
          <div className="company-life-grid-container">
            <p className="company-life-description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <div className="company-image-wrapper">
              <img
                src={jobDetails.lifeAtCompany.imageUrl}
                alt="Office space"
                className="company-image"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {jobItemDetails} = this.state
    const {similarJobs} = jobItemDetails

    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs-heading"> Similar Jobs </h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobCard
              key={eachSimilarJob.id}
              similarJob={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemDetails = () => (
    <div className="job-item-details-container">
      <Header />
      {this.renderJobDetails()}
      {this.renderSimilarJobs()}
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobItemDetails}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobItemDetails
