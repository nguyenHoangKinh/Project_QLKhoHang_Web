import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import Header from '../HomeHeader';
import Navbar from '../HomeNavbar';
import Footer from '../HomeFooter';

const ListOrderPendingPaymentOwner = () => {
  let Token = localStorage.getItem("jsonwebtoken");
  const [ListOrderOwner1, setListOrderOwner0] = useState([]);

  const navigation = useNavigate();
  const orderUnconfirmedOwner = () => {
    navigation("/ListOrderUnconfirmedOwner")
  }
  const ListOrderPendingPaymentOwner = () => {
    navigation("/ListOrderPendingPaymentOwner")
  }
  const ListOrdePaidOwner = () => {
    navigation("/ListOrdePaidOwner")
  }
  const orderOwner = () => {
    navigation("/ShowListOrderOwner")
  }

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/order/listOrderByOwner?status=0`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then((res) => {
        if (res && res.data) {
          let order = res.data.data;
          console.log(order);
          setListOrderOwner0(order);
        }

      })
      .catch((e) => {

      });
  }, []);


  //console.log(ListOrderOwner);

  return (
    <>
      <Header />
      <Navbar />
      <div class="main_content">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="list-group1">
                <a class="list-group-item list-group-item-action" onClick={orderUnconfirmedOwner}>Chờ xác nhận đơn</a>
                <a class="list-group-item list-group-item-action" onClick={ListOrderPendingPaymentOwner}>Chờ thanh toán</a>
                <a class="list-group-item list-group-item-action" onClick={ListOrdePaidOwner}>Đã thanh toán</a>
                <a class="list-group-item list-group-item-action " onClick={orderOwner}>Hóa đơn</a>
              </div>
            </div>
          </div>
          <section class="h-100 h-custom">
            <div class="container h-100 py-5">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" class="h5">Order list</th>
                          <th scope="col" class="h5"></th>
                          <th scope="col" class="h5 text-center">Thanh toán</th>
                          <th scope="col" class="h5">Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ListOrderOwner1.map((item, index) => {
                          return (
                            <tr>
                              <th scope="row">
                                <a href="/#" class="list-group-item">
                                  <div class="d-flex align-items-center">
                                    <div class="flex-column ms-4">
                                      <p class="mb-2">Tên chủ kho: {item.owner.username}</p><p class="mb-2">Thời gian thuê: {item.rentalTime}</p>
                                    </div>
                                  </div>
                                </a>
                              </th>
                              <td class="align-middle">
                              </td>
                              <td class="align-middle text-center"> <a class="myButton"><i class="fa-solid fa-credit-card"></i></a>
                              </td>
                              <td class="align-middle">
                                <a class="myButton"><i class="fa-solid fa-trash"></i></a>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListOrderPendingPaymentOwner;
