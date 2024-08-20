<<<<<<< HEAD
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
=======
import { useState } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import { useState } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import Topbar from "./scenes/global/Topbar";
import AdSidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
<<<<<<< HEAD
<<<<<<< HEAD
import request from "./config/ApiConfig/index";
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import "./Admin.css";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AdSidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin;
