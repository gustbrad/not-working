import React from "react";

const ContactUs = props => (
  <form>
    <div className="form-group">
      <input
        value={props.value}
        name="username"
        type="text"
        className="form-control"
        placeholder="Username:"
        id="username"
      />
      <br />
      <textarea 
      className="form-control"
      value={props.value}
      name="comment"
      type="text"
      placeholder="What would you like to tell us?"
      rows="10"
      />
      <br/>
      <button class="btn btn-outline-secondary find-submit" type="button" id="submit-contact">Contact Us</button>
    </div>
  </form>
);
export default ContactUs;