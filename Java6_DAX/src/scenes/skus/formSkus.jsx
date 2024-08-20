import React, { useEffect, useState } from "react";
import {
  Box, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText,
  TextField, Typography
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Xác thực schema cho SKU
const skuSchema = yup.object().shape({
  product: yup.string().required("Chọn sản phẩm là bắt buộc"),
  code: yup.string().required("Mã SKU là bắt buộc"),
  price: yup.number().required("Giá là bắt buộc").positive("Giá phải là số dương"),
});

const FormSkus = ({ onSkuUpdated, selectedSku }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [initialValues, setInitialValues] = useState({
    product: "",
    code: "",
    price: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Tải danh sách sản phẩm
    axios.get("http://localhost:8080/api/products")
      .then(response => {
        setProducts(response.data || []);
      })
      .catch(error => {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
        toast.error("Lỗi khi tải danh sách sản phẩm");
      });

    // Tải dữ liệu cho chỉnh sửa nếu có id
    if (id) {
      axios.get(`http://localhost:8080/api/skus/${id}`)
        .then(response => {
          const sku = response.data;
          if (sku) {
            setInitialValues({
              product: sku.productId || "", // ID sản phẩm
              code: sku.code || "",
              price: sku.price || "",
            });
          }
        })
        .catch(error => {
          console.error('Lỗi khi tải dữ liệu:', error);
          toast.error("Lỗi khi tải dữ liệu");
        });
    } else if (selectedSku) {
      setInitialValues({
        product: selectedSku.productId || "", // ID sản phẩm
        code: selectedSku.code || "",
        price: selectedSku.price || "",
      });
    }
  }, [id, selectedSku]);

  const handleFormSubmit = (values) => {
    
    const formData = new FormData();
    formData.append('product', values.product);
    formData.append('code', values.code);
    formData.append('price', values.price);

    const url = id
      ? `http://localhost:8080/api/skus/${id}`
      : "http://localhost:8080/api/skus";

    const method = id ? 'PUT' : 'POST';

    axios({
      method: method,
      url: url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        toast.success(id ? "Cập nhật thành công" : "Thêm  thành công", {
          autoClose: 1500,
          onClose: () => {
            setTimeout(() => {
              if (onSkuUpdated) {
                onSkuUpdated(response.data); // Gọi hàm callback để thông báo cho component cha
              }
              navigate("/admin/tableSku");
            }, 100);
          }
        });
      })
      .catch(error => {
        console.error('Lỗi khi xử lý SKU:', error);
        toast.error("Đã xảy ra lỗi khi xử lý SKU");
      });
  };

  return (
    <Box p="2%" m="20px" mt="-25px">
      <Header title="SKU" subtitle={id ? "Chỉnh sửa SKU" : "Thêm SKU"} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={skuSchema}
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
              <FormControl fullWidth sx={{ gridColumn: "span 4" }} error={!!touched.product && !!errors.product}>
                <InputLabel id="product-select-label">Sản phẩm</InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product"
                  name="product"
                  value={values.product}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  displayEmpty
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.product && errors.product}</FormHelperText>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mã SKU"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                name="code"
                error={!!touched.code && !!errors.code}
                helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Giá"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {id ? "Cập nhật SKU" : "Thêm SKU"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default FormSkus;
