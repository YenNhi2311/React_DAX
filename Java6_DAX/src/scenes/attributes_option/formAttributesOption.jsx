import React, { useEffect, useState } from "react";
import {
  Box, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText,
  TextField, Typography, Input
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Xác thực schema
const attributeSchema = yup.object().shape({
  attribute: yup.string().required("Chọn thuộc tính là bắt buộc"),
  value: yup.string().required("Giá trị thuộc tính là bắt buộc"),
  img: yup.mixed()
    .test("fileSize", "Ảnh quá lớn", value => !value || value.size <= 2000000) // Kích thước tệp tối đa 2MB
    .test("fileFormat", "Chỉ chấp nhận jpg hoặc png", value => !value || ['image/jpg', 'image/png'].includes(value.type)),
});

const AttributeForm = ({ onAttributeUpdated, selectedAttributeOption }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [initialValues, setInitialValues] = useState({
    attribute: "",
    value: "",
    img: "",
  });
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    // Tải danh sách thuộc tính
    axios.get("http://localhost:8080/api/attributes")
      .then(response => {
        setAttributes(response.data || []);
      })
      .catch(error => {
        console.error('Lỗi khi tải danh sách thuộc tính:', error);
        toast.error("Lỗi khi tải danh sách thuộc tính");
      });

    // Tải dữ liệu cho chỉnh sửa nếu có id
    if (id) {
      axios.get(`http://localhost:8080/api/attribute-options/${id}`)
        .then(response => {
          const attributeOption = response.data;
          if (attributeOption) {
            setInitialValues({
              attribute: attributeOption.attributeId || "", // ID thuộc tính
              value: attributeOption.value || "",
              img: attributeOption.img || ""
            });
          }
        })
        .catch(error => {
          console.error('Lỗi khi tải dữ liệu:', error);
          toast.error("Lỗi khi tải dữ liệu");
        });
    } else if (selectedAttributeOption) {
      setInitialValues({
        attribute: selectedAttributeOption.attributeId || "", // ID thuộc tính
        value: selectedAttributeOption.value || "",
        img: selectedAttributeOption.img || ""
      });
    }
  }, [id, selectedAttributeOption]);

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append('attributes', values.attribute);
    formData.append('value', values.value);
    if (values.img instanceof File) {
      formData.append('img', values.img);
    }

    const url = id
      ? `http://localhost:8080/api/attribute-options/${id}`
      : "http://localhost:8080/api/attribute-options";

    const method = id ? 'PUT' : 'POST';

    axios({
      method: method,
      url: url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        toast.success(id ? "Cập nhật thành công" : "Thêm thành công", {
          autoClose: 1500,
          onClose: () => {
            setTimeout(() => {
              if (onAttributeUpdated) {
                onAttributeUpdated(response.data); // Gọi hàm callback để thông báo cho component cha
              }
              navigate("/admin/tableAttributeOption");
            }, 100);
          }
        });
      })
      .catch(error => {
        console.error('Lỗi khi xử lý thuộc tính:', error);
        toast.error("Đã xảy ra lỗi khi xử lý thuộc tính");
      });
  };

  return (
    <Box p="2%" m="20px" mt="-25px">
      <Header title="Thuộc Tính" subtitle={id ? "Chỉnh sửa thuộc tính" : "Thêm thuộc tính"} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={attributeSchema}
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
              <FormControl fullWidth sx={{ gridColumn: "span 4" }} error={!!touched.attribute && !!errors.attribute}>
                <InputLabel id="attribute-select-label">Thuộc tính</InputLabel>
                <Select
                  labelId="attribute-select-label"
                  id="attribute"
                  name="attribute"
                  value={values.attribute}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  displayEmpty
                >
                  {/* <MenuItem value="" disabled>Chọn thuộc tính</MenuItem> */}
                  {attributes.map((attr) => (
                    <MenuItem key={attr.id} value={attr.id}>{attr.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.attribute && errors.attribute}</FormHelperText>
              </FormControl>

              <h5>Giá trị thuộc tính:</h5>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.value}
                name="value"
                error={!!touched.value && !!errors.value}
                helperText={touched.value && errors.value}
                sx={{ gridColumn: "span 4" }}
              />

              <h5>Hình ảnh:</h5>
              {initialValues.img && (
                <img
                  src={`/assets/img/${initialValues.img}`} // URL hình ảnh từ server
                  alt="Hình ảnh thuộc tính"
                  width={200}
                  height={200}
                />
              )}

              <Input
                type="file"
                name="img"
                onChange={(event) => {
                  setFieldValue("img", event.currentTarget.files[0]); // Đặt giá trị là tệp hình ảnh
                }}
                onBlur={handleBlur}
                inputProps={{ accept: 'image/jpg, image/png' }}
              />
              {touched.img && errors.img ? (
                <Typography color="error">{errors.img}</Typography>
              ) : null}

            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {id ? "Cập nhật thuộc tính" : "Thêm thuộc tính"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default AttributeForm;
