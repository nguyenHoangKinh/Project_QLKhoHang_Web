import React, { useState, useEffect } from "react";
import "../theme/ListWarehouseUser.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { jwtDecode } from "jwt-decode";

export default function ListWarehouseUser() {
    const [listWarehouseUser, setListWarehouseUser] = useState();
    const [categoryId, setCategoryId] = useState("0");
    const [listCategoryUser, setListCategoryUser] = useState();
    const [textSearch, setTextSearch] = useState();
    let token = localStorage.getItem("jsonwebtoken");

    useEffect(() => {
        //call api
        axios.get(BASE_URL + '/warehouse/listWarehouseUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setListWarehouseUser(res.data.warehouse);
        }).catch((error) => {
            console.log(error.message);
        });

        axios.get(BASE_URL + '/warehouse/category/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setListCategoryUser(res.data.categories);
        }).catch((error) => {
            console.log(error.message);
        });
    }, []);

    function handleSelectCatagory(event) {
        setCategoryId(event.target.value)
    }

    function handleSearchWarehouse(event) {
        var input, filter;
        input = event.target.value;
        filter = input.toLowerCase();
        setTextSearch(filter);
    }

    return (
        <>
            <h1>List Warehouse User</h1>
            <div className="d-flex justify-content-center mt-3">
                <input type="text" id="myInput" onChange={handleSearchWarehouse} placeholder="Search for names.." title="Type in a name"></input>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <div className="w-75 p-2 border rounded">
                    <h5>Catagory</h5>
                    <select className="form-select"
                        onChange={handleSelectCatagory}
                    >
                        {listCategoryUser
                            && listCategoryUser.length > 0
                            && listCategoryUser.map(item => (
                                <option value={item._id}>{item.name}</option>

                            ))}
                        <option value={0}>Tất cả kho hàng</option>
                    </select>
                    {/* <p>{categoryId}</p> */}
                </div>
            </div>
            <div className="listwarehouseuser">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Warehouse Name</th>
                            <th>Address</th>
                            <th>Category</th>
                            <th>Capacity</th>
                            <th>Monney (VND)</th>
                            <th>Description</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    {listWarehouseUser ? (listWarehouseUser.length > 0 &&
                        listWarehouseUser.map((itemWarehouse, index) => {
                            if (categoryId && itemWarehouse.category._id.includes(categoryId) || categoryId == 0) {
                                if (itemWarehouse.wareHouseName.toLowerCase().includes(textSearch) || !textSearch) {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{itemWarehouse.wareHouseName}</td>
                                                <td>{itemWarehouse.address}</td>
                                                <td>{itemWarehouse.category.name}</td>
                                                <td>{itemWarehouse.capacity}</td>
                                                <td>{itemWarehouse.monney}</td>
                                                <td>{itemWarehouse.description}</td>
                                                <td>{itemWarehouse.owner.username}</td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            }
                        })) : (
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <td className="emptyWarehouse">Không có kho hàng</td>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    )}
                </table>
            </div>
        </>
    );
}
