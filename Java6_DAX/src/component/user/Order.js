import React from "react";
import { Card, Button } from "react-bootstrap";
<<<<<<< HEAD
<<<<<<< HEAD

const Order = ({ orders }) => {
  if (!orders || !Array.isArray(orders)) return <div>Loading...</div>;

  if (orders.length === 0) {
    return <div>Không có đơn hàng nào</div>;
  }

  return (
    <div>
      {orders.map((order) => {
        // Debug logging
        console.log("Order data:", order);

        return (
          <Card className="order-item mb-3 bg-light" key={order?.orderId}>
            <Card.Body className="d-flex align-items-center mb-3">
              <div className="container bg-white">
                <div className="p-3">
                  <div className="section1 mb-3">
                    <div className="d-inline">
                      <span className="font-weight-bold mr-2">
                        {order?.username || "N/A"}
                      </span>
                      <span> -</span>
                      <span className="px-2">{order?.address || "N/A"}</span>
                      <span className="px-2">{order?.phone || "N/A"}</span>
                    </div>
                    <div
                      className={`float-end text-${
                        order?.status === "Chờ xác nhận"
                          ? "warning"
                          : order?.status === "Đã nhận"
                          ? "success"
                          : "secondary"
                      }`}
                    >
                      {order?.status ? order.status.toUpperCase() : "N/A"}
                    </div>
                  </div>
                  <hr />
                  <div className="section2">
                    {(order?.orderDetails || []).map((orderDetail, index) => (
                      <div className="row mb-2" key={index}>
                        <div className="col-2">
                          <img
                            src={orderDetail?.skus?.product?.imgUrl || ""}
                            alt={orderDetail?.skus?.product?.name || "Product"}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-8">
                          <div className="d-flex justify-content-between">
                            <div>
                              <span
                                className="font-weight-normal"
                                style={{ fontSize: "20px" }}
                              >
                                {orderDetail?.skus?.product?.name || "N/A"}
                              </span>
                              <span className="px-2">-</span>
                              <span>
                                <span
                                  className="font-weight-normal"
                                  style={{ fontSize: "16px" }}
                                >
                                  {(orderDetail?.skus?.attributesSkus || [])
                                    .map(
                                      (optionSku) =>
                                        optionSku?.attributeOption?.value
                                    )
                                    .join(", ") || "N/A"}
                                </span>
                              </span>
                            </div>
                          </div>
                          <span className="d-block font-weight-bold mb-2">
                            x{orderDetail?.quantity || 0}
                          </span>
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-center">
                          <span className="text-success">
                            {orderDetail?.unitPrice || "N/A"} VND
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className="section3 d-flex justify-content-end align-items-center">
                    <span>Thành tiền:</span>
                    <span
                      className="ml-2 text-success"
                      style={{ fontSize: "20px" }}
                    >
                      {order?.totalAmount || "0"} VND
                    </span>
                  </div>
                  <div className="section4 d-flex justify-content-end mt-3">
                    {order?.status === "Chờ xác nhận" && (
                      <Button
                        type="button"
                        className="btn btn-dark mr-2"
                        style={{ borderRadius: 0 }}
                      >
                        Hủy đơn
                      </Button>
                    )}
                    {order?.status === "Đang vận chuyển" && (
                      <Button
                        type="button"
                        className="btn btn-dark mr-2"
                        style={{ borderRadius: 0 }}
                      >
                        Liên hệ
                      </Button>
                    )}
                    {order?.status === "Đã nhận" && (
                      <Button
                        type="button"
                        className="btn btn-success"
                        style={{ borderRadius: 0 }}
                      >
                        Đã nhận
                      </Button>
                    )}
                    {order?.status === "Đã hủy" && (
                      <Button
                        type="button"
                        className="btn btn-secondary"
                        style={{ borderRadius: 0 }}
                        disabled
                      >
                        Đơn đã bị hủy
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import request from "../../config/ApiConfig/index"; // Đảm bảo đường dẫn đúng với nơi bạn lưu trữ file request.js

const Order = ({ orders }) => {
  return (
    <div>
      {orders.map((order) => (
        <Card className="order-item mb-3 bg-light" key={order.orderId}>
          <Card.Body className="d-flex align-items-center mb-3">
            <div className="container bg-white">
              <div className="p-3">
                <div className="section1 mb-3">
                  <div style={{ display: "inline-block" }}>
                    <span style={{ fontWeight: 600, marginRight: "10px" }}>
                      {order.user.fullname}
                    </span>
                    <span> -</span>
                    <span
                      style={{
                        padding: "5px",
                        marginLeft: "10px",
                      }}
                    >
                      {order.address.addressName}
                    </span>
                    <span
                      style={{
                        padding: "5px",
                        marginLeft: "10px",
                      }}
                    >
                      ({order.user.phoneNumber})
                    </span>
                  </div>
                  <div className="float-end text-success">
                    {order.status.toUpperCase()}
                  </div>
                </div>
                <hr />
                <div className="section2">
                  {(order.orderDetails || []).map((orderDetail, index) => (
                    <div className="row mb-2" key={index}>
                      <div className="col-2">
                        <img
                          src={orderDetail.product.imgUrl}
                          alt=""
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                      <div className="col-8">
                        <span style={{ fontWeight: 400, fontSize: "20px" }}>
                          {orderDetail.product.name}
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontWeight: 500,
                            marginBottom: "10px",
                          }}
                        >
                          x{orderDetail.quantity}
                        </span>
                      </div>
                      <div
                        className="col-2"
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "green" }}>
                          {orderDetail.unitPrice} VND
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <div
                  className="section3"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>Thành tiền:</span>
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "20px",
                      color: "green",
                    }}
                  >
                    {order.totalAmount} VND
                  </span>
                </div>
                <div
                  className="section4"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{
                      color: "white",
                      borderRadius: 0,
                      marginRight: "10px",
                    }}
                  >
                    Liên hệ người bán
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    style={{ borderRadius: 0 }}
                  >
                    Hủy đơn
                  </button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    </div>
  );
};

export default Order;
