import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Input, useMediaQuery } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const FormProduct = ({ onProductUpdated, selectedProduct }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const isNonMobile = useMediaQuery("(max-width:600px)");
    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        imgUrl: "",
        createdAt: "",
        updatedAt: "",
        categoryId: ""
    });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Lỗi khi tải danh mục:', error);
            });

        if (id) {
            axios.get(`http://localhost:8080/api/products/${id}`)
                .then(response => {
                    const product = response.data;
                    setInitialValues({
                        name: product.name || "",
                        description: product.description || "",
                        imgUrl: product.imgUrl || "",
                        createdAt: product.createdAt
                            ? moment(product.createdAt).format('YYYY-MM-DDTHH:mm')
                            : "",
                        updatedAt: moment().format('YYYY-MM-DDTHH:mm'),
                        categoryId: product.category && product.category.categoryId
                            ? product.category.categoryId
                            : "",
                    });
                    setIsEdit(true);
                })
                .catch(error => {
                    console.error('Lỗi khi tải dữ liệu:', error);
                });
        } else {
            setInitialValues({
                name: selectedProduct?.name || "",
                description: selectedProduct?.description || "",
                imgUrl: selectedProduct?.imgUrl || "",
                createdAt: moment().format('YYYY-MM-DDTHH:mm'),
                updatedAt: "",
                categoryId: selectedProduct?.categoryId || "",
            });
            setIsEdit(false);
        }
    }, [id, selectedProduct]);

    const formatDate = (date) => moment(date).utc().format('YYYY-MM-DDTHH:mm:ss');

    const handleFormSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('categoryId', values.categoryId);
        if (values.imgUrl && typeof values.imgUrl !== 'string') {
            formData.append('imgUrl', values.imgUrl);
        }

        const request = id 
            ? axios.put(`http://localhost:8080/api/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            : axios.post(`http://localhost:8080/api/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        request
            .then(response => {
                toast.success(id ? "Cập nhật sản phẩm thành công" : "Thêm sản phẩm thành công", {
                    autoClose: 1500,
                    onClose: () => {
                        setTimeout(() => {
                            if (onProductUpdated) {
                                onProductUpdated(response.data);
                            }
                            navigate("/admin/tableproduct");
                        }, 100);
                    }
                });
            })
            .catch(error => {
                console.error('Lỗi khi xử lý sản phẩm:', error);
                toast.error("Đã xảy ra lỗi khi xử lý sản phẩm");
            });
    };

    return (
        <Box p="2%" m="20px" mt="-25px">
            <Formik
                initialValues={initialValues}
                validationSchema={yup.object().shape({
                    name: yup.string().required("Tên sản phẩm không được để trống!"),
                    categoryId: yup.string().required("Vui lòng chọn loại sản phẩm!"),
                    createdAt: yup.date().nullable().notRequired(),
                    updatedAt: yup.date().nullable().notRequired()
                })}
                onSubmit={handleFormSubmit}
                enableReinitialize
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0,1fr))">
                            <h5>Tên sản phẩm:</h5>
                            <Field
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <h5>Mô tả:</h5>
                            <Field
                                as={TextField}
                                fullWidth
                                variant="filled"
                                type="text"
                                name="description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                multiline
                                rows={4}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Chọn Loại</InputLabel>
                                <Field
                                    as={Select}
                                    name="categoryId"
                                    value={values.categoryId || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.categoryId && !!errors.categoryId}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>

                            <h5>Hình ảnh:</h5>
                            {values.imgUrl && typeof values.imgUrl === 'string' && (
                                <img
                                    src={`/assets/img/${values.imgUrl}`}
                                    alt="Hình ảnh sản phẩm"
                                    width={200}
                                    height={200}
                                />
                            )}
                            <Input
                                type="file"
                                name="imgUrl"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        setFieldValue("imgUrl", file);
                                    }
                                }}
                                onBlur={handleBlur}
                                inputProps={{ accept: 'image/jpg, image/png' }}
                            />

                            {isEdit && (
                                <>
                                    <h5>Ngày tạo:</h5>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        variant="filled"
                                        type="datetime-local"
                                        name="createdAt"
                                        disabled
                                        value={values.createdAt || ""}
                                    />
                                    <p></p><p></p>
                                    <h5>Ngày cập nhật:</h5>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        variant="filled"
                                        type="datetime-local"
                                        name="updatedAt"
                                        disabled
                                        value={values.updatedAt || ""}
                                        error={!!touched.updatedAt && !!errors.updatedAt}
                                        helperText={touched.updatedAt && errors.updatedAt}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </>
                            )}
                        </Box>
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            {id ? "Cập nhật" : "Thêm"}
                        </Button>
                        <ToastContainer />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default FormProduct;
