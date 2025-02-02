import {Link} from 'react-router-dom'

import JobCard from '../JobCard'

import './index.css'

const JobsList = props => {
  const {jobs} = props

  return (
    <ul className="jobs-list-container">
      {jobs.map(eachJob => {
        const {id} = eachJob
        return (
          <li key={eachJob.id}>
            <Link to={`/jobs/${id}`} className="list-item">
              <JobCard jobDetails={eachJob} id={eachJob.id} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default JobsList
