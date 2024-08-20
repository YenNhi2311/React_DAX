<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import request from "../config/ApiConfig/index";

const loginApi = async ({ username, password }) => {
  try {
    const res = await request({
      method: "POST",
      path: "/api/auth/login",
      data: {
        username,
<<<<<<< HEAD
<<<<<<< HEAD
        password,
=======
        password
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
        password
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
      },
    });

    if (!res || !res.employee || !res.token) {
<<<<<<< HEAD
<<<<<<< HEAD
      throw new Error("Phản hồi API không dự kiến");
=======
      throw new Error('Phản hồi API không dự kiến');
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
      throw new Error('Phản hồi API không dự kiến');
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    }

    const { employee, token } = res;

    return {
      employee,
      token,
      role: employee.role, // Kiểm tra rằng role có trong employee
    };
  } catch (error) {
    console.error("Lỗi API đăng nhập:", error);
    throw error;
  }
};

const getProfile = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "/api/auth/user",
    });

    if (!res || !res.employee || res.employee.role === undefined) {
<<<<<<< HEAD
<<<<<<< HEAD
      throw new Error("Thông tin người dùng không tồn tại hoặc không hợp lệ");
=======
      throw new Error('Thông tin người dùng không tồn tại hoặc không hợp lệ');
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
      throw new Error('Thông tin người dùng không tồn tại hoặc không hợp lệ');
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    }

    return {
      employee: res.employee,
      role: res.employee.role,
    };
  } catch (error) {
    console.error("Get Profile API error:", error);
    throw error;
  }
};

export { loginApi, getProfile };
