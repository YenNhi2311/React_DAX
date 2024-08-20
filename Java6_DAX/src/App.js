<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

// Import các trang người dùng và quản trị
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import các trang người dùng
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import Shop from "./page/users/Shop";
import TrangChu from "./page/users/TrangChu";
import Login from "./page/account/Login";
import Register from "./page/account/Register";
import ShopSingle from "./page/users/ShopSingle";
import ProfileKh from "./page/users/profileKH";
import GioHang from "./page/users/giohang";
import ThanhToan from "./page/users/ThanhToan";
import HoanThanh from "./page/users/HoanThanh";
import History from "./page/users/MainContent";
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from "./page/account/profileKH";
import MainLayout from "./MainLayout";

=======
import MainLayout from "./MainLayout";

// Import các trang quản trị
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import MainLayout from "./MainLayout";

// Import các trang quản trị
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import Admin from "./MainAdmin"; // Đổi từ MainAdmin thành Admin để đồng bộ với tên import
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
<<<<<<< HEAD
<<<<<<< HEAD
import Employee from "./scenes/employee";
import EmployeeForm from "./scenes/employeeForm";
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
<<<<<<< HEAD
<<<<<<< HEAD
import TBCategory from "./scenes/category/tablecategorie";
import FOCategory from "./scenes/category/formcategories";
import TBPromotion from "./scenes/promotion/tablepromotion";
import FOPromotion from "./scenes/promotion/formpromotinon";
import TableProduct from "./scenes/products/tableproduct";
import FormProduct from "./scenes/products/formproduct";

import FormAttribute from "./scenes/attributes/formAttributes";
import TableAttribute from "./scenes/attributes/tableAttributes";
import FormAttributeOption from "./scenes/attributes_option/formAttributesOption";
import TableAttributeOption from "./scenes/attributes_option/tableAttributeOption";

import TableSkus from "./scenes/skus/tableSkus";
import FormSkus from "./scenes/skus/formSkus";

import FormAttributeSkus from "./scenes/attributes_skus/formAttributeSkus";
import TableAttributeSkus from "./scenes/attributes_skus/tableAttributeSkus";

import PrivateRoute from "./PrivateRoute"; // Import component PrivateRoute
import DanhGia from "./page/users/danhGia";
import ReturnPage from "./page/users/Return";
=======

import "./Admin.css";
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======

import "./Admin.css";
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes công khai */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<TrangChu />} />
          <Route path="/shop" element={<Shop />} />
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/chitiet" element={<ShopSingle />}>
            <Route path="" />
            <Route path=":id" />
          </Route>
          <Route path="/danhgia/:orderId/:productId" element={<DanhGia />} />
=======
          <Route path="/chitiet" element={<ShopSingle />} />
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
          <Route path="/chitiet" element={<ShopSingle />} />
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
          <Route path="/ttkhachhang" element={<ProfileKh />} />
          <Route path="/giohang" element={<GioHang />} />
          <Route path="/thanhtoan" element={<ThanhToan />} />
          <Route path="/hoanthanh" element={<HoanThanh />} />
          <Route path="/history" element={<History />} />
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment/return" element={<ReturnPage />} />
        </Route>

        {/* Routes quản trị */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="team" element={<Team />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="form" element={<Form />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="geography" element={<Geography />} />
          <Route path="employee" element={<Employee />} />
          <Route path="tablecategory" element={<TBCategory />} />
          <Route path="category" element={<FOCategory />} />
          <Route path="category/:id" element={<FOCategory />} />
          <Route path="tableproduct" element={<TableProduct />} />
          <Route path="formproduct" element={<FormProduct />} />
          <Route path="formproduct/:id" element={<FormProduct />} />
          <Route path="tablepromotion" element={<TBPromotion />} />
          <Route path="formpromotion" element={<FOPromotion />} />
          {/* Attribues */}
          <Route path="tableAttributes" element={<TableAttribute />} />
          <Route path="formAttributes" element={<FormAttribute />} />
          <Route path="formAttributes/:id" element={<FormAttribute />} />
          {/* Skus */}
          <Route path="tableSkus" element={<TableSkus />} />
          <Route path="formSkus" element={<FormSkus />} />
          <Route path="formSkus/:id" element={<FormSkus />} />
          {/* Attribute_Skus */}
          <Route path="tableAttributSkus" element={<TableAttributeSkus />} />
          <Route path="formAttributSkus" element={<FormAttributeSkus />} />
          <Route path="formAttributSkus/:id" element={<FormAttributeSkus />} />
          {/* Attributes_Option */}
          <Route
            path="tableAttributeOption"
            element={<TableAttributeOption />}
          />
          <Route path="formAttributeOption" element={<FormAttributeOption />} />
          <Route
            path="formAttributeOption/:id"
            element={<FormAttributeOption />}
          />
          <Route path="employeeForm/:id" element={<EmployeeForm />} />
          <Route path="employeeForm" element={<EmployeeForm />} />
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        </Route>

        {/* Routes quản trị */}
        <Route element={<Admin />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/team" element={<Team />} />
          <Route path="/admin/contacts" element={<Contacts />} />
          <Route path="/admin/invoices" element={<Invoices />} />
          <Route path="/admin/form" element={<Form />} />
          <Route path="/admin/bar" element={<Bar />} />
          <Route path="/admin/pie" element={<Pie />} />
          <Route path="/admin/line" element={<Line />} />
          <Route path="/admin/faq" element={<FAQ />} />
          <Route path="/admin/calendar" element={<Calendar />} />
          <Route path="/admin/geography" element={<Geography />} />
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
