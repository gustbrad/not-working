import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DropdownList from "../Form/DropdownList";
import city_names from "../Arrays/Cities";
import state_names from "../Arrays/States";
import './signup.css';


const SignUpFormBand = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div>
    <h1>Band Signup</h1>
    <form action="/" onSubmit={onSubmit}>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      
      <div className="row">

			  <div className="form-group col-md-12">
  				<button className="btn btn-secondary find-submit">
	  				<Link to="/signupband" className={window.location.pathname === "/signupband" ? "nav-link active" : "nav-link"}>Band</Link>
					</button>
					<button className="btn btn-outline-secondary find-submit">
						<Link to="/signupmusician" className={window.location.pathname === "/signupmusician" ? "nav-link active" : "nav-link"}>Musician</Link>
					</button>
				</div>

			  <div className="form-group col-md-4">
          <label htmlFor="bandName">Band Name: </label>
          <input
          type="text"
          className="form-control"
            placeholder="Band Name"
            name="bandName"
            onChange={onChange}
            value={user.bandName}
          />
        </div>

      	<div className="form-group col-md-4">
          <label htmlFor="musicGenre">Music Genre: </label>
          <input
          type="text"
          className="form-control"
            placeholder="Music Genre"
            name="musicGenre"
            onChange={onChange}
            value={user.musicGenre}
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
            type="text"
            className="form-control"
            placeholder="Instrument Needed"
            name="instrument"
            onChange={onChange}
            value={user.instrument}
          />
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="experience">Experience: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Experience"
            name="experience"
            onChange={onChange}
            value={user.experience}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={onChange}
            value={user.email}
          />
        </div>
      </div>

     <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="password">Password: </label>
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            onChange={onChange}
            value={user.password}
          />
        </div>
      </div>

      
      <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="videoLink">Youtube Video Link: </label>
          <input
            type="text"
            className="form-control"
            placeholder="https://youtu.be/A71aqufiNtQ"
            name="videoLink"
            onChange={onChange}
            value={user.videoLink}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="bandDescription">Band Description: </label>
          <input
          type="text"
            className="form-control"
            placeholder="Band Description"
            name="bandDescription"
            onChange={onChange}
            value={user.bandDescription}
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

SignUpFormBand.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpFormBand;
