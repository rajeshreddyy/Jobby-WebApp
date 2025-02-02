import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    profileResponse: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const profileDetails = await response.json()
      this.setState({apiStatus: apiStatusConstants.success})
      this.updateTheProfileDetails(profileDetails.profile_details)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      console.error('Failed to fetch profile details')
    }
  }

  updateTheProfileDetails = profileData => {
    const updatedData = {
      name: profileData.name,
      profileImageUrl: profileData.profile_image_url,
      shortBio: profileData.short_bio,
    }

    this.setState({profileResponse: updatedData})
  }

  renderProfileDetails = () => {
    const {profileResponse} = this.state

    return (
      <div className="profile-container">
        <div className="profile-pic-container">
          <img
            src={profileResponse.profileImageUrl}
            alt="profile"
            className="profile-img"
          />
        </div>
        <h1 className="user-name">{profileResponse.name}</h1>
        <p className="user-bio">{profileResponse.shortBio}</p>
      </div>
    )
  }

  renderFailureview = () => (
    <div className="failure-view-container">
      <button
        type="button"
        onClick={this.getProfileDetails}
        className="failure-view-btn"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingview = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureview()
      case apiStatusConstants.inProgress:
        return this.renderLoadingview()
      default:
        return null
    }
  }
}

export default ProfileDetails
