<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import {
  Box,
  Button,
  IconButton,
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
<<<<<<< HEAD
<<<<<<< HEAD
  TextField,
  MenuItem,
  IconButton,
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../component/Header";
import StatBox from "../../component/StatBox";
<<<<<<< HEAD
<<<<<<< HEAD
import request from "../../config/ApiConfig";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PieChart from "../../component/PieChart";
=======
import { useEffect, useState } from "react";
import request from "../../config/ApiConfig"; // Đảm bảo bạn đã cấu hình ApiConfig đúng cách
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import { useEffect, useState } from "react";
import request from "../../config/ApiConfig"; // Đảm bảo bạn đã cấu hình ApiConfig đúng cách
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

<<<<<<< HEAD
<<<<<<< HEAD
  const [reports, setReports] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [years, setYears] = useState([]);

  const months = [
    { value: "1", label: "Tháng 1" },
    { value: "2", label: "Tháng 2" },
    { value: "3", label: "Tháng 3" },
    { value: "4", label: "Tháng 4" },
    { value: "5", label: "Tháng 5" },
    { value: "6", label: "Tháng 6" },
    { value: "7", label: "Tháng 7" },
    { value: "8", label: "Tháng 8" },
    { value: "9", label: "Tháng 9" },
    { value: "10", label: "Tháng 10" },
    { value: "11", label: "Tháng 11" },
    { value: "12", label: "Tháng 12" },
  ];

  const fetchProductCount = async () => {
    try {
      const response = await request({
        method: "GET",
        path: "/api/statistics/products",
      });
      console.log("Product Count:", response);
      setProductCount(response);
    } catch (error) {
      console.error("Error fetching product count:", error);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const response = await request({
        method: "GET",
        path: "/api/statistics/orders",
      });
      console.log("Order Count:", response);
      setOrderCount(response);
    } catch (error) {
      console.error("Error fetching order count:", error);
    }
  };

  const fetchCustomerCount = async () => {
    try {
      const response = await request({
        method: "GET",
        path: "/api/statistics/customers",
      });
      console.log("Customer Count:", response);
      setCustomerCount(response);
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await request({
        method: "GET",
        path: "/api/statistics/revenue",
      });
      console.log("Revenue:", response);
      setRevenue(response);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  const fetchMonthlySalesData = async () => {
    try {
      const response = await request({
        method: "GET",
        path: `/api/statistics/monthlySales?month=${month}&year=${year}`,
      });
      console.log("Monthly Sales Data:", response);
      // Chuyển đổi dữ liệu để phù hợp với bảng
      const formattedData = response.map((item) => ({
        name: item[0],
        quantity: item[1],
        revenue: item[2],
      }));
      setReports(formattedData);
    } catch (error) {
      console.error("Error fetching monthly sales data:", error);
      setReports([]);
    }
  };

  const handleSearch = () => {
    fetchMonthlySalesData();
  };

  useEffect(() => {
    // Lấy tháng và năm hiện tại
    const currentMonth = new Date().getMonth() + 1; // getMonth() trả về giá trị từ 0-11, nên cần cộng thêm 1
    const currentYear = new Date().getFullYear();

    // Thiết lập state ban đầu
    setMonth(currentMonth.toString());
    setYear(currentYear.toString());

    fetchProductCount();
    fetchOrderCount();
    fetchCustomerCount();
    fetchRevenue();
  }, []);

  useEffect(() => {
    // Cập nhật danh sách các năm
    const generateYears = (startYear, endYear) => {
      const yearsArray = [];
      for (let year = startYear; year <= endYear; year++) {
        yearsArray.push({ value: year.toString(), label: year.toString() });
      }
      return yearsArray;
    };

    const currentYear = new Date().getFullYear();
    const startYear = 2020; // Năm bắt đầu
    const futureYears = 10; // Số năm tương lai
    const endYear = currentYear + futureYears;
    setYears(generateYears(startYear, endYear));
  }, []);

  const handleDownloadReport = (reportId) => {
    console.log("Downloading report with ID:", reportId);
    // Implement download logic here
  };

  const handlePreviousMonth = () => {
    let newMonth = parseInt(month) - 1;
    let newYear = parseInt(year);
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    setMonth(newMonth.toString());
    setYear(newYear.toString());
  };

  const handleNextMonth = () => {
    let newMonth = parseInt(month) + 1;
    let newYear = parseInt(year);
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    setMonth(newMonth.toString());
    setYear(newYear.toString());
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await request({
          method: "GET",
          path: "/api/reports",
        });

        setReports(response);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleDownloadReport = (reportId) => {
    // Logic to download report
    console.log("Downloading report with ID:", reportId);
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Trang chủ" subtitle="Bảng điều khiển > Trang chủ" />

<<<<<<< HEAD
<<<<<<< HEAD
        {/* <Box>
=======
        <Box>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
        <Box>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Tải xuống báo cáo
          </Button>
<<<<<<< HEAD
<<<<<<< HEAD
        </Box> */}
=======
        </Box>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
        </Box>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
<<<<<<< HEAD
<<<<<<< HEAD
            title={productCount}
            subtitle="Sản phẩm"
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            title="12,361"
            subtitle="Sản phẩm"
            progress="0.75"
            increase="+14%"
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
<<<<<<< HEAD
<<<<<<< HEAD
            title={orderCount}
            subtitle="Đơn hàng"
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            title="431,225"
            subtitle="Đơn hàng"
            progress="0.50"
            increase="+21%"
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
<<<<<<< HEAD
<<<<<<< HEAD
            title={customerCount}
            subtitle="Khách hàng"
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            title="32,441"
            subtitle="Khách hàng"
            progress="0.30"
            increase="+5%"
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
<<<<<<< HEAD
<<<<<<< HEAD
            title={revenue}
            subtitle="Doanh thu"
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            title="1,325,134"
            subtitle="Doanh thu"
            progress="0.80"
            increase="+43%"
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
<<<<<<< HEAD
<<<<<<< HEAD

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          {/* Add your content here */}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {/* Add your content here */}
        </Box>
      </Box>

      {/* MONTHLY SALES REPORT */}
      <Box mt="40px">
        <Typography variant="h4" gutterBottom>
          Báo cáo bán hàng theo tháng
        </Typography>
        <Box display="flex" alignItems="center" mb="20px">
          <IconButton onClick={handlePreviousMonth}>
            <ArrowLeftIcon />
          </IconButton>
          <TextField
            select
            label="Tháng"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            variant="outlined"
            style={{ width: "150px", marginRight: "10px" }}
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Năm"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            variant="outlined"
            style={{ width: "150px", marginRight: "10px" }}
          >
            {years.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <IconButton onClick={handleNextMonth}>
            <ArrowRightIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Box>

=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
      </Box>

      {/* REPORTS TABLE */}
      <Box mt="20px">
        <Typography variant="h6" gutterBottom>
          Báo cáo
        </Typography>
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
<<<<<<< HEAD
<<<<<<< HEAD
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng bán</TableCell>
                <TableCell>Doanh thu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports &&
                reports.length > 0 &&
                reports.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name || "N/A"}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.revenue}</TableCell>
                  </TableRow>
                ))}
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                <TableCell>Mã báo cáo</TableCell>
                <TableCell>Người báo cáo</TableCell>
                <TableCell>Nội dung báo cáo</TableCell>
                <TableCell>Loại nội dung</TableCell>
                <TableCell>Lý do</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports?.map((report) => (
                <TableRow key={report.report_id}>
                  <TableCell>{report.report_id}</TableCell>
                  <TableCell>{report.reportedbyuser_id}</TableCell>
                  <TableCell>{report.reportedcontent_id}</TableCell>
                  <TableCell>{report.content_type}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>
                    {new Date(report.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDownloadReport(report.report_id)}
                    >
                      Tải xuống
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
