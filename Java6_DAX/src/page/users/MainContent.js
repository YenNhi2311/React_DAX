import React, { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { Tab, Tabs, Card, Button, Row } from "react-bootstrap";
import axios from "axios";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [error, setError] = useState("");
  const [ratedOrders, setRatedOrders] = useState({});
  const [ratedProducts, setRatedProducts] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/orders/user/${userId}`
        );
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);

          const ratedOrdersMap = response.data.reduce((acc, order) => {
            acc[order.orderId] = order.status === "Đã nhận" && order.rated;
            return acc;
          }, {});

          const ratedProductsMap = response.data.reduce((acc, order) => {
            order.orderDetails.forEach((detail) => {
              acc[detail.skus.product.id] = detail.rated;
            });
            return acc;
          }, {});

          setRatedOrders(ratedOrdersMap);
          setRatedProducts(ratedProductsMap);
        } else {
          throw new Error("Dữ liệu API không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu");
      }
    };

    fetchOrders();
  }, [userId]);

  const filterOrdersByStatus = (status) => {
    if (status === "all") return orders;
    return orders.filter((order) => order.status === status);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/${orderId}`,
        { status: "Đã hủy" }
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: "Đã hủy" } : order
          )
        );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      setError("Không thể hủy đơn hàng");
    }
  };

  const handleRateOrder = (orderId, productId) => {
    if (ratedOrders[orderId]) {
      alert("Bạn đã đánh giá đơn hàng này rồi.");
      return;
    }

    if (ratedProducts[productId]) {
      alert("Sản phẩm này đã được đánh giá.");
      return;
    }

    setRatedProducts((prev) => ({ ...prev, [productId]: true }));
    setRatedOrders((prev) => ({ ...prev, [orderId]: true }));
    navigate(`/danhgia/${orderId}/${productId}`);
  };

  const getPaymentStatus = (order) => {
    if (order.payment.paymentType === false) {
      return "Đã thanh toán";
    } else if (order.payment.paymentType === true) {
      if (
        order.status === "Chờ xác nhận" ||
        order.status === "Đang vận chuyển"
      ) {
        return "Chưa thanh toán";
      } else if (order.status === "Đã nhận") {
        return "Đã thanh toán";
      }
    }
    return "Không xác định";
  };

  const handleMarkAsReceived = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/${orderId}`,
        { status: "Đã nhận" },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId
              ? { ...order, status: "Đã nhận", paymentStatus: true }
              : order
          )
        );
        setRatedOrders((prev) => ({
          ...prev,
          [orderId]: true,
        }));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      setError("Không thể cập nhật trạng thái");
    }
  };

  const sortAttributes = (attributes) => attributes.sort((a, b) => a.id - b.id);

  const Order = ({ orders }) => {
    if (!orders.length) return <div>Không có đơn hàng nào</div>;

    return (
      <div>
        {orders.map((order) => (
          <Card className="order-item mb-3 bg-light" key={order.orderId}>
            <Card.Body className="d-flex align-items-center mb-3">
              <div className="container bg-white">
                <div className="p-3">
                  <div className="section1 mb-3">
                    <div className="d-inline">
                      <span className="font-weight-bold mr-2">
                        {order.username || "N/A"}
                      </span>
                      <span> -</span>
                      <span className="px-2">{order.address || "N/A"}</span>
                      <span className="px-2">{order.phone || "N/A"}</span>
                    </div>
                    <div
                      className={`float-end text-${
                        order.status === "Chờ xác nhận"
                          ? "warning"
                          : order.status === "Đã nhận"
                          ? "success"
                          : "secondary"
                      }`}
                    >
                      {order.status ? order.status.toUpperCase() : "N/A"}
                    </div>
                  </div>
                  <hr />
                  <div className="section2">
                    {(order.orderDetails || []).map((orderDetail, index) => (
                      <div className="row mb-5" key={index}>
                        <div className="col-2">
                          {orderDetail.skus.product.imgUrl ? (
                            <img
                              src={`/assets/img/${orderDetail.skus.product.imgUrl}`}
                              alt="Hình ảnh loại"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              Không có hình ảnh
                            </Typography>
                          )}
                        </div>
                        <div className="col-8">
                          <div className="d-flex justify-content-between">
                            <div>
                              <span
                                className="font-weight-normal"
                                style={{ fontSize: "20px", fontWeight: 500 }}
                              >
                                {orderDetail.skus.product.name || "N/A"}
                              </span>
                              <span>
                                <span
                                  className="font-weight-normal"
                                  style={{ fontSize: "16px" }}
                                >
                                  {sortAttributes(
                                    orderDetail.skus?.attributesSkus || []
                                  ).map((attribute, index) => (
                                    <Typography
                                      key={attribute.id}
                                      sx={{ display: "inline" }}
                                    >
                                      {" - "}
                                      {attribute.attributeOption?.value ||
                                        "N/A"}
                                      {index <
                                        orderDetail.skus?.attributesSkus
                                          .length -
                                          1}
                                    </Typography>
                                  ))}
                                </span>
                              </span>
                            </div>
                          </div>
                          <span className="d-block font-weight-bold mb-2">
                            x{orderDetail.quantity || 0}
                          </span>
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-center">
                          <span className="text-success">
                            {orderDetail.unitPrice || "N/A"} VND
                          </span>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          {order.status === "Đã nhận" &&
                            !ratedProducts[orderDetail.skus.product.id] && (
                              <Button
                                type="button"
                                className="btn btn-success mr-2"
                                style={{ borderRadius: 0 }}
                                onClick={() =>
                                  handleRateOrder(
                                    order.orderId,
                                    orderDetail.skus.product.id
                                  )
                                }
                              >
                                Đánh giá
                              </Button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <row>
                    <div className="section3 col-6 ">
                      <span>Thành tiền:</span>
                      <span
                        className="ml-5 text-success"
                        style={{
                          fontSize: "20px",
                          marginLeft: "10px",
                          marginTop: "-3px",
                        }}
                      >
                        {order.totalAmount || "0"} VND
                      </span>
                    </div>
                    <div className="section3 col-6 ">
                      <span>Trạng thái thanh toán:</span>
                      <span
                        className="ml-5 text-success"
                        style={{
                          fontSize: "20px",
                          marginLeft: "10px",
                          marginTop: "-3px",
                        }}
                      >
                        {order.paymentStatus === true
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </span>
                    </div>
                  </row>
                  <div className="section4 d-flex justify-content-end mt-3">
                    {order.status === "Chờ xác nhận" && (
                      <Button
                        type="button"
                        className="btn btn-dark mr-2"
                        style={{ borderRadius: 0 }}
                        onClick={() => handleCancelOrder(order.orderId)}
                      >
                        Hủy đơn
                      </Button>
                    )}
                    {order.status === "Đang vận chuyển" && (
                      <Button
                        type="button"
                        className="btn btn-primary mr-2"
                        style={{ borderRadius: 0 }}
                        onClick={() => handleMarkAsReceived(order.orderId)}
                      >
                        Đã nhận hàng
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  if (error) return <div>Error: {error}</div>;

  if (!orders.length) return <div>Loading...</div>;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import { Tab, Tabs } from "react-bootstrap";
import request from "../../config/ApiConfig/index";
import Order from "../../component/user/Order";

const MainContent = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const fetchOrders = async (status) => {
    try {
      const response = await request({
        method: "GET",
        path: `/api/orders?status=${status === "all" ? "" : status}`,
      });
      setOrders(response);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === selectedStatus)
      );
    }
  }, [orders, selectedStatus]);
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

  return (
    <div className="main-content container mt-5 mb-5">
      <Tabs
        defaultActiveKey="all"
        id="order-tabs"
        onSelect={(key) => setSelectedStatus(key)}
      >
        <Tab eventKey="all" title="Tất cả">
<<<<<<< HEAD
<<<<<<< HEAD
          <Order orders={filterOrdersByStatus("all")} />
        </Tab>
        <Tab eventKey="Chờ xác nhận" title="Chờ xác nhận">
          <Order orders={filterOrdersByStatus("Chờ xác nhận")} />
        </Tab>
        <Tab eventKey="Đang vận chuyển" title="Đang vận chuyển">
          <Order orders={filterOrdersByStatus("Đang vận chuyển")} />
        </Tab>
        <Tab eventKey="Đã nhận" title="Đã nhận">
          <Order orders={filterOrdersByStatus("Đã nhận")} />
        </Tab>
        <Tab eventKey="Đã hủy" title="Đã hủy">
          <Order orders={filterOrdersByStatus("Đã hủy")} />
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          <Order orders={filteredOrders} />
        </Tab>
        <Tab eventKey="Chờ xác nhận" title="Chờ xác nhận">
          <Order orders={filteredOrders} />
        </Tab>
        <Tab eventKey="Đang vận chuyển" title="Vận chuyển">
          <Order orders={filteredOrders} />
        </Tab>
        <Tab eventKey="Đã nhận" title="Hoàn thành">
          <Order orders={filteredOrders} />
        </Tab>
        <Tab eventKey="Đã hủy" title="Đã hủy">
          <Order orders={filteredOrders} />
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        </Tab>
      </Tabs>
    </div>
  );
};

export default MainContent;
