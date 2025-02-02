import {withRouter, Link} from 'react-router-dom'

import Cookie from 'js-cookie'

import {MdHome} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogo = () => {
    const {history} = props
    history.replace('/')
  }

  const onLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header">
      <div className="mobile-header-container">
        <Link to="/" className="logo-container">
          <img
            onClick={onClickLogo}
            alt="website logo"
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>

        <div className="header-icons-container">
          <Link to="/">
            <MdHome className="icon" />
          </Link>
          <Link to="/jobs">
            <FaBriefcase className="icon" />
          </Link>

          <FiLogOut onClick={onLogout} className="icon" />
        </div>
      </div>

      <div className="desktop-header-container">
        <button type="button" onClick={onClickLogo} className="logo-container">
          <img
            alt="website logo"
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </button>

        <div className="header-icons-container">
          <ul className="nav-menu-items">
            <Link to="/" className="home-link">
              <li>Home</li>
            </Link>
            <Link className="jobs-link" to="/jobs">
              <li>Jobs</li>
            </Link>
          </ul>
        </div>

        <button type="button" onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
