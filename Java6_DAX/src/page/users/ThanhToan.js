<<<<<<< HEAD
<<<<<<< HEAD
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../config/ApiConfig/index";

const ThanhToan = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    fetch(`http://localhost:8080/payment/vn-pay?amount=${totalPrice}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.data && data.data.paymentUrl) {
          window.location.href = data.data.paymentUrl; // Chuyển hướng đến URL thanh toán VNPAY
        } else {
          console.error("URL không hợp lệ:", data.message);
        }
      })
      .catch((error) => console.error("Có lỗi xảy ra:", error));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const data = await request({
        method: "GET",
        path: `/api/orders/carts/${userId}`,
      });

      if (data) {
        setCartItems(data);
        calculateTotalPrice(data);
      }
    } catch (error) {
      setError("Error fetching cart items.");
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.skus.price,
      0
    );
    setTotalPrice(total);
  };

  const validateInput = () => {
    const username = document.getElementById("employeeName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!username || !phone || !address || !email) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      setError("Số điện thoại phải có 10 chữ số.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Địa chỉ email không hợp lệ.");
      return false;
    }

    return true;
  };

  const handlePaymentAndOrder = async (paymentId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán."
      );
      return;
    }

    if (!validateInput()) return;

    const username = document.getElementById("employeeName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.skus.price * item.quantity,
      0
    );

    const orderDate = new Date().toISOString();

    const orderEntity = {
      username,
      phone,
      address,
      email,
      paymentId,
      userId,
      orderDetails: cartItems.map((item) => ({
        skusId: item.skus.id,
        price: item.skus.price,
        quantity: item.quantity,
        unitprice: item.skus.price * item.quantity,
      })),
      totalAmount,
      orderDate,
      shippingFee: 0,
      status: "Chờ xác nhận",
      paymentStatus: paymentId === 1 ? false : true,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders/add/${userId}/${paymentId}`,
        orderEntity
      );

      if (response.status === 201) {
        await clearCart(userId);

        setSuccessMessage("Thêm hóa đơn thành công!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        if (paymentId === 1) {
          // Thanh toán qua VNPAY
          fetch(`http://localhost:8080/payment/vn-pay?amount=${totalPrice}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              if (data.data && data.data.paymentUrl) {
                window.location.href = data.data.paymentUrl;
              } else {
                console.error("URL không hợp lệ:", data.message);
              }
            })
            .catch((error) => console.error("Có lỗi xảy ra:", error));
        } else {
          navigate("/history"); // Chuyển hướng về trang chủ nếu thanh toán COD
        }
      } else {
        console.error("Failed to add order:", response.statusText);
        setError(`Failed to add order: ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      setError(`Error adding order: ${errorMessage}`);
      console.error("Error adding order:", errorMessage);
    }
  };

  const clearCart = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/orders/carts/${userId}`
      );

      if (response.status === 200) {
        setCartItems([]);
      } else {
        console.error(
          "Failed to clear cart. Response status:",
          response.status
        );
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError(`Error clearing cart: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-light p-3 rounded shadow-sm">
                <li className="breadcrumb-item">
                  <a
                    href="/giohang"
                    className="text-primary text-decoration-none"
                  >
                    Giỏ hàng
                  </a>
                </li>
                <li
                  className="breadcrumb-item active text-dark"
                  aria-current="page"
                >
                  Thanh toán
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="row pt-5 p-3">
        <div className="col-6">
          <h5 style={{ textAlign: "center" }}>Thông tin đặt hàng</h5>
          <div className="col-8 offset-2 pt-4">
            <form>
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">
                  Tên nhân viên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>

              <hr />
              <div className="pt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    handlePaymentAndOrder(1); // 0 cho VNPAY
                  }}
                >
                  Thanh toán qua VNPAY
                </button>
              </div>
              <div className="pt-3">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ width: "100%" }}
                  onClick={() => handlePaymentAndOrder(2)} // 2 cho COD
                >
                  Thanh toán khi nhận hàng
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-6">
          <div
            className="col-8 offset-2"
            style={{ border: "1px solid rgb(168, 167, 167)", padding: "20px" }}
          >
            <h5 style={{ textAlign: "center" }}>Đơn hàng</h5>

            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            {cartItems.length > 0 ? (
              <>
                <div className="row pt-3">
                  <div className="col-6">
                    <h6>Sản phẩm</h6>
                  </div>
                </div>
                {cartItems.map((item) => (
                  <div className="row pt-3" key={item.id}>
                    <div className="row">
                      <div className="col-6">
                        <h5>{item.skus.product.name}</h5>
                        <ul className="list-unstyled pb-3">
                          {item.skus.attributesSkus &&
                            item.skus.attributesSkus
                              .filter((attr) => attr.attributeOption)
                              .sort((a, b) => {
                                const nameA = a.attributeOption.attributes.name;
                                const nameB = b.attributeOption.attributes.name;

                                // Sắp xếp theo thứ tự "RAM", "Dung lượng", "Màu sắc"
                                if (nameA === "Ram") return -1;
                                if (nameB === "Ram") return 1;
                                if (nameA === "Dung lượng") return -1;
                                if (nameB === "Dung lượng") return 1;
                                if (nameA === "Màu sắc") return -1;
                                if (nameB === "Màu sắc") return 1;
                                return 0;
                              })
                              .map((attr, index, arr) => (
                                <span
                                  key={attr.id}
                                  className="attribute"
                                  style={{
                                    margin: "0 5px",
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    color: "#333",
                                    marginTop: "10px",
                                  }}
                                >
                                  {attr.attributeOption.value}
                                  {index < arr.length - 1 && " - "}
                                </span>
                              ))}
                        </ul>
                        <p style={{ fontSize: "18px" }}>
                          {/* {item.skus.description} */}
                        </p>
                      </div>
                      <div className="col-2">
                        <p>x{item.quantity}</p>
                      </div>
                      <div className="col-4">
                        <h6>{item.skus.price.toLocaleString()} VND</h6>
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="row pt-3">
                  <div className="col-6">
                    <h6>Phí vận chuyển:</h6>
                  </div>
                  <div className="col-6">
                    <h6>Miễn phí</h6>
                  </div>
                </div>
                <hr />
                <div className="row pt-3">
                  <div className="col-6">
                    <h6>Tổng tiền:</h6>
                  </div>
                  <div className="col-6">
                    <h5>{totalPrice.toLocaleString()} VND</h5>
                  </div>
                </div>
              </>
            ) : (
              <p>Giỏ hàng trống.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import React, { Component } from 'react';
// import bannerImage from '../assets/img/ip.jpg'; // Import the image

export default class ThanhToan extends Component {
    render() {
        return (
            <div>
                {/* <div className="page-wrapper">
                    <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
                        <div className="container text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '100px', borderRadius: '110px' }}>
                            
                        </div> */}
                    {/* </div> */}
                  <div class="container mt-4">
    <div class="row">
        <div class="col-lg-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-light p-3 rounded shadow-sm">
                    <li class="breadcrumb-item">
                        <a href="/giohang" class="text-primary text-decoration-none">Giỏ hàng</a>
                    </li>
                    <li class="breadcrumb-item active text-dark" aria-current="page">
                        <a href="/ThanhToan" class="text-primary text-decoration-none">Thanh toán</a>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
</div>

       

                <div className="row pt-5 p-3">
                    <div className="col-6">
                        <h5 style={{ textAlign: 'center' }}>Thông tin đặt hàng</h5>
                        <div className="col-8 offset-2 pt-4">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="customerName" className="form-label">Tên khách hàng</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="customerName"
                                        aria-describedby="helpId"
                                        placeholder=""
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        aria-describedby="helpId"
                                        placeholder=""
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="phoneNumber"
                                        aria-describedby="helpId"
                                        placeholder=""
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="helpId"
                                        placeholder=""
                                    />
                                </div>

                                <hr />
                                <div className="pt-3">
                                    <a
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                        href="/VNPAY" // Corrected href
                                    >
                                        Thanh toán qua VNPAY
                                    </a>
                                </div>
                                <div className="pt-3">
                                    <a
                                        type="button"
                                        className="btn btn-success"
                                        style={{ width: '100%' }}
                                        href="/history" // Corrected href
                                    >
                                        Thanh toán khi nhận hàng
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-6">
                        <div
                            className="col-8 offset-2"
                            style={{ border: '1px solid rgb(168, 167, 167)', padding: '20px' }}
                        >
                            <h5 style={{ textAlign: 'center' }}>Đơn hàng</h5>
                            <div className="row pt-3">
                                <div className="col-6">
                                    <h6>Sản phẩm</h6>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="row">
                                    <div className="col-6">
                                        <h5>Iphone 14 pro max</h5>
                                        <p style={{ fontSize: '18px' }}>
                                            Phiên bản 128GB
                                        </p>
                                    </div>
                                    <div className="col-2">
                                        <p>x1</p>
                                    </div>
                                    <div className="col-4">
                                        <h6>39.000 VND</h6>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="row pt-3">
                                <div className="col-6">
                                    <h6>Phí vận chuyển:</h6>
                                </div>
                                <div className="col-6">
                                    <h6>Miễn phí</h6>
                                </div>
                            </div>

                            <div className="row pt-3">
                                <div className="col-6">
                                    <h6>Giảm giá:</h6>
                                </div>
                                <div className="col-6">
                                    <h6>0</h6>
                                </div>
                            </div>

                            <hr />
                            <div className="row pt-3">
                                <div className="col-6">
                                    <h6>Tổng tiền:</h6>
                                </div>
                                <div className="col-6">
                                    <h5>27.000.000 VND</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
