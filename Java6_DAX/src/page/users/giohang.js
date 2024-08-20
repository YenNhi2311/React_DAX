<<<<<<< HEAD
<<<<<<< HEAD
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the product ID
import "../../assets/css/templatemo.css";
import request from "../../config/ApiConfig/index"; // Import request function configured with axios

const GioHang = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState({});
  const [skus, setSkus] = useState([]);
  const [selectedSku, setSelectedSku] = useState({});
  const [imgProduct, setImgProduct] = useState(require('../../assets/img/iphone-15-den-1.jpg'));
  const [colorImages, setColorImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch product details and SKUs
      axios.get(`http://localhost:8080/api/products/${id}`)
        .then(response => {
          const productData = response.data;
          setProduct(productData);
          setImgProduct(productData.imgUrl ? `/assets/img/${productData.imgUrl}` : require('../../assets/img/iphone-15-den-1.jpg'));

          axios.get(`http://localhost:8080/api/skus/product/${id}`)
            .then(skusResponse => {
              const skus = skusResponse.data;
              setSkus(skus);
              setSelectedSku(skus[0] || {});

              const colorImgs = skus
                .flatMap(sku =>
                  sku.attributesSkus
                    .filter(attr => attr.attributeOption.attributes.name === 'Màu')
                    .map(attr => attr.attributeOption.img)
                );
              setColorImages([...new Set(colorImgs)]);
            })
            .catch(error => console.error('Error fetching SKUs:', error));
        })
        .catch(error => console.error('Error fetching product data:', error));
    }

    fetchCartItems();
  }, [id]); // Fetch data when `id` changes

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
      console.error("Error fetching cart items:", error);
    }
  };

  const deleteItem = async (skuId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      await request({
        method: "DELETE",
        path: `/api/orders/cart/delete/${userId}/${skuId}`,
      });
      fetchCartItems(); // Re-fetch cart items to update the UI
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity, skuId, productId) => {
    if (newQuantity <= 0) return; // Prevent setting quantity to zero or negative

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      // Optimistically update the UI
      const updatedItems = cartItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);

      // Send the request to the server
      const response = await request({
        method: "POST",
        path: `/api/orders/cart/update/${userId}/${skuId}/${productId}/${newQuantity}`,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      fetchCartItems(); // Re-fetch items to ensure data consistency
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + (item.quantity * (item.skus?.price || 0)),
      0
    );
    setTotalPrice(total);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="row p-3 pt-5">
      <div className="col-md-8" style={{ borderRight: "2px solid rgb(202, 200, 200)" }}>
        <div className="table-responsive" style={{ height: "500px", overflow: "auto" }}>
          <table className="table">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th scope="col"></th>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: "100px" }}>
                      <img
                        src={`/assets/img/${item.skus.product.imgUrl}`}
                        alt={item.skus.product.name}
                        style={{ maxWidth: "100px" }}
                      />
                    </td>
                    <td>
                      <h5>{item.skus.product.name}</h5>
                    
                      <ul className="list-unstyled pb-3" style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        padding: '5px 10px',
                        margin: 0, 
                        border: '1px solid black', 
                        borderRadius: '50px',
                        backgroundColor: '#f9f9f9',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: 'fit-content',
                        textAlign: 'center'
                      }}>
                        {item.skus.attributesSkus &&
                          item.skus.attributesSkus
                            .filter(attr => attr.attributeOption)
                            .sort((a, b) => {
                              const nameA = a.attributeOption.attributes.name;
                              const nameB = b.attributeOption.attributes.name;

                              // Sắp xếp theo thứ tự "RAM", "Dung lượng", "Màu sắc"
                              if (nameA === 'Ram') return -1;
                              if (nameB === 'Ram') return 1;
                              if (nameA === 'Dung lượng') return -1;
                              if (nameB === 'Dung lượng') return 1;
                              if (nameA === 'Màu sắc') return -1;
                              if (nameB === 'Màu sắc') return 1;
                              return 0;
                            })
                            .map((attr, index, arr) => (
                              <span key={attr.id} className="attribute" style={{
                                margin: '0 5px',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                color: '#333',
                                marginTop: '10px'
                              }}>
                                {attr.attributeOption.value}
                                {index < arr.length - 1 && ' - '}
                              </span>
                            ))
                        }
                      </ul>
