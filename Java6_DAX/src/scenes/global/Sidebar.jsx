<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState } from "react";
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import { useState } from "react";
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import userImg from "../../assets/img/user.jpg";
<<<<<<< HEAD
<<<<<<< HEAD
import request from "../../config/ApiConfig";
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
<<<<<<< HEAD
<<<<<<< HEAD
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found");

        const response = await request({
          method: "GET",
          path: `/api/auth/user/${userId}`,
        });

        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
<<<<<<< HEAD
<<<<<<< HEAD
                  src={`/assets/img/${userData.profilePicture}`}
=======
                  src={userImg}
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                  src={userImg}
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
<<<<<<< HEAD
<<<<<<< HEAD
                  {userData?.fullname || "Tên người dùng"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userData?.username || "Tên người dùng"}
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Trang Chủ"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu
              title="Quản lý khách hàng"
              icon={<PeopleOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách khách hàng"
<<<<<<< HEAD
<<<<<<< HEAD
                to="/admin/employee"
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu khách hàng"
                to="/admin/form"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu
              title="Quản lý khuyến mãi"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách khuyến mãi"
<<<<<<< HEAD
<<<<<<< HEAD
                to="/admin/tablepromotion"
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu khuyến mãi"
<<<<<<< HEAD
<<<<<<< HEAD
                to="/admin/formpromotion"
=======
                to="/admin/calendar"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                to="/admin/calendar"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title="Quản lý sản phẩm"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách sản phẩm"
<<<<<<< HEAD
<<<<<<< HEAD
                to="/admin/tableproduct"
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu sản phẩm"
<<<<<<< HEAD
<<<<<<< HEAD
                to="/admin/formproduct"
=======
                to="/admin/calendar"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                to="/admin/calendar"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======

>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
            <SubMenu
              title="Quản lý loại"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách loại"
<<<<<<< HEAD
<<<<<<< HEAD
                to="/admin/tablecategory"
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                to="/admin/form"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu loại"
<<<<<<< HEAD
<<<<<<< HEAD
                to="/admin/category"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title="Quản lý Thuộc Tính"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách thuộc tính"
                to="/admin/tableAttributes"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu thuộc tính"
                to="/admin/formAttributes"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title=" Giá Trị Thuộc Tính"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách giá trị thuộc tính"
                to="/admin/tableAttributeOption"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu giá trị thuộc tính"
                to="/admin/formAttributeOption"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title="Mã Sản Phẩm"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách Mã"
                to="/admin/tableSkus"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu Mã"
                to="/admin/formSkus"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title="Kết Nối"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách Mã"
                to="/admin/tableAttributSkus"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu thuộc tính"
                to="/admin/formAttributSkus"
=======
                to="/admin/calendar"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
                to="/admin/calendar"
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title="Quản lý hóa đơn"
              icon={<PersonOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Danh sách hóa đơn"
                to="/admin/invoices"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Biểu mẫu hóa đơn"
                to="/admin/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu
              title="Charts"
              icon={<BarChartOutlinedIcon />}
              style={{ color: colors.grey[300] }}
            >
              <Item
                title="Bar Chart"
                to="/admin/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/admin/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Line Chart"
                to="/admin/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Geography Chart"
                to="/admin/geography"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
