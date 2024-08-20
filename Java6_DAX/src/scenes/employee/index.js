import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import request from "../../config/ApiConfig/index";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employees, setEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await request({
        method: "GET",
        path: "/api/employees",
      });

      if (response) {
        const dataWithId = response.map((employee) => ({
          id: employee.id,
          username: employee.username,
          password: employee.password,
          email: employee.email,
          fullname: employee.fullname,
          phoneNumber: employee.phoneNumber,
          profileImgURL: `/img/${employee.profilePicture}`,
          createdAt: employee.createdAt
            ? new Date(employee.createdAt).toLocaleDateString()
            : "N/A",
          updatedAt: employee.updatedAt
            ? new Date(employee.updatedAt).toLocaleDateString()
            : "N/A",
          status: employee.status,
          gender: employee.gender,
          role: employee.role,
        }));
        setEmployees(dataWithId);
      }
    };

    fetchEmployees();
  }, []);

  const handleUpdateStatus = async () => {
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn ít nhất một người dùng.");
      return;
    }

    if (status === null || status === undefined) {
      alert("Vui lòng chọn trạng thái.");
      return;
    }

    const employeesToUpdate = employees
      .filter((employee) => selectedIds.includes(employee.id))
      .map((employee) => ({
        id: employee.id,
        status: status,
      }));

    try {
      const response = await request({
        method: "POST",
        path: "/api/employees/updateStatus",
        data: employeesToUpdate,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        alert("Cập nhật thành công");

        // Cập nhật lại danh sách nhân viên sau khi cập nhật trạng thái
        const updatedResponse = await request({
          method: "GET",
          path: "/api/employees",
        });

        if (updatedResponse) {
          const formattedData = updatedResponse.map((employee) => ({
            id: employee.id,
            username: employee.username,
            password: employee.password,
            email: employee.email,
            fullname: employee.fullname,
            phoneNumber: employee.phoneNumber,
            profileImgURL: `/img/${employee.profilePicture}`,
            createdAt: employee.createdAt
              ? new Date(employee.createdAt).toLocaleDateString()
              : "N/A",
            updatedAt: employee.updatedAt
              ? new Date(employee.updatedAt).toLocaleDateString()
              : "N/A",
            status: employee.status,
            gender: employee.gender,
            role: employee.role,
          }));

          setEmployees(formattedData);
        }

        // Kiểm tra nếu nhân viên hiện tại bị khóa
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (
          currentUser &&
          employeesToUpdate.some(
            (emp) => emp.id === currentUser.id && emp.status === status
          )
        ) {
          localStorage.removeItem("currentUser");
          navigate("/login");
        }
      } else {
        alert("Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleEditClick = (id) => {
    navigate(`/admin/employeeForm/${id}`);
  };

  const handleAddClick = () => {
    navigate("/admin/employeeForm");
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const isChecked = (id) => selectedIds.includes(id);

  return (
    <Box m="20px">
      <Header title="Employee" subtitle="Bảng điều khiển > Employee" />

      <Box m="20px 0" display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Thêm
        </Button>
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
            <MenuItem value="">Chọn trạng thái</MenuItem>
            <MenuItem value="true">Hoạt động</MenuItem>
            <MenuItem value="false">Khóa</MenuItem>
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
      </Box>

      <Box m="40px 0 0 0" height="75vh">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={
                      selectedIds.length === employees.length &&
                      employees.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(
                          employees.map((employee) => employee.id)
                        );
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>URL Ảnh</TableCell>
                <TableCell>Phân quyền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  onClick={() => handleCheckboxChange(employee.id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: isChecked(employee.id)
                      ? colors.blueAccent[600]
                      : "inherit",
                  }}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isChecked(employee.id)}
                      onChange={() => handleCheckboxChange(employee.id)}
                    />
                  </TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.username}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.fullname}</TableCell>
                  <TableCell>{employee.gender ? "Nam" : "Nữ"}</TableCell>
                  <TableCell>{employee.phoneNumber}</TableCell>
                  <TableCell>
                    <img
                      src={employee.profileImgURL}
                      alt="Profile"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </TableCell>
                  <TableCell>{employee.role ? "Admin" : "User"}</TableCell>
                  <TableCell>
                    {employee.status ? "Hoạt động" : "Khóa"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(employee.id)}
                    >
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Employee;
