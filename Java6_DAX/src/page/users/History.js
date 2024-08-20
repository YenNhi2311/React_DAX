import React from "react";
import { Card, Tab, Tabs } from "react-bootstrap";

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import logo from "../../logo.svg";

const MainContent = () => {
  return (
    <div className="main-content container mt-5 mb-5">
      <Tabs defaultActiveKey="all" id="order-tabs">
        <Tab eventKey="all" title="Tất cả">
          <Order />
        </Tab>
        <Tab eventKey="waiting-payment" title="Chờ thanh toán">
          <Order />
        </Tab>
        <Tab eventKey="shipping" title="Vận chuyển">
          <Order />
        </Tab>
        <Tab eventKey="waiting-receive" title="Chờ giao hàng">
          <Order />
        </Tab>
        <Tab eventKey="completed" title="Hoàn thành">
          <Order />
        </Tab>
        <Tab eventKey="cancelled" title="Đã hủy">
          <Order />
        </Tab>
        <Tab eventKey="refund" title="Trả hàng/Hoàn tiền">
          <Order />
        </Tab>
      </Tabs>
    </div>
  );
};

const Order = () => {
  return (
    <div>
      <Card className="order-item mb-3 bg-light">
        <OrderList />
        <OrderList />
        <OrderList />
      </Card>
    </div>
  );
};

const OrderList = () => {
  return (
    <>
      <Card.Body className="d-flex align-items-center mb-3">
        <div className="container bg-white">
          <div className="p-3">
            <div className="section1 mb-3">
              <div style={{ display: "inline-block" }}>
                <span style={{ fontWeight: 600 }}>Anh Sinh Viên</span>
                <span
                  style={{
                    color: "grey",
                    border: "1px solid rgb(207, 204, 204)",
                    padding: "5px",
                    marginLeft: "10px",
                  }}
                >
                  Xem shop
                </span>
              </div>
              <div className="float-end text-success">VẬN CHUYỂN</div>
            </div>
            <hr />
            <div className="section2">
              <div className="row">
                <div className="col-2">
                  <img src={logo} alt="" style={{ maxWidth: "100%" }} />
                </div>
                <div className="col-8">
                  <span style={{ fontWeight: 400, fontSize: "20px" }}>
                    COMBO 2 Set nước sâm lục vị la hán quả nấu 10 LÍT Anh Sinh
                    Viên nguyên liệu thảo mộc 40 người uống
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontWeight: 500,
                      marginBottom: "10px",
                    }}
                  >
                    x1
                  </span>
                  <span
                    style={{
                      border: "1px solid rgb(2, 100, 46)",
                      padding: "5px",
                      color: "rgb(2, 100, 46)",
                    }}
                  >
                    Trả hàng miễn phí: 15 ngày
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
                  <span style={{ color: "green" }}>62.000VND</span>
                </div>
              </div>
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
                62.000VND
              </span>
            </div>
            <hr />
            <div
              className="section4"
              style={{ justifyContent: "end", display: "flex" }}
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
    </>
  );
};

export default MainContent;
