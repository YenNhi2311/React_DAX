import React, { useEffect, useState } from 'react';
import { Box, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, InputBase, CircularProgress, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import request from '../../config/ApiConfig/index'; // Import hàm request
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttributeOptions = ({ onSelectAttributeOption }) => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [skus, setSkus] = useState([]);
    const [product, setProduct] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skusResponse, productResponse] = await Promise.all([
                    request({ method: 'GET', path: '/api/skus' }),
                    request({ method: 'GET', path: '/api/products' })
                ]);

                if (skusResponse && productResponse) {
                    const productMap = productResponse.reduce((map, product) => {
                        map[product.id] = product.name;
                        return map;
                    }, {});

                    const dataWithId = skusResponse.map(option => ({
                        id: option.id,
                        code: option.code,
                        productName: productMap[option.product.id], // Lấy tên sản phẩm từ `productMap`
                        price: option.price
                    }));

                    dataWithId.sort((a, b) => b.id - a.id);

                    const id = params.id || searchParams.get("id") || null;
                    if (id) {
                        const initialSelection = dataWithId.find(option => option.id === id);
                        if (initialSelection) {
                            setSelectedIds([initialSelection.id]);
                            if (onSelectAttributeOption) {
                                onSelectAttributeOption(initialSelection);
                            }
                        }
                    }

                    setSkus(dataWithId);
                    setProduct(productMap);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams, params.id, onSelectAttributeOption]);

    const handleRowClick = (id) => {
        setSelectedIds(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id)
                : [...prevSelected, id]
        );

        const selectedOption = skus.find(option => option.id === id);
        if (onSelectAttributeOption && selectedOption) {
            onSelectAttributeOption(selectedOption);
        }
    };

    const handleEditOrAddAttributeOption = () => {
        if (selectedIds.length === 1) {
            navigate(`/admin/formSkus/${selectedIds[0]}`, { state: { mode: "edit" } });
        } else if (selectedIds.length === 0) {
            navigate(`/admin/formSkus`, { state: { mode: "add" } });
        } else {
            toast.error("Chỉ có thể chỉnh sửa một SKU tại một thời điểm");
        }
    };

    const handleDeleteAttributeOption = () => {
        if (selectedIds.length > 0) {
            if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} SKU không?`)) {
                Promise.all(
                    selectedIds.map(id => request({
                        method: 'DELETE',
                        path: `/api/skus/${id}`,
                    }))
                )
                    .then(() => {
                        console.log("Xóa thành công các SKU");
                        setSkus(prevOptions => prevOptions.filter(option => !selectedIds.includes(option.id)));
                        setSelectedIds([]);
                        toast.success("Xóa thành công các SKU");
                    })
                    .catch(error => {
                        console.error('Lỗi khi xóa các SKU:', error);
                        toast.error("Đã xảy ra lỗi khi xóa các SKU");
                    });
            }
        } else {
            toast.error("Không có SKU nào được chọn để xóa");
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredOptions = skus.filter(option =>
        option.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isSelected = (id) => selectedIds.includes(id);

    return (
        <Box m="20px">
            <Header title="SKUs" subtitle="List of SKUs" />

            {error ? (
                <div>Error: {error}</div>
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
                            placeholder="Search..."
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
                                onClick={handleEditOrAddAttributeOption}
                                sx={{ marginRight: '10px' }}
                            >
                                {selectedIds.length === 1 ? "Edit" : "Add New"}
                            </Button>
                        )}
                        {selectedIds.length > 0 && (
                            <Button
                                type="button"
                                color="secondary"
                                variant="contained"
                                onClick={handleDeleteAttributeOption}
                                sx={{ marginRight: '10px' }}
                            >
                                {selectedIds.length > 1 ? "Delete Selected" : "Delete"}
                            </Button>
                        )}
                    </Box>
                    {loading ? (
                        <CircularProgress />
                    ) : skus.length === 0 ? (
                        <div>No SKUs found.</div>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Code</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredOptions.map((row) => (
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
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>{row.productName}</TableCell>
                                            <TableCell>{row.price}</TableCell>
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

export default AttributeOptions;
