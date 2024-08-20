import {
  Box,
  useTheme,
  MenuItem,
  Select,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
<<<<<<< HEAD
<<<<<<< HEAD
  IconButton,
  Checkbox,
=======
  Checkbox,
  IconButton,
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
  Checkbox,
  IconButton,
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import request from "../../config/ApiConfig/index";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [invoices, setInvoices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState("");
<<<<<<< HEAD
<<<<<<< HEAD
  const [selectedInvoice, setSelectedInvoice] = useState(null);
=======
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to hold selected invoice for detail view
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to hold selected invoice for detail view
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await request({
          method: "GET",
          path: "/api/orders",
        });

        const formattedData = response.map((invoice) => ({
          id: invoice.orderId,
          orderId: invoice.orderId,
<<<<<<< HEAD
<<<<<<< HEAD
          username: invoice.user.username,
          employee: invoice?.username || "N/A",
          payment: invoice?.payment?.paymentName || "N/A",
          orderDate: new Date(invoice.orderDate).toLocaleDateString(),
          totalAmount: invoice.totalAmount,
          shippingFee: invoice.shippingFee.toFixed(2),
          status: invoice.status,
          orderDetails: invoice.orderDetails || [],
          address: invoice.address || "N/A",
          phone: invoice.phone,
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          employee: invoice?.user?.fullname || "N/A",
          payment: invoice?.payment?.paymentName || "N/A",
          promotion: invoice?.promotion?.percents || "N/A",
          orderDate: new Date(invoice.orderDate).toLocaleDateString(),
          totalAmount: invoice.totalAmount.toFixed(2),
          shippingFee: invoice.shippingFee.toFixed(2),
          status: invoice.status,
          orderDetails: invoice.orderDetails || [], // Include order details
          user: invoice.user || {}, // Include user details
          address: invoice.address || {}, // Include address details
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        }));

        setInvoices(formattedData);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      if (selectedIds.length === 0) {
        alert("Vui lòng chọn ít nhất một hóa đơn.");
        return;
      }

      if (!status) {
        alert("Vui lòng chọn trạng thái.");
        return;
      }

      const ordersToUpdate = invoices
        .filter((invoice) => selectedIds.includes(invoice.id))
        .map((invoice) => ({
          orderId: invoice.id,
          status: status,
        }));

      await request({
        method: "POST",
        path: "/api/orders/updateStatus",
        data: ordersToUpdate,
<<<<<<< HEAD
<<<<<<< HEAD
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Refresh the invoices
      const response = await request({
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
      });

      // Refresh data after update
      const updatedResponse = await request({
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        method: "GET",
        path: "/api/orders",
      });

<<<<<<< HEAD
<<<<<<< HEAD
      const formattedData = response.map((invoice) => ({
        id: invoice.orderId,
        orderId: invoice.orderId,
        username: invoice.user.username,
        employee: invoice?.username || "N/A",
        payment: invoice?.payment?.paymentName || "N/A",
        orderDate: new Date(invoice.orderDate).toLocaleDateString(),
        totalAmount: invoice.totalAmount,
        shippingFee: invoice.shippingFee.toFixed(2),
        status: invoice.status,
        orderDetails: invoice.orderDetails || [],
        address: invoice.address || "N/A",
        phone: invoice.phone,
      }));

      setInvoices(formattedData);
      setSelectedIds([]);
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
      const formattedData = updatedResponse.map((invoice) => ({
        id: invoice.orderId,
        orderId: invoice.orderId,
        employee: invoice?.user?.fullname || "N/A",
        payment: invoice?.payment?.paymentName || "N/A",
        promotion: invoice?.promotion?.percents || "N/A",
        orderDate: new Date(invoice.orderDate).toLocaleDateString(),
        totalAmount: invoice.totalAmount.toFixed(2),
        shippingFee: invoice.shippingFee.toFixed(2),
        status: invoice.status,
        orderDetails: invoice.orderDetails || [], // Include order details
        user: invoice.user || {}, // Include user details
        address: invoice.address || {}, // Include address details
      }));

      setInvoices(formattedData);
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(invoices.map((invoice) => invoice.id));
    } else {
      setSelectedIds([]);
    }
  };

<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  const handleSelectRow = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseDetails = () => {
    setSelectedInvoice(null);
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const sortAttributes = (attributes) => {
    const order = ["màu", "RAM", "dung lượng"];
    return attributes.sort((a, b) => {
      const aIndex = order.indexOf(a.attributeOption.value.toLowerCase());
      const bIndex = order.indexOf(b.attributeOption.value.toLowerCase());
      return aIndex - bIndex;
    });
  };

  const calculateTotalAmount = (orderDetails) => {
    return orderDetails.reduce(
      (total, detail) => total + detail.skus.price * detail.quantity,
      0
    );
  };

  const getPaymentStatus = (invoice) => {
    if (invoice.payment.paymentType === false) {
      return "Đã thanh toán";
    } else if (invoice.payment.paymentType === true) {
      if (status === "Chờ xác nhận" || status === "Đang vận chuyển") {
        return "Chưa thanh toán";
      } else if (status === "Đã nhận") {
        return "Đã thanh toán";
      }
    }
    // return "Không xác định";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  return (
    <Box m="20px">
      <Header title="Hóa Đơn" subtitle="Bảng điều khiển > Hóa Đơn" />
      <Box display="flex" alignItems="center" mb="20px">
        <Typography variant="h6" sx={{ mr: "20px" }}>
          Cập nhật trạng thái:
        </Typography>
        <Select
          value={status}
          onChange={handleStatusChange}
          displayEmpty
          inputProps={{ "aria-label": "Select Status" }}
        >
<<<<<<< HEAD
<<<<<<< HEAD
          <MenuItem value="" disabled="true">
            Chọn trạng thái
          </MenuItem>
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          <MenuItem value="Chờ xác nhận">Chờ xác nhận</MenuItem>
          <MenuItem value="Đang vận chuyển">Đang vận chuyển</MenuItem>
          <MenuItem value="Đã nhận">Đã nhận</MenuItem>
          <MenuItem value="Đã hủy">Đã hủy</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateStatus}
          sx={{ ml: "20px" }}
        >
          Cập nhật trạng thái
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        sx={{
          "& .MuiTableContainer-root": {
            backgroundColor: colors.primary[400],
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
<<<<<<< HEAD
<<<<<<< HEAD
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(invoices.map((invoice) => invoice.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
=======
                    onChange={handleSelectAll}
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                    onChange={handleSelectAll}
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                    checked={selectedIds.length === invoices.length}
                  />
                </TableCell>
                <TableCell>Mã</TableCell>
<<<<<<< HEAD
<<<<<<< HEAD
                <TableCell>Tài khoản</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell></TableCell>
                <TableCell>Chi tiết</TableCell>
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Thanh toán</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Phí giao hàng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Chi tiết</TableCell> {/* New column */}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
<<<<<<< HEAD
<<<<<<< HEAD
                <TableRow
                  key={invoice.id}
                  onClick={() => handleSelectRow(invoice.id)}
                  selected={selectedIds.includes(invoice.id)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedIds.includes(invoice.id)
                      ? colors.primary[700]
                      : "inherit",
                  }}
                >
=======
                <TableRow key={invoice.id}>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                <TableRow key={invoice.id}>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(invoice.id)}
                      onChange={() => handleSelectRow(invoice.id)}
                    />
                  </TableCell>
                  <TableCell>{invoice.orderId}</TableCell>
<<<<<<< HEAD
<<<<<<< HEAD
                  <TableCell>{invoice.username}</TableCell>
                  <TableCell>{invoice.employee}</TableCell>
                  <TableCell>{invoice.address}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>
                    <span>{getPaymentStatus(invoice)}</span>
                  </TableCell>
                  <TableCell>
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                  <TableCell>{invoice.employee}</TableCell>
                  <TableCell>{invoice.payment}</TableCell>
                  <TableCell>{invoice.orderDate}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell>{invoice.shippingFee}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                    <IconButton onClick={() => handleViewDetails(invoice)}>
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

<<<<<<< HEAD
<<<<<<< HEAD
=======
      {/* Modal or detail view */}
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
      {/* Modal or detail view */}
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
      {selectedInvoice && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            zIndex: 1300,
          }}
        >
<<<<<<< HEAD
<<<<<<< HEAD
          <Typography variant="h4" component="div">
            <h4>
              <strong>Chi tiết hóa đơn</strong>
            </h4>
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              <strong>Họ tên:</strong> {selectedInvoice.employee}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              <strong>Số điện thoại:</strong> {selectedInvoice.phone || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              <strong>Địa chỉ:</strong> {selectedInvoice.address || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              <strong>Phí ship:</strong> {selectedInvoice.shippingFee} VND
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              <strong>Phương thức thanh toán:</strong>{" "}
              {selectedInvoice.payment || "N/A"}
            </Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Cấu hình</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Đơn giá</TableCell>
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          <Typography variant="h6" gutterBottom>
            Chi tiết hóa đơn #{selectedInvoice.orderId}
          </Typography>
          <Typography gutterBottom>
            <strong>Người dùng:</strong>{" "}
            {selectedInvoice.user.fullname || "N/A"}
          </Typography>
          <Typography gutterBottom>
            <strong>Địa chỉ:</strong>{" "}
            {selectedInvoice.address.fullAddress || "N/A"}
          </Typography>
          <Typography gutterBottom>
            <strong>Phương thức thanh toán:</strong>{" "}
            {selectedInvoice.payment || "N/A"}
          </Typography>
          <Typography gutterBottom>
            <strong>Tổng tiền:</strong> {selectedInvoice.totalAmount} VND
          </Typography>
          <Typography gutterBottom>
            <strong>Phí giao hàng:</strong> {selectedInvoice.shippingFee} VND
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Màu</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Phụ thu</TableCell>
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                <TableCell>Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
<<<<<<< HEAD
<<<<<<< HEAD
              {selectedInvoice.orderDetails.map((detail) => (
                <TableRow key={detail.id}>
                  <TableCell>
                    <Typography>
                      {detail.skus?.product?.name || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {sortAttributes(detail.skus?.attributesSkus || []).map(
                      (attribute) => (
                        <Typography key={attribute.id}>
                          {attribute.attributeOption?.attributes?.name || "N/A"}
                          : {attribute.attributeOption?.value || "N/A"}
                        </Typography>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography>{detail.quantity || "N/A"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{detail.skus.price || "N/A"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {detail.skus.price * detail.quantity || "N/A"}
                    </Typography>
                  </TableCell>
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
              {selectedInvoice.orderDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.product?.name || "N/A"}</TableCell>
                  <TableCell>{detail.color?.color || "N/A"}</TableCell>
                  <TableCell>{detail.quantity}</TableCell>
                  <TableCell>{detail.unitPrice} VND</TableCell>
                  <TableCell>{detail.color.price || "0"}</TableCell>
                  <TableCell>
                    {(
                      Number(detail.unitPrice) * Number(detail.quantity) +
                      (Number(detail.color?.price) || 0)
                    ).toFixed(2)}{" "}
                    VND
                  </TableCell>{" "}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                </TableRow>
              ))}
            </TableBody>
          </Table>
<<<<<<< HEAD
<<<<<<< HEAD
          <Typography sx={{ fontSize: "1rem", mt: 3 }}>
            <h6>
              <strong>Tổng: </strong>{" "}
              <strong>
                {formatCurrency(
                  calculateTotalAmount(selectedInvoice.orderDetails)
                )}
              </strong>
            </h6>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, float: "inline-end" }}
            onClick={handleCloseDetails}
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          <Button
            onClick={handleCloseDetails}
            sx={{
              mt: 2,
              ml: "auto", // Thêm thuộc tính này để đẩy nút sang bên phải
              display: "block", // Đảm bảo nút hiển thị trên dòng riêng
              color: "blue",
            }}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          >
            Đóng
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Invoices;
