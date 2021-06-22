import React, { useState, useEffect } from "react";
import SubMenu from "./SubMenu";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import axios from "axios";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Admin_Sidebar = () => {
  const SidebarData = [
    {
      title: "Add",
      path: "/overview",
      icon: <AiIcons.AiFillHome />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,

      subNav: [
        {
          title: "Supplier",
          path: "/overview/supplier",
          icon: <IoIcons.IoIosPaper />,
        },
        {
          title: "Employee",
          path: "/overview/employee",
          icon: <IoIcons.IoIosPaper />,
        },
      ],
    },
    {
      title: "Information",
      path: "/info",
      icon: <IoIcons.IoIosPaper />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,

      subNav: [
        {
          title: "Supplier Info",
          path: "/info/supplier",
          icon: <IoIcons.IoIosPaper />,
          cName: "sub-nav",
        },
        {
          title: "Employee Info",
          path: "/info/employee",
          icon: <IoIcons.IoIosPaper />,
          cName: "sub-nav",
        },
        {
          title: "Customer",
          path: "/info/customer",
          icon: <IoIcons.IoIosPaper />,
        },
        {
          title: "Product",
          path: "/info/product",
          icon: <IoIcons.IoIosPaper />,
        },
      ],
    },
    {
      title: "Products",
      path: "/product",
      icon: <FaIcons.FaCartPlus />,
    },
  ];

  const [getSupplierID, setGetSupplierID] = useState("");
  const [gotSupplierData, setGotSupplierData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/get/supplier").then((response) => {
      setGotSupplierData(response.data);
    });
    axios
      .get("http://localhost:3001/api/get/new_supplier_id")
      .then((response) => {
        setGotSupplierData(response.data);
      });
  }, []);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};

export default Admin_Sidebar;
