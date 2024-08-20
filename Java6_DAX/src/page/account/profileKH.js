import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCookies } from "react-cookie";
import request from "../../config/ApiConfig/index";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../assets/css/login.css";

// Define the validation schema with Yup
const schema = yup.object().shape({
  fullname: yup.string().required("Họ và tên không được bỏ trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  gender: yup.string().oneOf(["true", "false"], "Vui lòng chọn giới tính"),
  phoneNumber: yup.string().required("Số điện thoại không được bỏ trống"),
});

const ThongTinKhachHang = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [cookies] = useCookies(["token"]);
  const [userData, setUserData] = useState({
    profilePicture: "/default-profile.jpg",
    fullname: "",
    username: "",
    email: "",
    gender: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found");

        setLoading(true);
        const response = await request({
          method: "GET",
          path: `/api/auth/user/${userId}`,
        });

        if (response) {
          setUserData(response);
          setValue("fullname", response.fullname);
          setValue("username", response.username);
          setValue("email", response.email);
          setValue("gender", response.gender ? "true" : "false");
          setValue("phoneNumber", response.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cookies.token, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevState) => ({
          ...prevState,
          profilePicture: URL.createObjectURL(file),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("phoneNumber", data.phoneNumber);
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      setLoading(true);
      console.log(selectedFile);

      // const response = await request({
      //   method: "PUT",
      //   path: "/api/auth/update-user",
      //   data: formData,
      //   headers: {
      //     Authorization: `Bearer ${cookies.token}`,
      //     UserId: localStorage.getItem("userId"),
      //   },
      // });

      // if (response && response.error) {
      //   if (response.error.includes("email")) {
      //     setError("Email đã tồn tại.");
      //   } else if (response.error.includes("phoneNumber")) {
      //     setError("Số điện thoại đã tồn tại.");
      //   }
      // } else {
      //   setSuccessMessage("Cập nhật thành công");
      //   setError("");
      //   // Optionally reset form or redirect
      // }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      setError("Có lỗi khi cập nhật thông tin.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <div
        className="card shadow-lg p-4 mb-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Thông Tin Khách Hàng
        </Typography>
        {loading ? (
          <Typography variant="h6" color="textSecondary" textAlign="center">
            Đang tải dữ liệu...
          </Typography>
        ) : (
          <div className="row">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div className="text-center">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="rounded-circle mb-3 border border-3 border-primary"
                  width="150"
                  height="150"
                  style={{ cursor: "pointer", objectFit: "cover" }}
                  onClick={() =>
                    document.getElementById("profilePictureInput").click()
                  }
                />
                <input
                  type="file"
                  id="profilePictureInput"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="col-md-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <Controller
                    name="fullname"
                    control={control}
                    defaultValue={userData.fullname}
                    render={({ field }) => (
                      <TextField
                        label="Họ và tên"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={!!errors.fullname}
                        helperText={errors.fullname?.message}
                      />
                    )}
                  />
                </div>
                <div className="mb-3">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={userData.email}
                    render={({ field }) => (
                      <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </div>
                <div className="mb-3">
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={userData.gender ? "true" : "false"}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Nam"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Nữ"
                        />
                      </RadioGroup>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue={userData.phoneNumber}
                    render={({ field }) => (
                      <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                      />
                    )}
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ fontWeight: "bold", mt: 3 }}
                    disabled={loading}
                  >
                    Cập nhật thông tin
                  </Button>
                </div>
                {successMessage && (
                  <Typography color="success.main" textAlign="center" mt={2}>
                    {successMessage}
                  </Typography>
                )}
                {error && (
                  <Typography color="error" textAlign="center" mt={2}>
                    {error}
                  </Typography>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThongTinKhachHang;
