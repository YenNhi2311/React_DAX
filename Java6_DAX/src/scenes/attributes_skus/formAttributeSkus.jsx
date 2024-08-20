import React, { useEffect, useState } from "react";
import {
    Box, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText,
    Typography
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AttributeSkusForm = ({ onAttributeUpdated, selectedAttributeOption }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(max-width:600px)");
    const [initialValues, setInitialValues] = useState({
        skusId: "",
        attributeOptionId: ""
    });
    const [skus, setSkus] = useState([]);
    const [attributeOptions, setAttributeOptions] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Tải danh sách thuộc tính
        axios.get("http://localhost:8080/api/attribute-options")
            .then(response => {
                setAttributeOptions(response.data || []);
            })
            .catch(error => {
                console.error('Lỗi khi tải danh sách thuộc tính:', error);
                toast.error("Lỗi khi tải danh sách thuộc tính: " + (error.response?.data?.message || error.message));
            });

        // Tải danh sách SKUs
        axios.get("http://localhost:8080/api/skus")
            .then(response => {
                setSkus(response.data || []);
            })
            .catch(error => {
                console.error('Lỗi khi tải danh sách SKUs:', error);
                toast.error("Lỗi khi tải danh sách SKUs: " + (error.response?.data?.message || error.message));
            });

        // Tải dữ liệu cho chỉnh sửa nếu có id
        if (id) {
            axios.get(`http://localhost:8080/api/attribute-skus/${id}`)
                .then(response => {
                    const attributeSkus = response.data;
                    if (attributeSkus) {
                        setInitialValues({
                            skusId: attributeSkus.skusId || "",
                            attributeOptionId: attributeSkus.attributeOptionId || ""
                        });
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi tải dữ liệu:', error);
                    toast.error("Lỗi khi tải dữ liệu: " + (error.response?.data?.message || error.message));
                });
        } else if (selectedAttributeOption) {
            setInitialValues({
                skusId: selectedAttributeOption.skusId || "",
                attributeOptionId: selectedAttributeOption.attributeOptionId || ""
            });
        }

        // Set loading state to false after data fetching
        setLoading(false);
    }, [id, selectedAttributeOption]);

    const handleFormSubmit = (values) => {
        const url = id
            ? `http://localhost:8080/api/attribute-skus/${id}`
            : "http://localhost:8080/api/attribute-skus";

        const method = id ? 'PUT' : 'POST';

        axios({
            method: method,
            url: url,
            data: {
                skusId: values.skusId,
                attributeOptionId: values.attributeOptionId
            },
            headers: { 'Content-Type': 'application/json' } // Sử dụng JSON thay vì FormData
        })
        .then(response => {
            toast.success(id ? "Cập nhật thành công" : "Thêm thành công", {
                autoClose: 1500,
                onClose: () => {
                    setTimeout(() => {
                        if (onAttributeUpdated) {
                            onAttributeUpdated(response.data); // Gọi hàm callback để thông báo cho component cha
                        }
                        navigate("/admin/tableAttributSkus");
                    }, 100);
                }
            });
        })
        .catch(error => {
            console.error('Lỗi khi xử lý thuộc tính:', error);
            toast.error("Đã xảy ra lỗi khi xử lý thuộc tính: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <Box m="20px">
            <Header title="Attribute SKUs Form" subtitle="Thêm hoặc chỉnh sửa thuộc tính SKU" />

            {loading ? (
                <Typography>Loading...</Typography> // Show loading indicator
            ) : (
                <Formik
                    initialValues={initialValues}
                    validationSchema={yup.object().shape({
                        skusId: yup.string().required("Trường này là bắt buộc"),
                        attributeOptionId: yup.string().required("Trường này là bắt buộc")
                    })}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, handleChange, handleBlur, errors, touched }) => (
                        <Form>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{ "& > div": { gridColumn: isNonMobile ? "span 4" : "span 2" } }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="skusId-label">SKU</InputLabel>
                                    <Select 
                                        labelId="skusId-label"
                                        id="skusId"
                                        name="skusId"
                                        value={values.skusId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.skusId && errors.skusId)}
                                    >
                                        {skus.map(sku => (
                                            <MenuItem key={sku.id} value={sku.id}>
                                                {sku.code}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.skusId && errors.skusId && (
                                        <FormHelperText error>{errors.skusId}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="attributeOptionId-label">Thuộc tính</InputLabel>
                                    <Select
                                        labelId="attributeOptionId-label"
                                        id="attributeOptionId"
                                        name="attributeOptionId"
                                        value={values.attributeOptionId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.attributeOptionId && errors.attributeOptionId)}
                                    >
                                        {attributeOptions.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.attributeOptionId && errors.attributeOptionId && (
                                        <FormHelperText error>{errors.attributeOptionId}</FormHelperText>
                                    )}
                                </FormControl>
                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt="20px">
                                <Button type="submit" variant="contained" color="primary">
                                    {id ? "Cập nhật" : "Thêm mới"}
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            )}

            <ToastContainer />
        </Box>
    );
};

export default AttributeSkusForm;
