import React, { useState, useEffect, useContext } from "react";
import { search_product_context } from "../App";
import { basket } from "../App";
import Product from "../Product/Product";
import { auth } from "../Authentication/firebase";
import { useStateValue } from "../StateProvider";
import Navbar from "../Navbar";
import axios from "axios";
import "./Home.css";
import Carousel from "./Carousel";
import Carousel_3slider from "./Carousel_3slider";

const Home = () => {
  const search_value = useContext(search_product_context);
  const [count, setCount] = useState(0);
  const basketContext = useContext(basket);
  const [allProduct, setAllProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [{ cart, user }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get("http://localhost:3001/api/get/product").then((response) => {
      setAllProduct(response.data);
      console.log(allProduct);
    });
  }, []);
  const [searchTerm, setSearchTerm] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = allProduct.filter((item) =>
      item.PRODUCT_NAME.includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const addToCart = (prd) => {
    basketContext[1]((cart) => [...basketContext[0], prd]);
  };

  return (
    <div>
      <Navbar searchTerm={searchTerm} handleChange={handleChange} />
      <div>
        {searchTerm === null || searchTerm?.length === 0 ? (
          <>
            <Carousel />
            <div className="home_div">
              <Carousel_3slider />

              <section id="services-container">
                <h1 class="h-primary center">Our Services</h1>
                <div id="services">
                  <div class="box">
                    <img
                      src="logo_banner\del.png"
                      height="150px"
                      width="150px"
                    ></img>
                    <h2 class="h-secondary center">Fastest Delivery</h2>
                    <p class="center">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quidem, culpa suscipit error Lorem ipsum dolor sit, amet
                      consectetur adipisicing elit. Et qui, repudiandae
                      similique nam, recusandae quidem ab asperiores ex, aut
                      fugit labore veritatis facere? sint delectus ab dolorum
                      nam. Debitis facere, incidunt voluptates eos, mollitia
                      voluptatem iste sunt voluptas beatae facilis labore, omnis
                      sint quae eum.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          <div className="home_div" style={{ marginTop: "80px" }}>
            {searchResults.map((item) => {
              return <Product product={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
