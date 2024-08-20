import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
<<<<<<< HEAD
<<<<<<< HEAD
import { deleteCookie } from "../../services/cookie";
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

<<<<<<< HEAD
<<<<<<< HEAD
  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    localStorage.removeItem("userName");
    window.location.href = "/"; // Chuyển hướng về trang chủ sau khi đăng xuất
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Tìm kiếm..." />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
<<<<<<< HEAD
<<<<<<< HEAD
      </Box> */}
=======
      </Box>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
      </Box>
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="dropdown">
            <a
              className="nav-icon position-relative text-decoration-none"
              href="#"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span style={{ color: "white" }}>
                <PersonOutlinedIcon />
              </span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
=======
          <PersonOutlinedIcon />
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
          <PersonOutlinedIcon />
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
