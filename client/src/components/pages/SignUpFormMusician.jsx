import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DropdownList from "../Form/DropdownList";
import city_names from "../Arrays/Cities";
import state_names from "../Arrays/States";


const SignUpFormMusician = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div>
    <h1>Musician Signup</h1>
    <form action="/" onSubmit={onSubmit}>

      {errors.summary && <p className="error-message">{errors.summary}</p>}


      <div className="row">
			  <div className="form-group col-md-4">
          <label htmlFor="firstName">First Name: </label>
          <input
        	  type="text"
            className="form-control"
            placeholder="First Name"
            name="firstName"
            errorText={errors.firstName}
            onChange={onChange}
            value={user.firstName}
          />
        </div>
      

      	<div className="form-group col-md-4">
          <label htmlFor="lastName">Last Name: </label>
          <input
            placeholder="Last Name"
            name="lastName"
            errorText={errors.lastName}
            onChange={onChange}
            value={user.lastName}
          />
        </div>
  
        <div className="form-group col-md-2">
					<label htmlFor="location">City: </label><br></br>
					<DropdownList data={city_names} id="city-names"
            name="city"
            onChange={onChange}
            value={user.city}
          />
				</div>

				<div className="form-group col-md-2">
					<label htmlFor="location">State	: </label><br></br>
					<DropdownList data={state_names} id="state-names"
            name="state"
            onChange={onChange}
            value={user.state}
          />
				</div>
      </div>

      <div className="row">
			  <div className="form-group col-md-4">
          <label htmlFor="instrument">Instrument: </label>
          <input
            placeholder="Instrument"
            name="instrument"
            errorText={errors.instrument}
            onChange={onChange}
            value={user.instrument}
          />
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="experience">Experience: </label>
          <input
            placeholder="Experience"
            name="experience"
            errorText={errors.experience}
            onChange={onChange}
            value={user.experience}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="email">Email: </label>
          <input
            placeholder="Email"
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
          />
        </div>
      </div>

     <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="password">Password: </label>
          <input
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={onChange}
            errorText={errors.password}
            value={user.password}
          />
        </div>
      </div>

      
      <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="videoLink">Youtube Video Link: </label>
          <input
            placeholder="https://youtu.be/A71aqufiNtQ"
            name="videoLink"
            errorText={errors.videoLink}
            onChange={onChange}
            value={user.videoLink}
          />
        </div>
      </div>

      <div className="row">
				<button className="btn btn-outline-secondary find-submit" type="submit">
					Sign up
				</button>
			</div>

      <div>Already have an account? <Link to={'/login'}>Log in</Link></div>
    </form>
  </div>
);

SignUpFormMusician.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpFormMusician;
