import request from "../config/ApiConfig/index";

const registerApi = async ({ username, password, email, fullname, phoneNumber }) => {
  try {
    const res = await request({
      method: "POST",
      path: "/api/auth/register",
      data: {
        username,
        password,
        email,
        fullname,
        phoneNumber,
        role: false // Vai trò mặc định cho người dùng mới (false có nghĩa là 'user')
      },
    });

    return res;
    

  } catch (error) {
    console.error("Lỗi API đăng ký:", error);
    throw error;
  }
};

export { registerApi };
