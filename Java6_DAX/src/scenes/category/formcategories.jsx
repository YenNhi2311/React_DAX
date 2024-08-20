import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Input } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ oncategoryUpdated, selectedCategory }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [initialValues, setInitialValues] = useState({
    categoryName: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/categories/${id}`)
        .then(response => {
          const category = response.data;
          if (category) {
            setInitialValues({
              categoryName: category.categoryName || "",
              description: category.description || "",
              img: category.img || "", // Đây có thể là URL hoặc tên tệp
            });
          }
        })
        .catch(error => {
          console.error('Lỗi khi tải dữ liệu:', error);
          toast.error("Lỗi khi tải dữ liệu");
        });
    } else if (selectedCategory) {
      setInitialValues({
        categoryName: selectedCategory.categoryName || "",
        description: selectedCategory.description || "",
        img: selectedCategory.img || "", // Đây có thể là URL hoặc tên tệp
      });
    }
  }, [id, selectedCategory]);

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append('categoryName', values.categoryName);
    formData.append('description', values.description);
    if (values.img instanceof File) {
      formData.append('img', values.img);
    }

    const url = id
      ? `http://localhost:8080/api/categories/${id}`
      : `http://localhost:8080/api/categories`;

    const method = id ? 'PUT' : 'POST';

    axios({
      method: method,
      url: url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        toast.success(id ? "Cập nhật loại thành công" : "Thêm loại thành công", {
          autoClose: 1500,
          onClose: () => {
            setTimeout(() => {
              if (oncategoryUpdated) {
                oncategoryUpdated(response.data); // Gọi hàm callback để thông báo cho component cha
              }
              navigate("/admin/tablecategory");
            }, 100);
          }
        });
      })
      .catch(error => {
        console.error('Lỗi khi xử lý loại:', error);
        toast.error("Đã xảy ra lỗi khi xử lý loại");
      });
  };




  return (
    <Box p="2%" m="20px" mt="-25px">
      <Header title="Loại" subtitle={id ? "Chỉnh sửa loại" : "Thêm loại"} />

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
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <h5>Tên loại:</h5>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categoryName}
                name="categoryName"
                error={!!touched.categoryName && !!errors.categoryName}
                helperText={touched.categoryName && errors.categoryName}
                sx={{ gridColumn: "span 4" }}
              />

              <h5>Hình ảnh:</h5>
              {initialValues.img && (
                <img
                  src={`/assets/img/${initialValues.img}`} // URL hình ảnh từ server
                  alt="Hình ảnh loại"
                  width={200}
                  height={200}
                />
              )}

              <Input

                type="file"
                name="img"
                onChange={(event) => {
                  setFieldValue("img", event.currentTarget.files[0] || ''); // Nếu không có tệp, đặt giá trị là chuỗi rỗng
                }}
                onBlur={handleBlur}
                inputProps={{ accept: 'image/jpeg, image/png' }}
              />

              {touched.img && errors.img ? (
                <Typography color="error">{errors.img}</Typography>
              ) : null}

              <h5>Mô tả:</h5>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {id ? "Cập nhật Loại" : "Thêm Loại"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <ToastContainer />
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  categoryName: yup.string().required("Vui lòng không bỏ trống!"),
  img: yup.mixed()
    .test("fileType", "Chỉ chấp nhận các định dạng hình ảnh: .jpg, .jpeg, .png", value => {
      if (typeof value === 'string') return true; // Nếu là URL hoặc tên tệp thì không cần kiểm tra định dạng
      if (!value) return true; // Nếu không có giá trị, không cần kiểm tra
      const supportedFormats = ['image/jpeg', 'image/png'];
      return supportedFormats.includes(value.type);
    })
    .test("fileSize", "Kích thước hình ảnh tối đa là 10MB", value => {
      if (typeof value === 'string') return true; // Nếu là URL hoặc tên tệp thì không cần kiểm tra kích thước
      if (!value) return true; // Nếu không có giá trị, không cần kiểm tra
      return value.size <= 10 * 1024 * 1024;
    }),
});


export default Form;
