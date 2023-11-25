import React, { useState } from "react";
import { addWare } from "../WareReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import {jwtDecode}  from "jwt-decode"
import axios from "axios";

function Create() {
  let Token = localStorage.getItem("jsonwebtoken");
  let idUser= jwtDecode(Token)
  // const [records, setRecords] = useState([]);
  const [inputData, setInputData] = useState({
    wareHouseName: "",
    address: "",
    category: "",
    capacity: "",
    monney: "",
    status: "",
    description: "",
    owner: idUser.id
  });
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    let product = {
      wareHouseName: inputData.wareHouseName,
      address: inputData.address,
      category: inputData.category,
      capacity: inputData.capacity,
      monney: inputData.monney,
      status: inputData.status,
      description: inputData.description,
      owner: inputData.owner
  }
  console.log(product)
    axios
      .post(
        BASE_URL+`/warehouse/create`,
        product,
        {
          headers: {
            token:Token,
          },
          params: {
            id_owner: idUser.id
          }
        }
      )
      .then((res) => {
        //setInputData(Object, res.data)
        console.log(res);
        alert("Them thanh cong");
        navigate("/HomeScreen");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-100 border bg-secondary text-white p-5">
        <h3>Them Kho Moi</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="wareHouseName">Ten:</label>
            <input
              type="text"
              name="wareHouseName"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, wareHouseName : e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="address">Dia chi:</label>
            <input
              type="text"
              name="address"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, address: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="category">Danh muc</label>
            <input
              type="text"
              name="category"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, category: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="capacity">Dung Tich</label>
            <input
              type="text"
              name="capacity"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, capacity: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="monney">Tien</label>
            <input
              type="text"
              name="monney"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, monney: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="status">Trang Thai</label>
            <input
              type="text"
              name="status"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, status: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="description">Mo ta</label>
            <input
              type="text"
              name="description"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, description: e.target.value })
              }
            />
          </div>
          
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
