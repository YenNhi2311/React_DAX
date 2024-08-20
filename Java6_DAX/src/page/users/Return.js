import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ReturnPage = () => {
  const [orderInfo, setOrderInfo] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [amount, setAmount] = useState('');
  const [responseCode, setResponseCode] = useState('');
  const [hasShownMessage, setHasShownMessage] = useState(false);
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const handlePaymentResponse = () => {
      const vnp_ResponseCode = query.get('vnp_ResponseCode');
      const vnp_OrderInfo = query.get('vnp_OrderInfo');
      const vnp_TxnRef = query.get('vnp_TxnRef');
      const vnp_Amount = query.get('vnp_Amount');

      setResponseCode(vnp_ResponseCode);
      setOrderInfo(vnp_OrderInfo);
      setTxnRef(vnp_TxnRef);
      setAmount(vnp_Amount);

      if (vnp_ResponseCode === '00' && !hasShownMessage) {
        alert('Thanh toán thành công');
        setHasShownMessage(true);  // Đảm bảo thông báo chỉ hiển thị một lần
      } else if (vnp_ResponseCode !== '00' && !hasShownMessage) {
        alert('Thanh toán thất bại');
        setHasShownMessage(true);  // Đảm bảo thông báo chỉ hiển thị một lần
      }
    };

    handlePaymentResponse();
  }, [query, hasShownMessage]);

  return (
    <div className="container">
      <h3>Kết quả thanh toán</h3>
      {responseCode === '00' ? (
        <div>
          <p>Thông tin đơn hàng: {orderInfo}</p>
          <p>Mã giao dịch: {txnRef}</p>
          <p>Số tiền: {amount} VND</p>
        </div>
      ) : (
        <p>Thanh toán thất bại.</p>
      )}
    </div>
  );
};

export default ReturnPage;




// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ReturnPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);

//   useEffect(() => {
//     const handlePaymentResponse = async () => {
//       const vnp_ResponseCode = query.get('vnp_ResponseCode');

//       if (vnp_ResponseCode === '00') {
//         alert('Thanh toán thành công');
        
//         // Lưu thông tin đơn hàng sau khi thanh toán thành công
//         await handleAddOrder(0);  // Gọi hàm lưu đơn hàng với paymentId=0 cho VNPAY

//       } else {
//         alert('Thanh toán thất bại');
//         // Xử lý thất bại thanh toán
//       }
//     };

//     handlePaymentResponse();
//   }, [query]);

//   const validateInput = () => {
//     const username = document.getElementById("employeeName").value.trim();
//     const phone = document.getElementById("phoneNumber").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const email = document.getElementById("email").value.trim();

//     if (!username || !phone || !address || !email) {
//       setError("Vui lòng điền đầy đủ thông tin.");
//       return false;
//     }

//     const phonePattern = /^\d{10}$/;
//     if (!phonePattern.test(phone)) {
//       setError("Số điện thoại phải có 10 chữ số.");
//       return false;
//     }

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//       setError("Địa chỉ email không hợp lệ.");
//       return false;
//     }

//     return true;
//   };

//   const clearCart = async (userId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8080/api/orders/carts/${userId}`);

//       if (response.status === 200) {
//         setCartItems([]);
//       } else {
//         console.error("Failed to clear cart. Response status:", response.status);
//         console.error("Response data:", response.data);
//       }
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//       setError(`Error clearing cart: ${error.message}`);
//     }
//   };

//   const handleAddOrder = async (paymentId) => {
//     const userId = localStorage.getItem("userId");
  
//     if (!userId) {
//       console.error("User ID not found in localStorage.");
//       return;
//     }
  
//     // Kiểm tra nếu giỏ hàng trống
//     if (!cartItems || cartItems.length === 0) {
//       setError("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
//       return;
//     }
  
//     if (!validateInput()) return;
  
//     // Lấy thông tin từ các trường input
//     const username = document.getElementById("employeeName").value.trim();
//     const phone = document.getElementById("phoneNumber").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const email = document.getElementById("email").value.trim();
  
//     // Tính tổng tiền
//     const totalAmount = cartItems.reduce(
//       (acc, item) => acc + item.skus.price * item.quantity,
//       0
//     );
  
//     // Ngày giờ hiện tại
//     const orderDate = new Date().toISOString(); // ISO format
  
//     // Thông tin đơn hàng
//     const orderEntity = {
//       username,
//       phone,
//       address,
//       email,
//       paymentId,
//       userId,
//       orderDetails: cartItems.map((item) => ({
//         // skusId: item.skus.id,
//         // price: item.skus.price,
//         // quantity: item.quantity,
//       })),
//       totalAmount,
//       orderDate,
//       shippingFee: 0,
//       status: paymentId === 1 ? "Chờ xác nhận" : "Chờ thanh toán",
//     };
  
//     try {
//         const response = await axios.post(
//           `http://localhost:8080/api/orders/add/${userId}/${paymentId}`,
//           orderEntity
//         );
  
//         if (response.status === 201) {
//           // Xóa tất cả sản phẩm trong giỏ hàng sau khi tạo đơn hàng thành công
//           await clearCart(userId);
  
//           // setSuccessMessage("Thêm hóa đơn thành công!");
//           setTimeout(() => {
//             // setSuccessMessage("");
//             navigate("/"); // Chuyển hướng về trang chủ
//           }, 3000);
//         } else {
//           console.error("Failed to add order:", response.statusText);
//           setError(`Failed to add order: ${response.statusText}`);
//         }
      
//     } catch (error) {
//       const errorMessage = error.response ? error.response.data : error.message;
//       setError(`Error adding order: ${errorMessage}`);
//       console.error("Error adding order:", errorMessage);
//     }
//   };  

//   return (
//     <div className="container">
//       <h3>Kết quả thanh toán</h3>
//       <p>Đang xử lý kết quả thanh toán...</p>
//     </div>
//   );
// };

// export default ReturnPage;
