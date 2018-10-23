import React from "react";
import "./Home.css";

const Home = () => (
  <div className="content">
    <h1>Uniting Musicians</h1>
    <p>
      Helping musicians and bands form and fill vacancies in 50 major cities across the United States.
    </p>
    <a href="/auth/google" className="btn btn-outline-secondary find-submit">Sign In with Google</a>
  </div>
);

export default Home;