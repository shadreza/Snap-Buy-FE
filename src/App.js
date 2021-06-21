import Admin_Sidebar from "./Components/AdminPage/Admin_Sidebar";
import Customer from "./Components/AdminPage/Customer";
import Employee from "./Components/AdminPage/Employee";
import Supplier from "./Components/AdminPage/Supplier";
import Get_Cust_Name_From_Order_Id from "./Components/AdminPage/Get_Cust_Name_From_Order_Id";
import Supplier_Info from "./Information/Supplier_Info";
import Employee_Info from "./Information/Employee_Info";
import Product_Info from "./Information/Product_Info";
import Product from "./Components/AdminPage/Product";
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin_login from "./Information/Admin_login";
import Home from "./Home/Home";
import Profile from "./User/Profile";
import Signin from "./Authentication/Signin";
import Signup from "./Authentication/Signup";
import Navbar from "./Navbar";
import { auth } from "./Authentication/firebase";
import { useStateValue } from "./StateProvider";
import Order_Details from "./User/Order_Details";
import Payment_details from "./User/Payment_details";
import Checkout from "./User/Checkout";
import All_Products from "./Product/All_Products";
import Fresh_Products from "./Product/Fresh_Products";
import Grocery from "./Product/Grocery";
import Dairy from "./Product/Dairy";
import Fish from "./Product/Fish";
import Meat_and_Chicken from "./Product/Meat_and_Chicken";
import Bakery_and_Snacks from "./Product/Bakery_and_Snacks";

export const search_product_context = createContext();
export const loggedInUser = createContext();

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser.email);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser.email,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  const [searchProduct, setSearchProduct] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  return (
    <Router>
      <search_product_context.Provider
        value={[searchProduct, setSearchProduct]}
      >
        <loggedInUser.Provider value={[loggedUser, setLoggedUser]}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sidebar" component={Admin_Sidebar} />
            <Route path="/info/customer" component={Customer} />
            <Route path="/overview/supplier" component={Supplier} />
            <Route path="/overview/employee" component={Employee} />
            <Route path="/info/supplier" component={Supplier_Info} />
            <Route path="/info/employee" component={Employee_Info} />
            <Route path="/info/product" component={Product_Info} />
            <Route path="/admin_login" component={Admin_login} />
            <Route path="/product" component={Product} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/Profile" component={Profile} />
            <Route path="/order_details" component={Order_Details} />
            <Route path="/payment_details" component={Payment_details} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/all_products" component={All_Products} />
            <Route path="/fresh_products" component={Fresh_Products} />
            <Route path="/grocery" component={Grocery} />
            <Route path="/dairy" component={Dairy} />
            <Route path="/fish" component={Fish} />
            <Route path="/meat_and_chicken" component={Meat_and_Chicken} />
            <Route path="/bakery_and_snacks" component={Bakery_and_Snacks} />
            <Route
              path="/get_cust_name_from_order_id"
              component={Get_Cust_Name_From_Order_Id}
            />
          </Switch>
        </loggedInUser.Provider>
      </search_product_context.Provider>
    </Router>
  );
}
export default App;
