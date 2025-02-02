import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  return (
    <div className="card-container">
      <div className="card-header">
        <img
          src={jobDetails.company_logo_url}
          alt="Netflix Logo"
          className="company-logo"
        />
        <h2 className="job-title">{jobDetails.title}</h2>
        <div className="rating">
          <FaStar color="gold" />
          <p className="rating-text">{jobDetails.rating}</p>
        </div>
      </div>
      <div className="card-details">
        <div className="location-type">
          <MdLocationOn size={16} />
          <p className="location-emp-type-txt">{jobDetails.location}</p> |{' '}
          <p className="location-emp-type-txt">{jobDetails.employment_type}</p>
        </div>
        <div className="salary">{jobDetails.package_per_annum}</div>
      </div>

      <hr />

      <div className="description">
        <p className="description-heading">Description</p>
        <p>{jobDetails.job_description}</p>
      </div>
    </div>
  )
}

export default JobCard
