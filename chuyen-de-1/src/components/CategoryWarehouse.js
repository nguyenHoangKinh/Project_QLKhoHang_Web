import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import React,{ useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { Logout } from "../services/UserServices";
import { Alert } from "bootstrap";

const CategoryWarehouse = () => {
  let Token = localStorage.getItem("jsonwebtoken");
  const [ListCategory, setListCategory] = useState([]);
  useEffect(() => {
    //call api
    axios.get(BASE_URL+'/warehouse/category/list', {
      headers: {
         token: Token
      }
   }).then((res) => {
    if (res && res.data && res.data.categories) {
       setListCategory(res.data.categories);
     }
   }).catch((error)=>{
    Alert.Alert(error.message);
   });
  }, []);
  const LogoutToken = () => {
    Logout(Token);
  };
  return (
    <div className="category-containers">
    <ListGroup className="category-row">
      {ListCategory &&
        ListCategory.length > 0 &&
        ListCategory.map((item, index) => {
          return <ListGroup.Item className="category-item">{item.name}</ListGroup.Item>;
        })}
    </ListGroup>
    <button onClick={LogoutToken}>Logout</button>
    </div>
  );
};

export default CategoryWarehouse;
