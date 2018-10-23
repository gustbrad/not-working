import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './signup.css';
import { Link } from "react-router-dom";
import DropdownList from "../Form/DropdownList";
import city_names from "../Arrays/Cities";
import state_names from "../Arrays/States";
import API from "../../utils/API.js";


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			experience: '',
			videoLink: '',
			password: '',
			passwordConfirm: '',
			instrument: '',
			location: '',
			isMusuician: true,
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
		// TODO - validate!
		// Working with the data structure present below. API can accomodate multiple intrument objects
		// axios
		// 	.post('http://localhost:3001/api/user/APIkey=Yjklasjen38820jdk', {
		// 		firstName: this.state.firstName,
		// 		lastName: this.state.lastName,
		// 		password: this.state.password,
		// 		passwordConfirm: this.state.passwordConfirm,
		// 		videoLink: this.state.videoLink,
		// 		email: this.state.email,
		// 		location: this.state.location,
		// 		instruments: [
		// 			{
		// 			instrument: this.state.instrument,
		// 			yearsExp: this.state.experience
		// 			}
		// 		],
		// 		isMusician: this.state.isMusician
		// 	})
		// 	.then(response => {
		// 		console.log(response)
		// 		if (!response.data.errmsg) {
		// 			console.log('youre good')
		// 			this.setState({
		// 				redirectTo: '/login'
		// 			})
		// 		} else {
		// 			console.log('duplicate')
		// 		}
		// 	})
		// 	.catch(err =>{
		// 		console.log(err);
		// 	})
		API.newUserSignup({
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					password: this.state.password,
					passwordConfirm: this.state.passwordConfirm,
					videoLink: this.state.videoLink,
					email: this.state.email,
					location: this.state.location,
					instruments: [
						{
						instrument: this.state.instrument,
						yearsExp: this.state.experience
					}],
					isMusician: this.state.isMusician
				})
				.then(response => {
							console.log(response)
							if (!response.data.errmsg) {
								console.log('youre good')
								this.setState({
									redirectTo: '/login'
								})
							} else {
								console.log('duplicate')
							}
						})
						.catch(err =>{
							console.log(err);
						})
	}



	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div>
				<h1>Musician Signup</h1>
				<form>
					<div className="row">
						<div className="form-group col-sm-12 radio-buttons">
							<button className="btn btn-outline-secondary find-submit">
								<Link to="/signupband" className={window.location.pathname === "/signupband" ? "nav-link active" : "nav-link"}>Band</Link>
							</button>
							<button className="btn btn-secondary find-submit">
								<Link to="/signupmusician" className={window.location.pathname === "/signupmusician" ? "nav-link active" : "nav-link"}>Musician</Link>
							</button>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-4">
							<label htmlFor="firstName">First Name: </label>
							<input
								type="text"
								className="form-control"
								id="inputFirstName"
								placeholder="First Name"
								name="firstName"
								value={this.state.firstName}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="lastName">Last Name: </label>
							<input
								type="text"
								className="form-control"
								id="inputLastName"
								placeholder="Last Name"
								name="lastName"
								value={this.state.lastName}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="location">City: </label><br></br>
							<DropdownList data={city_names} id="city-names"></DropdownList>
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="location">State	: </label><br></br>
							<DropdownList data={state_names} id="state-names"></DropdownList>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-6">
							<label htmlFor="instrument">Instrument Played: </label>
							<input
								type="text"
								className="form-control"
								id="inputInstrument"
								placeholder="Instrument Played"
								name="instrument"
								value={this.state.instrument}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="experience">Experience: </label>
							<input
								type="text"
								className="form-control"
								id="inputExperience"
								placeholder="Experience"
								name="experience"
								value={this.state.experience}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-12">
							<label htmlFor="email">Email: </label>
							<input
								type="email"
								className="form-control"
								id="inputEmail"
								placeholder="Email"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-6">
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								className="form-control"
								id="inputPassword"
								placeholder="Password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="passwordConfirm">Confirm Password: </label>
							<input
								type="password"
								className="form-control"
								id="inputPasswordConfirm"
								placeholder="Re-Type Password"
								name="passwordConfirm"
								value={this.state.passwordConfirm}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-12">
							<label htmlFor="videoLink">YouTube Video Link: </label>
							<input
								type="text"
								className="form-control"
								id="inputVideoLink"
								placeholder="https://youtu.be/A71aqufiNtQ"
								name="videoLink"
								value={this.state.videoLink}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<button className="btn btn-outline-secondary find-submit" type="submit" onClick={this.handleSubmit}>
							Sign up
								</button>
					</div>
				</form>
			</div >
		)
	}
}


export default Signup
