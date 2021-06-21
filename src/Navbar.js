import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { TiThMenu } from "react-icons/ti";
import { HiDotsVertical } from "react-icons/hi";
import { FiStar } from "react-icons/fi";
import { FaFish, FaCarrot, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { BiDrink, BiLogInCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import {
  GiChicken,
  GiBeerBottle,
  GiMilkCarton,
  GiPieSlice,
  GiConcreteBag,
  GiWallet,
  GiBowTieRibbon,
  GiHamburgerMenu,
} from "react-icons/gi";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import {
  IoIosArrowForward,
  IoMdBasket,
  IoMdCloseCircleOutline,
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
  IoMdAddCircle,
} from "react-icons/io";
import { BiCake } from "react-icons/bi";
import { MdLocalMall } from "react-icons/md";
import { Input, Button, Modal, Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { auth } from "./Authentication/firebase";
import { useStateValue } from "./StateProvider";
import { basket } from "./App";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

const Navbar = ({ searchTerm, handleChange }) => {
  const basketContext = useContext(basket);
  // const [verticalClick, setVerticalClick] = useState(false);

  const [burgerMenu, setBurgerMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Modal
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;


  // const handleVerticalClick = () => {
  //   setVerticalClick(!verticalClick);
  // };

  const history = useHistory();
  const [{ cart, user }, dis] = useStateValue();
  const handleAuthenticaton = (type) => {
    console.log();

    if (type === "login") {
      if (user) {
        auth.signOut();
        toast.success("Successfully Logged Out!!!", { position: "top-center" });
        window.location.reload();
      } else {
        history.push("/signin");
      }
    } else if (type === "profile") {
      if (user) {
        history.push("/profile");
      } else {
        history.push("/signin");
        toast("Please LogIn first!!!", { position: "top-center" });
      }
    } else if (type === "order_details") {
      if (user) {
        history.push("/order_details");
      } else {
        history.push("/signin");
        toast("Please LogIn first!!!", { position: "top-center" });
      }
    }
  };

  return (
    <Container>
      <GiHamburgerMenu
        onClick={() => setBurgerMenu(!burgerMenu)}
        style={{
          cursor: "pointer",
          fontSize: "25px",
          color: "white",
          cursor: "pointer",
        }}
      />
      <BurgerMenu show={burgerMenu}>
        <Link to="/all_products">
          <li>
            <MdLocalMall style={{ marginRight: "5px" }} />
            <p>All Products</p>
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
        <Link to="/popular_products">
          <li>
            <FiStar style={{ marginRight: "5px" }} />
            <p>Popular Products</p>
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
        <Link to="/fresh_products">
          <li>
            <FaCarrot style={{ marginRight: "5px" }} />
            <p>Fresh Products</p>
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
        <Link to="/grocery">
          <li>
            <FaCarrot style={{ marginRight: "5px" }} />
            <p>Grocery</p>
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
        <Link to="/bakery_and_snacks">
          <li>
            <GiConcreteBag style={{ marginRight: "5px" }} />
            <p>Bakery and Snacks</p>
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
        <Link to="/dairy">
          <li>
            <GiMilkCarton style={{ marginRight: "5px" }} />
            <p>Dairy</p>
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
        <Link to="/fish">
          <li>
            <FaFish style={{ marginRight: "5px" }} />
            Fish
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
        <Link to="/meat_and_chicken">
          <li>
            <GiChicken style={{ marginRight: "5px" }} />
            Meat and Chicken
            <IoIosArrowForward style={{ marginLeft: "auto" }} />
          </li>
        </Link>
      </BurgerMenu>
      <Image>
        <Link to="/">
          <h3 style={{ color: "white" }}>Snap Buy</h3>
        </Link>
      </Image>
      <InputDiv>
        <Input
          type="text"
          placeholder="Search..."
          id="header_input"
          value={searchTerm}
          onChange={handleChange}
          action
        >
          <input />
          <Button type="submit">Search</Button>
        </Input>
      </InputDiv>
      <Menu>
        <div
          onMouseEnter={() => setShowDropdown(!showDropdown)}
          className="user_profile"
        >
          {showDropdown ? <BsChevronDown /> : <BsChevronRight />}
          <CgProfile />
        </div>
        <Link to="/checkout" style={{ textDecoration: "none", color: "white" }}>
          <div className="user_profile">
            <IoMdBasket />

            <small style={{ marginLeft: "10px" }}>
              {basketContext[0]?.length}
            </small>

          </div>
        </Link>
        <Dropdown_Menu show={showDropdown}>
          <li onClick={() => handleAuthenticaton("login")}>
            {user ? "Sign Out" : "LogIn"}
          </li>
          <li onClick={() => handleAuthenticaton("profile")}>Profile</li>
          <li onClick={() => handleAuthenticaton("order_details")}>My Order</li>
        </Dropdown_Menu>
        <HiDotsVertical
          className="vertical_icon"
          onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })}
          style={{ fontSize: "22px", cursor: "pointer", color: "white" }}
        />
        <Modal_header
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          className="modal_header"
        >
          <div className="header_modal">
            <IoMdCloseCircleOutline
              style={{
                fontSize: "20px",
                color: "black",
                display: "flex",
                marginLeft: "auto",
                cursor: "pointer",
                marginBottom: "0px",
              }}
              onClick={() => dispatch({ type: "CLOSE_MODAL" })}
            />
            <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
              <p onClick={() => dispatch({ type: "CLOSE_MODAL" })}>Snap Buy</p>
            </Link>
          </div>
          <Modal.Content>
            {/* <Link
              to="/signin"
              style={{ textDecoration: "none", color: "grey" }}
            > */}
            <li
              onClick={() => handleAuthenticaton("login")}
              style={{ textDecoration: "none", color: "grey" }}
              className="modal"
            >
              <BiLogInCircle
                style={{
                  marginTop: "3px",
                  marginRight: "10px",
                  padding: "0px",
                  marginLeft: "4px",
                }}
              />
              <p>{user ? "Sign Out" : "LogIn"}</p>
            </li>
            {/* </Link> */}
            {/* <Link
              to="/profile"
              style={{ textDecoration: "none", color: "grey" }}
            > */}
            <li
              onClick={() => handleAuthenticaton("profile")}
              style={{ textDecoration: "none", color: "grey" }}
              className="modal"
            >
              <CgProfile
                style={{
                  marginTop: "3px",
                  marginRight: "10px",
                  padding: "0px",
                  marginLeft: "4px",
                }}
              />
              <p>My Profile</p>
            </li>
            {/* </Link>
            <Link
              to="/order_details"
              style={{ textDecoration: "none", color: "grey" }}
            > */}
            <li
              onClick={() => handleAuthenticaton("order_details")}
              style={{ textDecoration: "none", color: "grey" }}
              className="modal"
            >
              <GiConcreteBag
                style={{
                  marginLeft: "4px",
                  marginTop: "2px",
                  marginRight: "10px",
                }}
              />
              <p>My Order</p>
            </li>
            {/* </Link> */}
            <Link
              to="/checkout"
              style={{ textDecoration: "none", color: "grey" }}
            >
              <li>
                <IoMdBasket
                  style={{
                    marginLeft: "4px",
                    marginTop: "2px",
                    marginRight: "10px",
                  }}
                />
                <p>
                  Checkout{" "}
                  <span>
                    <small style={{ marginLeft: "10px" }}>
                      {basketContext[0]?.length}
                    </small>
                  </span>
                </p>
              </li>
            </Link>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "grey" }}
            >
              <li>
                <FaUserPlus
                  style={{
                    marginTop: "3px",
                    marginRight: "10px",
                    padding: "0px",
                    marginLeft: "4px",
                  }}
                />
                <p>SignUp</p>
              </li>
            </Link>
          </Modal.Content>
        </Modal_header>
      </Menu>
      <ToastContainer autoClose={1200} />
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  margin: 0px !important;
  position: fixed;
  top: 0;
  min-height: 60px;
  width: 100%;
  position: fixed;
  display: flex;
  flex: 1;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: green;
  border-radius: 0px 0px 12px 12px;
  border-bottom: 4px solid yellow;
  z-index: 100;
`;

const InputDiv = styled.div`
  display: flex;
  flex: 0.6;
  justify-content: center;
  z-index: 100;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  flex: 0.25;
  color: white;
`;

const Dropdown_Menu = styled.div`
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  top: 0;
  right: 0;
  bottom: 100;
  margin: 60px;
  margin-right: 55px;
  padding: 10px;
  background-color: white;
  z-index: 1;
  border: 1px dotted lightgray;
  width: 120px;

  li {
    list-style: none;
    padding: 10px;
    padding-left: 15px;
    margin-bottom: 10px;
    margin-left: 5px;
    align-items: center;
    background-color: white;
    z-index: 1;
    cursor: pointer;
    box-shadow: 2px 0px 6px 1px grey;
    border-radius: 8px;
    color: black;
    font-size: 13px !important;
    font-weight: 600 !important;
    list-style: none;
    &:hover {
      transform: scale(0.92);
      transition: all 0.2s ease-in-out;
      color: #4caf50;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  flex: 0.1;

  .user_profile {
    display: flex;
    justify-content: space-around;
    padding: 0 10px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    font-size: 20px;
    flex-wrap: nowrap;
    margin-bottom: 0px;
  }
  li {
    list-style: none;
    padding: 5px;
    padding-left: 15px;
    margin-bottom: 10px;
    align-items: center;
    background-color: white;
    z-index: 1;
    box-shadow: 2px 0px 6px 1px grey;
    border-radius: 8px;
    color: black;
    font-size: 16px;
    font-weight: 600;
    list-style: none;
    &:hover {
      transform: scale(0.92);
      transition: all 0.2s ease-in-out;
      color: #4caf50;
    }
  }
  .vertical_icon {
    display: none;
  }

  @media (max-width: 768px) {
    .user_profile {
      display: none;
    }
    p {
      display: none;
    }
    .vertical_icon {
      display: block;
    }
  }
`;

const Modal_header = styled(Modal)`
  max-width: 350px;
  min-width: 300px;
  position: fixed;
  top: 0;
  left: 100;
  bottom: 100;
  margin-top: 150px !important;
  box-shadow: 2px 0px 6px 1px grey;
  border-radius: 0px 0px 12px 12px;

  .header_modal {
    border-bottom: 1px dotted lightgray;
    padding: 20px;
  }
  .header_modal p {
    font-size: 20px;
    color: black;
  }

  li {
    list-style: none;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    padding: 10px;
    border-bottom: 1px dotted grey;
    box-shadow: 2px 0px 6px 1px grey;
    border-radius: 0px 0px 12px 12px;
    cursor: pointer;
    &:hover {
      transform: scale(0.96);
      transition: all 0.2s ease-in-out;
      color: #4caf50 !important;
    }
  }
`;

const BurgerMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  min-width: 250px;
  margin-top: 60px;
  background-color: white;
  padding-right: 15px;
  padding-left: 5px;
  padding-top: 15px;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: pointer;
  border-right: 1px dotted grey;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-105%)")};
  li {
    display: flex;
    list-style: none;
    padding: 5px;
    padding-left: 15px;
    margin-bottom: 10px;
    border: 1px solid #4caf50;
    align-items: center;
    background-color: white;
    z-index: 1;
    box-shadow: 2px 0px 6px 1px grey;
    border-radius: 8px;
    color: black;
    font-size: 16px;
    font-weight: 600;
    list-style: none;
    max-height: 30px;
    &:hover {
      transform: scale(0.96);
      transition: all 0.2s ease-in-out;
      color: #4caf50;
    }
  }
  p {
    display: flex;
    text-align: center;
    margin-top: 16px;
  }
`;

// const VerticalMenu = styled.div`
//   position: fixed;
//   background-color: white !important;
//   top: 0;
//   right: 0;
//   width: 150px;
//   margin-top: 60px;
//   padding: 10px;
//   text-decoration: none;
//   list-style: none;
//   cursor: pointer;
//   z-index: 10;
//   display: ${(props) => (props.show ? "block" : "none")}!important;
//   li {
//     list-style: none;
//     padding: 5px;
//     padding-left: 15px;
//     margin-bottom: 10px;
//     align-items: center;
//     background-color: white;
//     z-index: 1;
//     box-shadow: 2px 0px 6px 1px grey;
//     border-radius: 8px;
//     color: black;
//     font-size: 16px;
//     font-weight: 600;
//     list-style: none;
//     &:hover {
//       transform: scale(0.92);
//       transition: all 0.2s ease-in-out;
//       color: #4caf50;
//     }
//   }
// `;
