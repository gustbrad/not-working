import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.email, this.state.password)
		this.setState({
			redirectTo: '/user'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
				<div className="Home">
					<h1> Ensemble Me</h1>
				</div>

					<div className="marginLoginForm">
						<h1>Login form</h1>
						<form>
							<label htmlFor="email">Email: </label>
							<input
								type="text"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<button onClick={this.handleSubmit} className="btn btn-outline-secondary find-submit">Login</button>
						</form>
						<a href="/auth/google">
							{/* <GoogleButton /> */}
							{/* <img src={googleButton} alt="sign into Google Button" /> */}
						</a>
					</div>
					<footer className="absoluteFooter font-small blue">
					<div className="footer-copyright py-3 text-center">
						© 2018 Copyright:
       				 <a> Ensemble Me </a>
					</div>
				</footer>
				</div>
			)
		}
	}
}

export default LoginForm
