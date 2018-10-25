import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <div className="LoginForm">
		<div className="Home">
		  <h1> Ensemble Me</h1>
		</div>

    <div className="marginLoginForm">
			<h1>Login form</h1>
				<form action="/" onSubmit={onSubmit}>
          <h2 className="card-heading">Login</h2>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.summary && <p className="error-message">{errors.summary}</p>}

			    <label htmlFor="email">Email: </label>
						<input
              placeholder="Email"
							type="text"
							name="email"
              onChange={onChange}
              value={user.email}
						/>
          <label htmlFor="password">Password: </label>
						<input
              placeholder="Password"
						  type="password"
							name="password"
							onChange={onChange}
              value={user.passsword}
						/>

          <button className="btn btn-outline-secondary find-submit" type="submit">
					  Log in
				  </button>
          <div>Don't have an account? <Link to={'/signup'}>Create one</Link>.</div>
        </form>
      </div>
    </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
