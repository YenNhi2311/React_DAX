import React, { useEffect, useState } from 'react'; // Import các hook của React để quản lý trạng thái và hiệu ứng
import { Box, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, InputBase } from "@mui/material"; // Import các thành phần từ Material-UI để xây dựng giao diện
import { tokens } from "../../theme"; // Import các token màu sắc từ theme của bạn
import Header from "../../component/Header"; // Import component Header của bạn
import axios from 'axios'; // Import thư viện axios để thực hiện các yêu cầu HTTP
import { useSearchParams, useParams, useNavigate } from "react-router-dom"; // Import các hook từ react-router-dom để xử lý điều hướng và tham số URL
import { toast, ToastContainer } from 'react-toastify'; // Import các hàm từ react-toastify để hiển thị thông báo
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify

const Category = ({ onSelectCategory }) => {
    const [searchParams] = useSearchParams(); // Lấy các tham số tìm kiếm từ URL
    const params = useParams(); // Lấy các tham số từ URL
    const theme = useTheme(); // Lấy theme hiện tại
    const navigate = useNavigate(); // Hook để điều hướng giữa các trang
    const colors = tokens(theme.palette.mode); // Lấy các màu sắc từ theme
    const [categories, setCategories] = useState([]); // Trạng thái lưu danh sách các loại
    const [selectedIds, setSelectedIds] = useState([]); // Trạng thái lưu các ID của loại được chọn
    const [error, setError] = useState(null); // Trạng thái lưu lỗi (nếu có)
    const [searchTerm, setSearchTerm] = useState(''); // Trạng thái lưu từ khóa tìm kiếm
    const [newRowId, setNewRowId] = useState(null); // Trạng thái lưu ID của hàng mới thêm
    const [editedRowId, setEditedRowId] = useState(null); // Trạng thái lưu ID của hàng vừa chỉnh sửa

    useEffect(() => {
        // Lấy danh sách các loại từ API
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                // Xử lý dữ liệu nhận được từ API
                const dataWithId = response.data.map(category => ({
                    id: category.categoryId,  // Lấy ID loại
                    name: category.categoryName, // Lấy tên loại
                    img: category.img, // Lấy đường dẫn hình ảnh loại
                    description: category.description // Lấy mô tả loại
                }));

                dataWithId.sort((a, b) => b.id - a.id); // Sắp xếp các loại theo ID giảm dần

                const newAddedRow = dataWithId.find(newCategory =>
                    !categories.some(existingCategory => existingCategory.id === newCategory.id) // Tìm hàng mới thêm
                );

                setCategories(dataWithId); // Cập nhật danh sách các loại
                if (newAddedRow) {
                    setNewRowId(newAddedRow.id); // Cập nhật ID của hàng mới thêm
                }

                const id = params.id || searchParams.get("id") || null; // Lấy ID từ tham số URL hoặc tìm kiếm
                if (id) {
                    const initialSelection = dataWithId.find(category => category.id === id); // Tìm loại đã chọn
                    if (initialSelection) {
                        setSelectedIds([initialSelection.id]); // Cập nhật các ID loại đã chọn
                        if (onSelectCategory) {
                            onSelectCategory(initialSelection); // Gọi hàm callback nếu có
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
                setError(error.message); // Cập nhật lỗi nếu có
            });
    }, [searchParams, params.id, onSelectCategory]); // Chạy lại hiệu ứng khi các tham số thay đổi

    useEffect(() => {
        // Đặt lại ID của hàng mới thêm và hàng vừa chỉnh sửa sau 5 giây
        const timer = setTimeout(() => {
            setNewRowId(null);
            setEditedRowId(null);
        }, 5000);

        return () => clearTimeout(timer); // Dọn dẹp bộ đếm thời gian khi component bị gỡ bỏ
    }, [categories]); // Chạy lại hiệu ứng khi danh sách các loại thay đổi

    const handleRowClick = (id) => {
        // Xử lý khi nhấp vào hàng trong bảng
        setSelectedIds(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id) // Bỏ chọn hàng nếu đã chọn
                : [...prevSelected, id] // Chọn hàng mới
        );

        const selectedCategory = categories.find(category => category.id === id); // Tìm loại đã chọn
        if (onSelectCategory && selectedCategory) {
            onSelectCategory(selectedCategory); // Gọi hàm callback nếu có
        }
    };

    const handleEditOrAddCategory = () => {
        // Xử lý khi nhấp vào nút sửa hoặc thêm mới loại
        if (selectedIds.length === 1) {
            navigate(`/admin/category/${selectedIds[0]}`, { state: { mode: "edit" } }); // Điều hướng đến trang sửa loại
        } else {
            navigate(`/admin/category`, { state: { mode: "add" } }); // Điều hướng đến trang thêm loại mới
        }
    };

    const handleCategoryUpdated = (updatedCategoryId) => {
        // Cập nhật ID của loại vừa chỉnh sửa
        setEditedRowId(updatedCategoryId);
    };

    const handleDeleteCategory = () => {
        // Xử lý khi nhấp vào nút xóa loại
        if (selectedIds.length > 0) {
            if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} loại?`)) {
                Promise.all(
                    selectedIds.map(id => axios.delete(`http://localhost:8080/api/categories/${id}`)) // Xóa các loại được chọn
                )
                    .then(() => {
                        console.log("Đã xóa các loại thành công");
                        setCategories(prevCategories => prevCategories.filter(category => !selectedIds.includes(category.id))); // Cập nhật danh sách loại sau khi xóa
                        setSelectedIds([]); // Xóa các ID đã chọn
                        toast.success("Đã xóa loại thành công"); // Hiển thị thông báo thành công
                    })
                    .catch(error => {
                        console.error('Lỗi khi xóa loại:', error);
                        toast.error("Đã xảy ra lỗi khi xóa loại"); // Hiển thị thông báo lỗi
                    });
            }
        } else {
            toast.error("Chưa chọn loại nào để xóa"); // Hiển thị thông báo nếu không có loại nào được chọn
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) // Lọc danh sách loại theo từ khóa tìm kiếm
    );

    const isSelected = (id) => selectedIds.includes(id); // Kiểm tra xem loại đã chọn hay chưa

    return (
        <Box m="20px">
            <Header title="Loại" subtitle="Bảng danh sách loại" /> {/* Hiển thị tiêu đề */}

            {error ? (
                <div>Lỗi: {error}</div> // Hiển thị lỗi nếu có
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
                            onChange={handleSearch} // Xử lý sự kiện thay đổi từ khóa tìm kiếm
                        />
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mb="20px">
                        {selectedIds.length <= 1 && (
                            <Button
                                type="button"
                                color="secondary"
                                variant="contained"
                                onClick={handleEditOrAddCategory} // Xử lý khi nhấp vào nút sửa hoặc thêm mới
                                sx={{ marginRight: '10px' }}
                            >
                                {selectedIds.length === 1 ? "Sửa" : "Thêm mới"} {/* Hiển thị văn bản nút dựa trên số lượng loại được chọn */}
                            </Button>
                        )}
                        {selectedIds.length > 0 && (
                            <Button
                                type="button"
                                color="secondary"
                                variant="contained"
                                onClick={handleDeleteCategory} // Xử lý khi nhấp vào nút xóa
                                sx={{ marginRight: '10px' }}
                            >
                                {selectedIds.length > 1 ? "Xóa những mục đã chọn" : "Xóa"} {/* Hiển thị văn bản nút dựa trên số lượng loại được chọn */}
                            </Button>
                        )}
                    </Box>
                    {categories.length === 0 ? (
                        <div>Không có loại nào được tìm thấy.</div> // Hiển thị thông báo nếu không có loại nào
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                                    <TableRow>
                                        <TableCell /> {/* Ô checkbox để chọn hàng */}
                                        <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Tên loại</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Hình ảnh</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Mô tả</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCategories.map((row) => (
                                        <TableRow
                                            key={row.id}  // Đảm bảo rằng row.id là duy nhất
                                            onClick={() => handleRowClick(row.id)} // Xử lý khi nhấp vào hàng
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
                                                    checked={isSelected(row.id)} // Kiểm tra xem checkbox đã chọn chưa
                                                    onChange={() => handleRowClick(row.id)} // Xử lý khi thay đổi trạng thái checkbox
                                                    color="primary"
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>
                                                {row.img && (
                                                    <img
                                                        src={`/assets/img/${row.img}`} // URL hình ảnh từ server
                                                        alt="Hình ảnh loại"
                                                        width={100}
                                                        height={100} // Hoặc chiều rộng khác bạn muốn
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{row.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}
            <ToastContainer /> {/* Hiển thị thông báo */}
        </Box>
    );
};

export default Category;
