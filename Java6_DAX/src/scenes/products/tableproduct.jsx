import React, { useEffect, useState, useMemo } from 'react';
import { Box, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, InputBase } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import axios from 'axios';
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const Product = ({ onSelectProduct }) => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                const formatDateTime = (datetime) => {
                    return datetime ? moment(datetime).format('YYYY-MM-DD HH:mm:ss') : "N/A";
                };

                const dataWithId = response.data.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.category ? product.category.categoryId : "N/A",
                    // promotion: product.productPromotion.length > 0 
                    //     ? product.productPromotion.map(pp => pp.promotion.promotionID).join(', ') 
                    //     : "N/A",
                    imgUrl: product.imgUrl,
                    createdAt: formatDateTime(product.createdAt),
                    updatedAt: formatDateTime(product.updatedAt),
                }));

                dataWithId.sort((a, b) => b.id - a.id);
                setProducts(dataWithId);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Có lỗi xảy ra khi lấy dữ liệu');
            });
    }, [searchParams, params.id, onSelectProduct]);

    const handleRowClick = (id) => {
        setSelectedIds(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id)
                : [...prevSelected, id]
        );

        const selectedProduct = products.find(product => product.id === id);
        if (onSelectProduct && selectedProduct) {
            onSelectProduct(selectedProduct);
        }
    };

    const handleEditOrAddProduct = () => {
        if (selectedIds.length === 1) {
            const selectedProduct = products.find(product => product.id === selectedIds[0]);
            if (selectedProduct) {
                const now = moment().format('YYYY-MM-DDTHH:mm:ss');
                navigate(`/admin/formproduct/${selectedIds[0]}`, { 
                    state: { 
                        mode: "edit",
                        product: {
                            ...selectedProduct,
                            updatedAt: now,
                        }
                    } 
                });
            }
        } else {
            navigate(`/admin/formproduct`, { state: { mode: "add" } });
        }
    };
    
    const handleDeleteProduct = () => {
        if (selectedIds.length > 0) {
            if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} sản phẩm?`)) {
                Promise.all(
                    selectedIds.map(id => axios.delete(`http://localhost:8080/api/products/${id}`))
                )
                .then(() => {
                    setProducts(prevProducts => prevProducts.filter(product => !selectedIds.includes(product.id)));
                    setSelectedIds([]);
                    toast.success("Đã xóa sản phẩm thành công");
                })
                .catch(error => {
                    console.error('Error deleting products:', error);
                    toast.error("Đã xảy ra lỗi khi xóa sản phẩm");
                });
            }
        } else {
            toast.error("Chưa chọn sản phẩm nào để xóa");
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = useMemo(() => 
        products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [products, searchTerm]);

    const isSelected = (id) => selectedIds.includes(id);

    return (
        <Box m="20px">
            <Header title="Sản phẩm" subtitle="Bảng danh sách sản phẩm" />

            {error ? (
                <div>Lỗi: {error}</div>
            ) : (
                <>
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="3px"
                        mb="20px"
                        width="250px"
                        height="35px"
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, py: 1 }}
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mb="20px">
                        {selectedIds.length <= 1 && (
                            <Button
                                type="button"
                                color="secondary"
                                variant="contained"
                                onClick={handleEditOrAddProduct}
                                sx={{ marginRight: '10px' }}
                            >
                                {selectedIds.length === 1 ? "Sửa" : "Thêm mới"}
                            </Button>
                        )}
                        {selectedIds.length > 0 && (
                            <Button
                                type="button"
                                color="secondary"
                                variant="contained"
                                onClick={handleDeleteProduct}
                                sx={{ marginRight: '10px' }}
                            >
                                {selectedIds.length > 1 ? "Xóa những mục đã chọn" : "Xóa"}
                            </Button>
                        )}
                    </Box>
                    {products.length === 0 ? (
                        <div>Không có sản phẩm nào được tìm thấy.</div>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Tên sản phẩm</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Mô tả</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Loại</TableCell>
                                        {/* <TableCell sx={{ color: 'white' }}>Khuyến mãi</TableCell> */}
                                        <TableCell sx={{ color: 'white' }}>Hình ảnh</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Ngày tạo</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Ngày cập nhật</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredProducts.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            onClick={() => handleRowClick(row.id)}
                                            sx={{
                                                cursor: 'pointer',
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                backgroundColor: isSelected(row.id) ? colors.primary[300] : 'inherit',
                                                '&:hover': {
                                                    backgroundColor: colors.primary[200],
                                                },
                                            }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected(row.id)}
                                                    onChange={() => handleRowClick(row.id)}
                                                    color="primary"
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            {/* <TableCell>{row.promotion}</TableCell> */}
                                            <TableCell>
                                                {row.imgUrl ? (
                                                    <img
                                                        src={`/assets/img/${row.imgUrl}`} // Ensure path is correct
                                                        alt="Product image"
                                                        width={100}
                                                        height={100}
                                                    />
                                                ) : (
                                                    <span>Không có ảnh</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{row.createdAt}</TableCell>
                                            <TableCell>{row.updatedAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}
            <ToastContainer />
        </Box>
    );
};

export default Product;
