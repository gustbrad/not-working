import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav/Nav";
import Nav2 from "./components/Nav/Nav2";
import Home from "./components/pages/Home";
import Team from "./components/pages/Team";
import BandProfile from "./components/pages/BandProfile";
import MusicianProfile from "./components/pages/MusicianProfile";
import FindMusician from "./components/pages/FindMusician";
import FindBand from "./components/pages/FindBand";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./containers/LoginPage.jsx";
import LogoutFunction from './containers/LogoutFunction.jsx';
import SignUpPageMusician from './containers/SignUpPageMusician.jsx';
import SignUpPageBand from './containers/SignUpPageBand.jsx';
import Profile from "./components/pages/Profile";
import Auth from './modules/Auth';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }


  render() {
    return (
  <Wrapper>
    <Router>
      <div>
        
        {this.state.authenticated ? (
          <Nav2 />
          ) : (
          <Nav />
        )}
    
        <div className="container rounded border border-secondary shadow p-3 mb-5">
          <PropsRoute exact path="/" component={Home} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
          <LoggedOutRoute path="/login" component={Login} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/bandprofile" component={BandProfile} />
          <PrivateRoute exact path="/musicianprofile" component={MusicianProfile} />
          <Route exact path="/findmusician" component={FindMusician} />
          <Route exact path="/findband" component={FindBand} />
          <Route exact path="/contact" component={Contact} />
          <LoggedOutRoute path="/signupmusician" component={SignUpPageMusician}/>
          <LoggedOutRoute path="/signupband" component={SignUpPageBand}/>
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route path="/logout" component={LogoutFunction}/>
        </div>
      </div>
    </Router>
  </Wrapper>
    );
  }
  }

export default App;
