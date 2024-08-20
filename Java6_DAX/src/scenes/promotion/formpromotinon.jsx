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



const Form = ({ onPromotionUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [initialValues, setInitialValues] = useState({
    promotionName: "",
    percents: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/promotions/${id}`)
        .then(response => {
          const promotion = response.data;
          if (promotion) {
            setInitialValues({
              promotionName: promotion.promotionName || "",
              percents: promotion.percents || "",
              startDate: promotion.startDate ? promotion.startDate.split("T")[0] : "",
              endDate: promotion.endDate ? promotion.endDate.split("T")[0] : "",
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
    const formattedValues = {
      ...values,
      startDate: values.startDate + "T00:00:00Z",
      endDate: values.endDate + "T00:00:00Z",
    };

    const request = id 
      ? axios.put(`http://localhost:8080/api/promotions/${id}`, formattedValues)
      : axios.post(`http://localhost:8080/api/promotions`, formattedValues);

    request
      .then(response => {
        toast.success(id ? "Cập nhật khuyến mãi thành công" : "Thêm khuyến mãi thành công", {
          autoClose: 1500,
          onClose: () => {
            setTimeout(() => {
              if (onPromotionUpdated) {
                onPromotionUpdated(response.data); // Gọi hàm callback để thông báo cho component cha
              }
              navigate("/admin/tablepromotion");
            }, 100);
          }
        });
      })
      .catch(error => {
        console.error('Lỗi khi xử lý khuyến mãi:', error);
        toast.error("Đã xảy ra lỗi khi xử lý khuyến mãi");
      });
  };

  return (
    <Box p="2%" m="20px" mt="-25px">
      <Header title="Khuyến Mãi" subtitle={id ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi"} />

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
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <h5>Tên khuyến mãi: </h5>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.promotionName}
                name="promotionName"
                error={!!touched.promotionName && !!errors.promotionName}
                helperText={touched.promotionName && errors.promotionName}
                sx={{ gridColumn: "span 4" }}
              />
              <h5>Phần trăm khuyến mãi: </h5>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.percents}
                name="percents"
                error={!!touched.percents && !!errors.percents}
                helperText={touched.percents && errors.percents}
                sx={{ gridColumn: "span 4" }}
              />
              <h5>Ngày bắt đầu:</h5>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="startDate"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 4" }}
              />
              <h5>Ngày kết thúc: </h5>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {id ? "Cập nhật khuyến mãi" : "Thêm khuyến mãi"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};
// Định nghĩa schema validation ở đây
const checkoutSchema = yup.object().shape({
  promotionName: yup.string().required("Vui lòng không bỏ trống!"),
  percents: yup.number().typeError("Phần trăm khuyến mãi phải là số").required("Vui lòng không bỏ trống!"),
  startDate: yup.date().required("Vui lòng không bỏ trống!"),
  endDate: yup.date().required("Vui lòng không bỏ trống!"),
});

export default Form;
