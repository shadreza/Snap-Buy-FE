import React , {createContext , useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import userPic from './Components/Images/user.png';
import Homepage from './Components/Homepage/Homepage';
import Category from './Components/Category/Category';
import Profile from './Components/Profile/Profile';
import Contact from './Components/Contact/Contact';
import SignInOrUp from './Components/SignInOrUp/SignInOrUp';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState({
    name       : 'default',
    email      : 'default@example.com',
    image      : {userPic},
    isLoggedIn : true,
    position   : 'admin'
  })

  return (
    <Router>
      <UserContext.Provider value={[user,setUser]}>
        <div className="App">
          <section className="navbar-section">
            <div className="navbar-logo">
              <Link to="/">
                <h3 className="logo pointer-cursor">Snap Buy</h3>
              </Link>
            </div>
            <div className="navbar-links">
              <div className="just-links">
                <ul className="links">
                  <Link to="/">
                    <li>
                      Home
                    </li>
                  </Link>
                  <Link to="/catagory">
                    <li>
                    Categories
                    </li>
                  </Link>
                  <Link to="/contact">
                    <li>
                    Contact us
                    </li>
                  </Link>
                  <Link to="/login">
                    <li>
                    Log In
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="profile-link">
                <Link to="/profile">
                  <img className="profile-img pointer-cursor" src={userPic} alt="profile" />
                </Link>
              </div>
            </div>
          </section>
        </div>
        <Switch>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route path="/catagory">
            <Category />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <SignInOrUp />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

