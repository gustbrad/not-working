import React from 'react';
import PropTypes from 'prop-types';
import SignUpFormBand from '../components/pages/SignUpFormBand.jsx';




class SignUpPageBand extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        bandName: '',
        musicGenre: '',
        instrument: '',
        experience: '',
        videoLink: '',
        bandDescription: '',
        password: '',
        isMusician: false,
        city: '',
        state: '',
        firstName: '',
        lastName: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const bandName = encodeURIComponent(this.state.user.bandName);
    const firstName = encodeURIComponent(this.state.user.firstName);
    const lastName = encodeURIComponent(this.state.user.lastName);
    const bandDescription = encodeURIComponent(this.state.user.bandDescription);
    const instrument = encodeURIComponent(this.state.user.instrument);
    const musicGenre = encodeURIComponent(this.state.user.musicGenre);
    const experience = encodeURIComponent(this.state.user.experience);
    const email = encodeURIComponent(this.state.user.email);
    var re= /^(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
    const videoLink = encodeURIComponent(this.state.user.videoLink.match(re)[7]);
    const password = encodeURIComponent(this.state.user.password);
    const city = encodeURIComponent(this.state.user.city);
    const state = encodeURIComponent(this.state.user.state);
    const isMusician = encodeURIComponent(this.state.user.isMusician);
    const formData = `bandName=${bandName}&firstName=${firstName}&lastName=${lastName}&isMusician=${isMusician}&bandDescription=${bandDescription}&state=${state}&city=${city}&musicGenre=${musicGenre}&instrument=${instrument}&experience=${experience}&videoLink=${videoLink}&email=${email}&password=${password}`;
console.log(formData)
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
        
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // redirect user after sign up to login page
        this.props.history.push('/login');
      } else {
        // failure


        this.setState({
  
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpFormBand
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPageBand.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPageBand;
