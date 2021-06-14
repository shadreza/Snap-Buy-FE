import React from 'react';
import './ManageProducts.css';
import axios from 'axios';
import { useForm } from "react-hook-form";

const ManageProducts = () => {

    const removeProduct = (e) => {

    }

    const onSubmit = data => {
        let prdInfo = {
            name:data.name,
            qty:data.qty,
            image:data.image,
            category:data.category,
            supplierID:data.supplierID,
            price:data.price
          }     
          let IMAGE="";
          const img = prdInfo.image[0];
          const imgData = new FormData();
          imgData.set('key','45993c2fa3b2590d51cee87d8ff551a6');
          imgData.append('image',img);
          console.log(img);
          axios.post('https://api.imgbb.com/1/upload',imgData)
          .then(function (response) {
              IMAGE = response.data.data.display_url;
              prdInfo.image=IMAGE;
              console.log(prdInfo);
            //   const url = "https://fierce-lowlands-85167.herokuapp.com/addCourse";
            //   axios.post(url,prdInfo)
            //   .then(res=>{
            //       console.log(res);
            //       console.log("Successful");
            //       alert("Successfully Added");
            //   })
            //   .catch(err=>{
            //       console.log(err.message);
            //       alert("Could Not Be Added");
            //   })                                                                      
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    const { register, handleSubmit, watch, formState} = useForm();

    return (
        <div className="manageProducts-main-div">
            <div className="current-products">
                <div className="manage-prd-header">
                    <h2>Manage Product</h2>
                </div>
                <div className="current-prd">
                    <div className="heading-all-prd">
                        <h3>Connected Products</h3>
                    </div>
                    <div className="all-prd">
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button  value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                        <div className="prd-card">
                            <p>Product 1</p>
                            <button value="prd.email" onClick={(e)=>removeProduct(e)}>Remove Product</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-another-prd">
                <h3>Add Another Product</h3>
                <div className="input-form">


                    <form className="addingProduct" onSubmit={handleSubmit(onSubmit)}>
                        <p><strong>Name</strong></p>
                        <input id="name" placeholder="Name Of The Product" className="inputBox" {...register("name" , { required: true })} />
                        <br/>
                        <br/>
                        <p><strong>Quantity</strong></p>
                        <input id="qty" className="inputBox" placeholder="Quantity" {...register("qty" , { required: true })}/>
                        <br/><br/>
                        <p><strong>Category</strong></p>
                        <input id="category" placeholder="input category"  className="input category" {...register("category" , { required: true })} /> 
                        <br/><br/>
                        <p><strong>Price</strong></p>
                        <input id="price" className="inputBox" type="number" placeholder="Price" {...register("cost" , { required: true })}/>
                        <br/><br/>
                        <p><strong>Supplier Id</strong></p>
                        <input id="supplierID" className="inputBox"  placeholder="input supplier id" {...register("supplierID" , { required: true })}/>
                        <br/><br/>
                        <p><strong>Upload Image</strong></p>
                        <input id="inputImage" className="inputBox" type="file" placeholder="upload image" {...register("image" , { required: true })} />
                        <br/><br/>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;