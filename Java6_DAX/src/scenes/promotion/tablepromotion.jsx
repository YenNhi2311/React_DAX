import React, { useEffect, useState } from 'react';
import { Box, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, InputBase } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import axios from 'axios';
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';  // Import toast và ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import stylesheet cho toast

const Promotions = ({ onSelectPromotion }) => {
  // Khai báo các state và hooks
  const [searchParams] = useSearchParams();  // Đọc tham số tìm kiếm từ URL
  const params = useParams();  // Đọc tham số từ URL
  const theme = useTheme();  // Lấy theme hiện tại
  const navigate = useNavigate();  // Hàm điều hướng
  const colors = tokens(theme.palette.mode);  // Lấy các màu sắc từ theme
  const [promotions, setPromotions] = useState([]);  // Danh sách các khuyến mãi
  const [selectedIds, setSelectedIds] = useState([]);  // Danh sách các ID khuyến mãi đang chọn
  const [error, setError] = useState(null);  // Lưu thông báo lỗi
  const [searchTerm, setSearchTerm] = useState('');  // Từ khóa tìm kiếm
  const [newRowId, setNewRowId] = useState(null);  // ID của hàng mới thêm vào
  const [editedRowId, setEditedRowId] = useState(null);  // ID của hàng đã chỉnh sửa

  // Fetch dữ liệu khuyến mãi khi component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/promotions')
      .then(response => {
        // Định dạng dữ liệu khuyến mãi và sắp xếp theo ID giảm dần
        const dataWithId = response.data.map(promotion => ({
          id: promotion.promotionID,
          name: promotion.promotionName,
          percents: promotion.percents,
          startDate: promotion.startDate ? new Date(promotion.startDate).toLocaleDateString() : "N/A",
          endDate: promotion.endDate ? new Date(promotion.endDate).toLocaleDateString() : "N/A",
        }));

        dataWithId.sort((a, b) => b.id - a.id);

        // Tìm hàng mới được thêm vào
        const newAddedRow = dataWithId.find(newPromotion =>
          !promotions.some(existingPromotion => existingPromotion.id === newPromotion.id)
        );

        setPromotions(dataWithId);
        if (newAddedRow) {
          setNewRowId(newAddedRow.id);
        }

        // Nếu có ID trong URL, chọn khuyến mãi tương ứng
        const id = params.id || searchParams.get("id") || null;
        if (id) {
          const initialSelection = dataWithId.find(promotion => promotion.id === id);
          if (initialSelection) {
            setSelectedIds([initialSelection.id]);
            if (onSelectPromotion) {
              onSelectPromotion(initialSelection);
            }
          }
        }
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu:', error);
        setError(error.message);  // Lưu thông báo lỗi
      });
  }, [searchParams, params.id, onSelectPromotion]);

  // Reset ID hàng mới và hàng đã chỉnh sửa sau 5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setNewRowId(null);
      setEditedRowId(null);
    }, 5000);

    return () => clearTimeout(timer);  // Dọn dẹp timer khi component unmount
  }, [promotions]);

  // Hàm xử lý khi nhấp chuột vào một hàng
  const handleRowClick = (id) => {
    setSelectedIds(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(selectedId => selectedId !== id)  // Bỏ chọn nếu đã chọn
        : [...prevSelected, id]  // Thêm chọn nếu chưa chọn
    );

    const selectedPromotion = promotions.find(promotion => promotion.id === id);
    if (onSelectPromotion && selectedPromotion) {
      onSelectPromotion(selectedPromotion);  // Gọi hàm callback nếu có
    }
  };

  // Hàm xử lý khi thêm mới hoặc chỉnh sửa khuyến mãi
  const handleEditOrAddPromotion = () => {
    if (selectedIds.length === 1) {
      navigate(`/admin/formpromotion/${selectedIds[0]}`, { state: { mode: "edit" } });
    } else {
      navigate(`/admin/formpromotion`, { state: { mode: "add" } });
    }
  };

  // Hàm xử lý khi khuyến mãi được cập nhật
  const handlePromotionUpdated = (updatedPromotionId) => {
    setEditedRowId(updatedPromotionId);
  };

  // Hàm xử lý xóa khuyến mãi đã chọn
  const handleDeletePromotion = () => {
    if (selectedIds.length > 0) {
      if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} khuyến mãi?`)) {
        Promise.all(
          selectedIds.map(id => axios.delete(`http://localhost:8080/api/promotions/${id}`))
        )
          .then(() => {
            console.log("Đã xóa các khuyến mãi thành công");
            setPromotions(prevPromotions => prevPromotions.filter(promotion => !selectedIds.includes(promotion.id)));
            setSelectedIds([]);
            toast.success("Đã xóa khuyến mãi thành công");  // Hiển thị thông báo thành công
          })
          .catch(error => {
            console.error('Lỗi khi xóa khuyến mãi:', error);
            toast.error("Đã xảy ra lỗi khi xóa khuyến mãi");  // Hiển thị thông báo lỗi
          });
      }
    } else {
      toast.error("Chưa chọn khuyến mãi nào để xóa");  // Hiển thị thông báo nếu không chọn khuyến mãi
    }
  };

  // Hàm xử lý tìm kiếm khuyến mãi
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Lọc các khuyến mãi dựa trên từ khóa tìm kiếm
  const filteredPromotions = promotions.filter(promotion =>
    promotion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Kiểm tra xem một ID có được chọn không
  const isSelected = (id) => selectedIds.includes(id);

  return (
    <Box m="20px">
      <Header title="Khuyến mãi" subtitle="Bảng danh sách khuyến mãi" />

      {error ? (
        <div>Lỗi: {error}</div>  // Hiển thị thông báo lỗi nếu có
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
                onClick={handleEditOrAddPromotion}
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
                onClick={handleDeletePromotion}
                sx={{ marginRight: '10px' }}
              >
                {selectedIds.length > 1 ? "Xóa những mục đã chọn" : "Xóa"}
              </Button>
            )}
          </Box>
          {promotions.length === 0 ? (
            <div>Không có khuyến mãi nào được tìm thấy.</div>  // Hiển thị thông báo nếu không có dữ liệu
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Tên khuyến mãi</TableCell>
                    <TableCell sx={{ color: 'white' }}>Phần trăm khuyến mãi</TableCell>
                    <TableCell sx={{ color: 'white' }}>Ngày bắt đầu</TableCell>
                    <TableCell sx={{ color: 'white' }}>Ngày kết thúc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPromotions.map((row) => (
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
                      <TableCell>{row.percents}</TableCell>
                      <TableCell>{row.startDate}</TableCell>
                      <TableCell>{row.endDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      <ToastContainer />  {/* Đặt ToastContainer để hiển thị thông báo */}
    </Box>
  );
};

export default Promotions;
