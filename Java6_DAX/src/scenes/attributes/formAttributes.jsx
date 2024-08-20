import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//Bắt lỗi
const attributeSchema = yup.object().shape({
  name: yup.string().required("Tên thuộc tính là bắt buộc"),
});

const AttributeForm = ({ onAttributeUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [initialValues, setInitialValues] = useState({
    name: ""
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/attributes/${id}`)
        .then(response => {
          const attribute = response.data;
          if (attribute) {
            setInitialValues({
              name: attribute.name || ""
            });
          }
        })
        .catch(error => {
          console.error('Lỗi khi tải dữ liệu:', error);
          toast.error("Lỗi khi tải dữ liệu");
        });
    }
  }, [id]);

  const handleFormSubmit = (values) => {
    const request = id 
      ? axios.put(`http://localhost:8080/api/attributes/${id}`, values)
      : axios.post(`http://localhost:8080/api/attributes`, values);

    request
      .then(response => {
        toast.success(id ? "Cập nhật thành công" : "Thêm thành công", {
          autoClose: 1500,
          onClose: () => {
            setTimeout(() => {
              if (onAttributeUpdated) {
                onAttributeUpdated(response.data); // Gọi hàm callback để thông báo cho component cha
              }
              navigate("/admin/tableAttributes");
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
              <h5>Tên thuộc tính: </h5>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
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
