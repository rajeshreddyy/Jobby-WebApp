import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showLoginError: false,
    loginErrorMsg: '',
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookie.set('jwt_token', jwtToken, {expires: 30})
    this.setState({username: '', password: ''})

    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({loginErrorMsg: errorMsg, showLoginError: true})
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label className="username-label" htmlFor="username">
          USERNAME
        </label>
        <input
          placeholder="Username"
          className="username-input"
          id="username"
          type="text"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="password-container">
        <label className="password-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          placeholder="Password"
          className="password-input"
          id="password"
          type="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  renderLoginBtn = () => (
    <button type="submit" className="login-btn">
      Login
    </button>
  )

  renderWebsiteLogo = () => (
    <img
      alt="website logo"
      className="website-logo-img"
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
    />
  )

  renderLoginError = () => {
    const {loginErrorMsg} = this.state
    return <p className="login-error-msg">{`*${loginErrorMsg}`}</p>
  }

  render() {
    const {showLoginError} = this.state
    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <form id="loginForm" className="login-form" onSubmit={this.onLogin}>
        <div className="username-password-container">
          {this.renderWebsiteLogo()}
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          {this.renderLoginBtn()}
          {showLoginError && this.renderLoginError()}
        </div>
      </form>
    )
  }
}

export default withRouter(Login)
