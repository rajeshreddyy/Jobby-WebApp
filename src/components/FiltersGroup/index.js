import {Component} from 'react'
import './index.css'

class FiltersGroup extends Component {
  onChangeEmploymentType = event => {
    const {changeEmploymentType} = this.props
    const {checked, value} = event.target
    changeEmploymentType(value, checked)
  }

  onChangeSalaryRange = event => {
    const {changeSalaryRange} = this.props
    changeSalaryRange(event.target.value)
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <>
        <hr />
        <ul className="employment-types-list">
          <h1 className="types-of-employment-heading">Type of Employment</h1>
          {employmentTypesList.map(eachEmploymentType => (
            <li
              key={eachEmploymentType.employmentTypeId}
              className="employment-type-item"
              onChange={this.onChangeEmploymentType}
            >
              <input
                className="employment-type-checkbox"
                type="checkbox"
                id={eachEmploymentType.employmentTypeId}
                value={eachEmploymentType.employmentTypeId}
              />
              <label
                className="employment-type-label"
                htmlFor={eachEmploymentType.employmentTypeId}
              >
                {eachEmploymentType.label}
              </label>
            </li>
          ))}

          <hr />

          <ul className="salary-ranges-list">
            <h1 className="salary-range-heading">Salary Range</h1>
            {salaryRangesList.map(eachSalaryRange => (
              <li
                key={eachSalaryRange.salaryRangeId}
                className="salary-range-item"
                onChange={this.onChangeSalaryRange}
              >
                <input
                  className="salary-range-radio"
                  id={eachSalaryRange.salaryRangeId}
                  type="radio"
                  name="salary-ranges"
                  value={eachSalaryRange.salaryRangeId}
                />
                <label
                  className="salary-range-label"
                  htmlFor={eachSalaryRange.salaryRangeId}
                >
                  {eachSalaryRange.label}
                </label>
              </li>
            ))}
          </ul>
        </ul>
      </>
    )
  }
}

export default FiltersGroup
