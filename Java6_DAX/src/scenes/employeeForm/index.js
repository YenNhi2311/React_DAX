import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, styled } from "@mui/material/styles";

// Tạo component Radio tùy chỉnh
const CustomRadio = styled(Radio)(({ theme }) => ({
  color: "#000000", // Màu mặc định
  "&.Mui-checked": {
    color: "#007bff", // Màu khi được chọn
  },
}));

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    phoneNumber: "",
    profilePicture: "",
    createdAt: "",
    updatedAt: "",
    status: "active",
    gender: "male",
    role: "manager",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/employees/${id}`)
        .then((response) => {
          const employee = response.data;
          if (employee) {
            setInitialValues({
              username: employee.username || "",
              password: employee.password || "",
              email: employee.email || "",
              fullname: employee.fullname || "",
              phoneNumber: employee.phoneNumber || "",
              profilePicture: employee.profilePicture || "",
              createdAt: employee.createdAt
                ? new Date(employee.createdAt).toISOString().split("T")[0]
                : "",
              updatedAt: employee.updatedAt
                ? new Date(employee.updatedAt).toISOString().split("T")[0]
                : "",
              status: employee.status ? "active" : "inactive",
              gender: employee.gender ? "male" : "female",
              role: employee.role ? "manager" : "employee",
            });
            setImagePreview(employee.profilePicture || "");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  const handleFormSubmit = (values) => {
    const formattedValues = {
      ...values,
      createdAt: values.createdAt
        ? new Date(values.createdAt).toISOString()
        : "",
      updatedAt: values.updatedAt
        ? new Date(values.updatedAt).toISOString()
        : "",
      status: values.status === "active",
      gender: values.gender === "male",
      role: values.role === "manager",
    };

    console.log("Formatted Values:", formattedValues); // Debugging line

    const apiCall = id
      ? axios.put(`http://localhost:8080/api/employees/${id}`, formattedValues)
      : axios.post(`http://localhost:8080/api/employees`, formattedValues);

    apiCall
      .then((response) => {
        console.log("API Response:", response); // Log API response for debugging
        toast.success(
          id ? "Cập nhật nhân viên thành công!" : "Thêm nhân viên thành công!"
        );
        setTimeout(() => {
          navigate("/admin/employee");
        }, 1500);
      })
      .catch((error) => {
        console.error(
          id ? "Error updating employee:" : "Error adding employee:",
          error.response ? error.response.data : error.message
        );
        toast.error(
          id ? "Cập nhật nhân viên thất bại!" : "Thêm nhân viên thất bại!"
        );
      });
  };

  const handleImageClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  const buttonLabel = id ? "Cập nhật nhân viên" : "Thêm nhân viên";

  return (
    <Box p="2%" m="20px">
      <Header
        title="Nhân viên"
        subtitle={id ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
      />

      <Box mt="30px">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb="20px"
              >
                <Avatar
                  src={imagePreview || "/default-profile.jpg"}
                  sx={{ width: 100, height: 100, cursor: "pointer" }}
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  id="profilePictureInput"
                  style={{ display: "none" }}
                />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box p={2} sx={{ backgroundColor: "", borderRadius: 1 }}>
                    <Typography variant="h6">Tên đăng nhập:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      name="username"
                      id="username"
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />

                    <Typography variant="h6">Ngày tạo:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.createdAt}
                      name="createdAt"
                      id="createdAt"
                      error={!!touched.createdAt && !!errors.createdAt}
                      helperText={touched.createdAt && errors.createdAt}
                      InputLabelProps={{ shrink: true }}
                      disabled
                    />

                    <Typography variant="h6">Ngày cập nhật:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.updatedAt}
                      name="updatedAt"
                      id="updatedAt"
                      error={!!touched.updatedAt && !!errors.updatedAt}
                      helperText={touched.updatedAt && errors.updatedAt}
                      InputLabelProps={{ shrink: true }}
                      disabled
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box p={2} sx={{ backgroundColor: "", borderRadius: 1 }}>
                    <Typography variant="h6">Trạng thái:</Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="status"
                        id="status"
                        value={values.status}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="inactive"
                          control={<CustomRadio />}
                          label="Khóa"
                        />
                        <FormControlLabel
                          value="active"
                          control={<CustomRadio />}
                          label="Hoạt động"
                        />
                      </RadioGroup>
                    </FormControl>

                    <Typography variant="h6">Vai trò:</Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="role"
                        id="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="manager"
                          control={<CustomRadio />}
                          label="Quản lý"
                        />
                        <FormControlLabel
                          value="employee"
                          control={<CustomRadio />}
                          label="Nhân viên"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: "gray" }}
              >
                {buttonLabel}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      {/* <ToastContainer /> */}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  username: yup.string().required("Vui lòng không bỏ trống!"),
  password: yup.string().required("Vui lòng không bỏ trống!"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng không bỏ trống!"),
  fullname: yup.string().required("Vui lòng không bỏ trống!"),
  phoneNumber: yup.string().required("Vui lòng không bỏ trống!"),
  profilePicture: yup.string(), // Made optional
  createdAt: yup.date().required("Vui lòng không bỏ trống!"),
  updatedAt: yup.date().required("Vui lòng không bỏ trống!"),
  status: yup
    .string()
    .oneOf(["active", "inactive"])
    .required("Vui lòng không bỏ trống!"),
  gender: yup
    .string()
    .oneOf(["male", "female"])
    .required("Vui lòng không bỏ trống!"),
  role: yup
    .string()
    .oneOf(["manager", "employee"])
    .required("Vui lòng không bỏ trống!"),
});

export default Form;
