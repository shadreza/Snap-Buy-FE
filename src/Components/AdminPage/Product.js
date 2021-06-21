import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin_Sidebar from "./Admin_Sidebar";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./Employee.css";

const ManageProducts = () => {
  const [error, setError] = useState(0);
  const [newPrdId, setNewPrdId] = useState("");
  const [newSupId, setNewSupId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/get/new_product_id")
      .then((response) => {
        setNewPrdId(response.data);
      });
    axios
      .get("http://localhost:3001/api/get/new_supplier_id")
      .then((response) => {
        setNewSupId(response.data);
      });
  }, []);

  const removeProduct = (e) => {};
  //
  const onSubmit = (data) => {
    let prdInfo = {
      name: data.name,
      qty: data.qty,
      image: data.image,
      category: data.category,
      productID: newPrdId,
      price: data.price,
      supplierID: data.supplierId,
    };

    console.log(prdInfo.image);

    if (
      prdInfo.name.length === 0 &&
      prdInfo.qty.length === 0 &&
      prdInfo.image.length === 0 &&
      prdInfo.category.length === 0 &&
      prdInfo.price.length === 0 &&
      prdInfo.supplierID.length === 0
    ) {
      setError(100);
      toast.error("Fill up the form!!!", {
        position: "top-center",
      });
    } else if (data.name.length === 0) {
      toast.error("Fill up the Name!!!", {
        position: "top-center",
      });
      setError(1);
    } else if (data.qty.length === 0) {
      toast.error("Fill up the Quantity!!!", {
        position: "top-center",
      });
      setError(2);
    } else if (prdInfo.price.length === 0) {
      toast.error("Fill up price!!!", {
        position: "top-center",
      });
      setError(3);
    } else if (prdInfo.category.length === 0) {
      toast.error("Fill up category!!!", {
        position: "top-center",
      });
      setError(4);
    } else if (prdInfo.supplierID.length === 0) {
      toast.error("Fill up supplier id !!!", {
        position: "top-center",
      });
      setError(5);
    } else if (prdInfo.image.length === 0) {
      toast.error("Upload Image !!!", {
        position: "top-center",
      });
      setError(6);
    } else {
      let IMAGE = "";
      const img = prdInfo.image[0];
      const imgData = new FormData();
      imgData.set("key", "45993c2fa3b2590d51cee87d8ff551a6");
      imgData.append("image", img);
      console.log(img);
      axios
        .post("https://api.imgbb.com/1/upload", imgData)
        .then(function (response) {
          IMAGE = response.data.data.display_url;
          prdInfo.image = IMAGE;
          console.log(prdInfo);
          //   const url = "https://fierce-lowlands-85167.herokuapp.com/addCourse";
          axios.post("http://localhost:3001/api/insert/product", {
            name: prdInfo.name,
            qty: prdInfo.qty,
            image: prdInfo.image,
            category: prdInfo.category,
            productID: newPrdId,
            price: prdInfo.price,
          });
          axios.post("http://localhost:3001/api/insert/supplies", {
            supplierID: prdInfo.supplierID,
            productID: newPrdId,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const { register, handleSubmit, watch, formState } = useForm();

  return (
    <>
      <Admin_Sidebar />
      <div>
        <div className="employee">
          <h2>Add Another Product</h2>
          <div className="ui equal width form" id="employee_form">
            <div
              className={error === 1 || error === 100 ? "field error" : "field"}
            >
              <label>Product Name*</label>
              <input
                placeholder="Product Name"
                type="text"
                className="first_name"
                id="name"
                style={{ height: "20px" }}
                {...register("name", { required: true })}
              />
            </div>
            <div
              className={error === 2 || error === 100 ? "field error" : "field"}
            >
              <label>Product Quantity*</label>
              <input
                placeholder="Product Quantity"
                type="text"
                className="qty"
                id="qty"
                style={{ height: "20px" }}
                {...register("qty", { required: true })}
              />
            </div>
            <div
              className={error === 3 || error === 100 ? "field error" : "field"}
            >
              <label>Product Price*</label>
              <input
                placeholder="Price"
                type="text"
                className="price"
                id="price"
                style={{ height: "20px" }}
                {...register("price", { required: true })}
              />
            </div>
            <div
              className={error === 4 || error === 100 ? "field error" : "field"}
            >
              <label>Product Category*</label>
              <input
                placeholder="Product Category"
                type="text"
                className="category"
                id="category"
                style={{ height: "20px" }}
                {...register("category", { required: true })}
              />
            </div>
            <div
              className={error === 5 || error === 100 ? "field error" : "field"}
            >
              <label>Supplier ID*</label>
              <input
                placeholder="Supplier ID"
                type="text"
                className="supplierId"
                id="supplierId"
                style={{ height: "20px" }}
                {...register("supplierId", { required: true })}
              />
            </div>
            <div
              className={error === 6 || error === 100 ? "field error" : "field"}
            >
              <label>Product Image*</label>
              <input
                placeholder="Product Image"
                type="file"
                className="inputBox"
                id="inputImage"
                style={{ height: "20px" }}
                {...register("image", { required: true })}
              />
            </div>
           <button
              className="positive ui button"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    </>
  );
};

export default ManageProducts;
