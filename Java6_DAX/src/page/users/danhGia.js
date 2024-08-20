import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../assets/css/fontawesome.css";
import "../../assets/css/fontawesome.min.css";
import "../../assets/css/slick-theme.css";
import "../../assets/css/slick-theme.min.css";
import "../../assets/css/slick.min.css";
import "../../assets/css/templatemo.css";
import "../../assets/css/templatemo.min.css";
import "../../assets/css/danhgia.css";
import { Typography } from "@mui/material";

const DanhGia = () => {
  const { orderId } = useParams(); // Lấy orderId và userId từ URL
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [selectedRating, setSelectedRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Tải dữ liệu đơn hàng
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`
        );
        if (response.data) {
          setOrder(response.data);
        } else {
          setError("Dữ liệu đơn hàng không hợp lệ.");
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin đơn hàng:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          setError("Có lỗi xảy ra khi tải thông tin đơn hàng.");
        } else if (error.request) {
          console.error("Request data:", error.request);
          setError("Không nhận được phản hồi từ máy chủ.");
        } else {
          console.error("Error message:", error.message);
          setError("Có lỗi xảy ra khi thiết lập yêu cầu.");
        }
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!order) {
      setError("Dữ liệu đơn hàng chưa được tải.");
      return;
    }

    try {
      const payload = {
        comment,
        employee: { id: userId },
        product: { id: order.orderDetails[0].skus.product.id },
      };

      console.log("Submitting payload:", payload);

      await axios.post(`http://localhost:8080/api/reviews`, payload);
      alert("Đánh giá đã được gửi thành công!");
      navigate("/history"); // Điều hướng về trang lịch sử
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError(
          `Có lỗi xảy ra khi gửi đánh giá: ${error.response.data.message}`
        );
      } else if (error.request) {
        console.error("Request data:", error.request);
        setError("Không nhận được phản hồi từ máy chủ.");
      } else {
        console.error("Error message:", error.message);
        setError("Có lỗi xảy ra khi thiết lập yêu cầu.");
      }
    }
  };

  const isGoodRating = selectedRating === "Tốt" || selectedRating === "Rất tốt";

  return (
    <div className="container mt-5 mb-5" style={{ marginLeft: "270px" }}>
      <div className="row">
        <div className="card" style={{ width: "1000px" }}>
          {order?.orderDetails[0]?.skus?.product?.imgUrl ? (
            <img
              src={`/assets/img/${order?.orderDetails[0]?.skus?.product?.imgUrl}`}
              alt="Hình ảnh sản phẩm"
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
          <div className="card-body">
            <h3 className="card-title">
              {order
                ? order.orderDetails[0]?.skus?.product?.name
                : "Loading..."}
            </h3>
            <p className="card-text">
              {order
                ? order.orderDetails[0]?.skus?.product?.description
                : "Loading..."}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Giá: {order ? order.orderDetails[0]?.skus?.price : "Loading..."}{" "}
              VND
            </li>
            {order &&
              order.orderDetails[0]?.skus?.attributesSkus?.map(
                (attribute, index) => (
                  <li key={index} className="list-group-item">
                    {attribute?.attributeOption.attributes?.name}:{" "}
                    {attribute?.attributeOption?.value || "Không có giá trị"}
                  </li>
                )
              )}
          </ul>
          <div className="card-body">
            <div className="stars">
              {selectedRating && (
                <p style={{ fontWeight: isGoodRating ? "bold" : "normal" }}>
                  Chất lượng sản phẩm: {selectedRating}
                </p>
              )}
              <div className="rating-stars">
                <input
                  className="star star-5"
                  id="star-5"
                  type="radio"
                  name="star"
                  value="Rất tốt"
                  checked={selectedRating === "Rất tốt"}
                  onChange={handleRatingChange}
                />
                <label className="star star-5" htmlFor="star-5"></label>
                <input
                  className="star star-4"
                  id="star-4"
                  type="radio"
                  name="star"
                  value="Tốt"
                  checked={selectedRating === "Tốt"}
                  onChange={handleRatingChange}
                />
                <label className="star star-4" htmlFor="star-4"></label>
                <input
                  className="star star-3"
                  id="star-3"
                  type="radio"
                  name="star"
                  value="Bình thường"
                  checked={selectedRating === "Bình thường"}
                  onChange={handleRatingChange}
                />
                <label className="star star-3" htmlFor="star-3"></label>
                <input
                  className="star star-2"
                  id="star-2"
                  type="radio"
                  name="star"
                  value="Kém"
                  checked={selectedRating === "Kém"}
                  onChange={handleRatingChange}
                />
                <label className="star star-2" htmlFor="star-2"></label>
                <input
                  className="star star-1"
                  id="star-1"
                  type="radio"
                  name="star"
                  value="Rất kém"
                  checked={selectedRating === "Rất kém"}
                  onChange={handleRatingChange}
                />
                <label className="star star-1" htmlFor="star-1"></label>
              </div>
            </div>
            <div className="mb-3">
              <textarea
                className="form-control mt-3"
                rows={3}
                placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm với những người khác nhé."
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="btn btn-success mt-3"
            style={{
              width: "200px",
              float: "right",
              marginBottom: "30px",
              marginLeft: "750px",
            }}
          >
            Gửi đánh giá
          </button>
          {error && <div className="text-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default DanhGia;
