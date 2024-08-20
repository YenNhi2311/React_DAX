import axios from "axios";
import { Cookies } from "react-cookie";

// Cấu hình URL cơ sở cho API
const BASE_URL = "http://localhost:8080"; // Đảm bảo URL này là chính xác và server đang chạy tại đây

const request = async ({
  method = "GET",
  path = "",
  data = {},
  headers = {},
}) => {
  try {
    const cookie = new Cookies();
    const token = cookie.get("token");

    // Thực hiện yêu cầu HTTP với axios
    const response = await axios({
      method: method,
      baseURL: BASE_URL,
      url: path,
      data: data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`, // Thêm token nếu cần
      },
    });

    console.log("API request:", response); // In ra phản hồi từ API

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("API request error:", error);
    alert(error?.response?.data?.message || "Error");
    return null; // Trả về null nếu có lỗi
  }
};

export default request;
