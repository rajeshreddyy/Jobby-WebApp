import {FaBriefcase} from 'react-icons/fa'
import {FiMapPin} from 'react-icons/fi'

import './index.css'

const SimilarJobCard = props => {
  const {similarJob} = props
  console.log(props)
  return (
    <li key={similarJob.id} className="similar-job-card">
      <div className="similar-job-header">
        <div className="netflix-logo">
          <img src={similarJob.companyLogoUrl} alt="similar job company logo" />
        </div>
        <div className="similar-job-title-rating-container">
          <h2 className="similar-job-title">{similarJob.title}</h2>
          <div className="rating">
            <span className="star">★</span>
            <p className="rating-number rating-text">{similarJob.rating}</p>
          </div>
        </div>
      </div>

      <div className="description-section">
        <h3 className="description-heading">Description</h3>
        <p className="description-text">{similarJob.jobDescription}</p>
      </div>

      <div className="similar-job-footer">
        <div className="location-info">
          <FiMapPin size={16} />
          <p className="location-emp-type-txt">{similarJob.location}</p>
        </div>
        <div className="employment-type">
          <FaBriefcase size={16} />
          <p className="location-emp-type-txt">{similarJob.employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
