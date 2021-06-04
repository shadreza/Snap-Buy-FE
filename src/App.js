import React from 'react';
import { Button, Form, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Homepage from './Components/Homepage/Homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <section className="navbar-section">
          <div className="navbar-logo">
            <h3 className="logo pointer-cursor">Snap Buy</h3>
          </div>
          <div className="navbar-links">
            <div className="just-links">
              <ul className="links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/catagory">Categories</Link>
                </li>
                <li>
                  <Link to="contact">Contact us</Link>
                </li>
              </ul>
            </div>
            <div className="profile-link">
              <img className="profile-img pointer-cursor" src="https://gawler.org/wp-content/uploads/2018/06/Male-BOM-Profile-1024x1024.jpg" alt="your profile" />
            </div>
          </div>
        </section>
      </div>
      <Switch>
        <Route path="/home">
          <Homepage />
        </Route>
        <Route path="/catagory">
          
        </Route>
        <Route path="/contact">
          
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

