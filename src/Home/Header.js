import React, { useState, useEffect, useContext } from "react";
import { loggedInUser, search_product_context } from "../App";
import axios from "axios";
import "./Header.css";
import { NavLink as Link } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { IoMdBasket } from "react-icons/io";
import styled from "styled-components";
// import { useStateValue } from "../StateProvider";
import { auth } from "../Authentication/firebase";
import history from "material-ui/svg-icons/action/history";


function Header({ searchTerm, handleChange }) {
  
  const NavMenu = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
      display: flex;
    }
  `;
  let user;
  const [visibleHeadermenu, setVisibleHeadermenu] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1000) {
        setVisibleHeadermenu(true);
      } else {
        setVisibleHeadermenu(false);
      }
    });
  }, []);
  let userInfo = {
    name       : null,
    email      : null,
    phone      : null,
    image      : null,
    isSignedIn : false
  }
  const handleAuthenticaton = () => {
     if (!userLoggedIn[0].isSignedIn) {
       auth.signOut();
       userLoggedIn[1](userInfo);
     } else {
      history.push("/signin");
     }
     console.log(userLoggedIn[0].isSignedIn)
   const [{ cart, user }, dispatch] = useStateValue();
   history.push("/");
  };

  const handleSearch = () => {
    const search_val = document
      .getElementById("search_product")
      .value.trim()
      .toLowerCase();
    axios
      .get(`http://localhost:3001/api/get/search_product/name/${search_val}`)
      .then((response) => {
        search_value[1](...search_value[0], response.data);
      });
    console.log(search_value[0]);
  };

  const search_value = useContext(search_product_context);
  return (
    <div className="header" id="header__id">
      <Link to="/home" style={{ textDecoration: "none", color: "whitesmoke" }}>
        {/* <img
          className="header__logo"
          src="logo_banner\LOGO.png"
          alt="BibhBazaar"
        /> */}
        <h2 style={{ color: "white", marginTop: "15px", marginLeft: "20px" }}>
          Snap Buy
        </h2>
      </Link>

      <div className="header__search">
        <div class="ui icon input">
          <input
            type="text"
            placeholder="Search..."
            className="header__searchInput"
            id="search_product"
          />
          <i
            className="inverted circular search link icon"
            id="header_icon"
            onClick={handleSearch}
          ></i>
        </div>
      </div>

      <div className="counetr">
        <p>this is a counter</p>
      </div>

      <NavMenu>
        <div className="header__nav">
          
          <Link
            to="/signin"
            activeStyle
          >
            <div className="header__icon" onClick={handleAuthenticaton}>
              {
                userLoggedIn[0].email && <p id="mailOfUser">{userLoggedIn[0].email}</p>
              }
              <BsPersonFill style={{ color: "white", fontSize: "20px" }} />
              <p className="line">{userLoggedIn[0].isSignedIn ? "Sign Out" : "Sign In"}</p>
            </div>
          </Link>
          <Link to="/checkout" style={{ textDecoration: "none" }} activeStyle>
            <div className="header__icon" style={{ marginRight: "50px" }}>
              <div style={{ display: "flex" }}>
                <IoMdBasket
                  style={{
                    display: "flex",
                    marginRight: "10px",
                    color: "white",
                    fontSize: "20px",
                  }}
                />{" "}
                <p style={{ color: "white", alignSelf: "center" }}></p>
              </div>
              <p className="line">Add to cart</p>
            </div>
          </Link>
        </div>
      </NavMenu>
    </div>
  );
}

export default Header;