</td>
                    <td style={{ textAlign: "center" }}>
                      {item.skus.price.toLocaleString()} VND
                    </td>
                    <td style={{ textAlign: "center", width: "160px" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-outline-secondary me-2"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.skus.id, item.skus.product.id)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control text-center"
                          style={{
                            width: "80px",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.skus.id, item.skus.product.id)
                          }
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {(item.quantity * item.skus.price).toLocaleString()} VND
                    </td>
                    <td>
                      <button
                        onClick={() => deleteItem(item.skus.id)}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Giỏ hàng của bạn đang trống
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-md-4">
        <div className="text-center">
          <h4 className="text-danger">Tổng hóa đơn</h4>
        </div>

        <div className="row pt-3" style={{ textAlign: "center", justifyContent: "center" }}>
          <div className="col-6">
            <p>Tổng đơn hàng:</p>
          </div>
          <div className="col-6">
            <h6>{totalPrice.toLocaleString()} VND</h6>
          </div>
        </div>
        <div className="pt-3">
          <a
            type="button"
            className="btn btn-danger"
            style={{ width: "100%" }}
            href="/ThanhToan"
          >
            Thanh toán
          </a>
        </div>
      </div>
    </div>
  );
};

export default GioHang;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import React, { Component } from "react";
import "../../assets/css/fontawesome.css";
import "../../assets/css/fontawesome.min.css";
import "../../assets/css/slick-theme.css";
import "../../assets/css/slick-theme.min.css";
import "../../assets/css/slick.min.css";
import "../../assets/css/templatemo.css";
import "../../assets/css/templatemo.min.css";

export default class GioHang extends Component {
  render() {
    return (
      <div className="row p-3 pt-6">
        <div
          className="col-8"
          style={{ borderRight: "2px solid rgb(202, 200, 200)" }}
        >
          <div
            className="table-responsive"
            style={{ height: "500px", overflow: "auto" }}
          >
            <table className="table">
              <thead>
                <tr style={{ alignItems: "center", textAlign: "center" }}>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col"></th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tạm tính</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(1)].map((_, index) => (
                  <tr key={index}>
                    <td scope="col">
                      <img
                        className="img-fluid"
                        src={require("../../assets/img/th.jpg")}
                        alt=""
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      <h5>Iphone 14 pro max</h5>
                    </td>
                    <td
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      27.000.000 VND
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        width: "130px",
                      }}
                    >
                      <div className="form-info__action">
                        <button
                          type="button"
                          id="increase"
                          className="btn form-action__handle form-action__handle--blue form-action__handle--circle"
                        >
                          -
                        </button>
                        <input
                          id="quantity"
                          className="form-action__quantity ms-2 me-2"
                          type="text"
                          value="1"
                          name="quantity"
                          readOnly
                          style={{
                            border: "none",
                            width: "10px",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        />
                        <button
                          type="button"
                          id="decrease"
                          className="btn form-action__handle form-action__handle--blue form-action__handle--circle"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      27.000.000 VND
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <i className="fa-solid fa-square-xmark"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-4">
          <div className="text-center">
            <h4 className="text">Tổng hóa đơn</h4>
          </div>
          <div
            className="row pt-3"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <div className="col-6">
              <p>Tạm tính:</p>
            </div>
            <div className="col-6">
              <h6>27.000.000 VND</h6>
            </div>
          </div>

          <div
            className="row pt-3"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <div className="col-6">
              <p>Giao hàng đến:</p>
            </div>
            <div className="col-6">
              <h6>lê bình,cái răng,cần thơ</h6>
            </div>
          </div>

          <div
            className="row pt-3"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <div className="col-6">
              <p>Phí vận chuyển:</p>
            </div>
            <div className="col-6">
              <h6>Miễn phí</h6>
            </div>
          </div>

          <div
            className="row pt-3"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <div className="col-6">
              <p>Tổng đơn hàng:</p>
            </div>
            <div className="col-6">
              <h6>27.000.000 VND</h6>
            </div>
          </div>
          <div className="pt-3">
            <a
              type="button"
              className="btn btn-success"
              style={{ width: "100%" }}
              href="/ThanhToan" // Corrected href
            >
              Thanh toán
            </a>
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
