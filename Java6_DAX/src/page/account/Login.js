<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/Auth";
import "../../assets/css/login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies(["token", "role"]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const { employee, token, role } = await loginApi({
        username: data.username,
        password: data.password,
      });

      // Kiểm tra trạng thái tài khoản
      if (employee.status === false) {
        setError(
          "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên."
        );
        return;
      }

      // Xử lý đăng nhập và lưu trữ token, vai trò
      if (token) {
        const expiryDate = new Date(Date.now() + 3600000); // 1 giờ hết hạn
        setCookie("token", token, { path: "/", expires: expiryDate });
        setCookie("role", role ? "admin" : "user", {
          path: "/",
          expires: expiryDate,
        });

        localStorage.setItem("userId", employee.id);
        navigate(role ? "/admin" : "/");
      } else {
        setError("Đã xảy ra lỗi khi đăng nhập.");
      }
    } catch (error) {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác.");
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  return (
    <div className="bodyLogin pt-5">
      <div className="pt-5">
        <div className="box col-6 offset-3">
          <h1>Đăng Nhập</h1>
          <form onSubmit={handleSubmit(login)}>
            <div className="in col-10">
              <label
                style={labelStyle}
                htmlFor="username"
                className="labelform"
              >
                Tên đăng nhập:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="username"
                {...register("username", { required: true })}
              />
            </div>

            <div className="in col-10">
              <label
                style={labelStyle}
                htmlFor="password"
                className="labelform"
              >
                Mật khẩu:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                {...register("password", { required: true })}
              />
            </div>

            <div className="row">
              <div className="in col-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Lưu mật khẩu
                </label>
              </div>

              <div className="in2 col-3">
                <a className="link" href="/forgot-password">
                  Quên mật khẩu
                </a>
              </div>
            </div>

            <button type="submit" className="btnLogin btn btn-primary">
              Đăng nhập
            </button>

            {error && <p className="text-danger">{error}</p>}

            <p></p>
            <a className="link1" href="/register">
              Bạn chưa có tài khoản?
            </a>
            <a className="link2" href="/register">
              <span>Đăng ký</span>
            </a>
            <p></p>
          </form>
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/Auth'; // No need for getProfile anymore
import '../../assets/css/fontawesome.css';
import '../../assets/css/fontawesome.min.css';
import '../../assets/css/slick-theme.css';
import '../../assets/css/slick-theme.min.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/slick.min.css.map';
import '../../assets/css/templatemo.css';
import '../../assets/css/templatemo.min.css';
import '../../assets/css/login.css';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies(['token', 'role']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = async (value) => {
    try {
      const { employee, token, role } = await loginApi({
        username: value?.username,
        password: value?.password,
      });

      console.log('Phản hồi đăng nhập:', { employee, token, role }); // Debugging

      if (token) {
        const date = new Date(Date.now() + 3600000); // 1 giờ hết hạn
        setCookie("token", token, { path: "/", expires: date });

        if (typeof role === 'boolean') {
          const roleValue = role ? 'admin' : 'user';
          setCookie("role", roleValue, { path: "/", expires: date });
          navigate(role ? '/admin' : '/'); // Chuyển hướng dựa trên vai trò boolean
        } else {
          setError('Vai trò không xác định.');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
      } else {
        console.error('Lỗi không xác định:', error);
      }
    }
  };
  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  return (
    <div>
      <div className='bodyLogin pt-5'>
        <div className='pt-5'>
          <div className='box col-6 offset-3'>
            <h1>Đăng Nhập</h1>
            <form onSubmit={handleSubmit(login)}>
              <div className="in col-10">
                <label style={labelStyle} htmlFor="username" className="labelform">Tên đăng nhập:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="username"
                  {...register('username')}
                />
              </div>

              <div className="in col-10">
                <label style={labelStyle} htmlFor="password" className="labelform">Mật khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register('password')}
                />
              </div>

              <div className='row'>
                <div className='in col-4'>
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                  <label className="form-check-label" htmlFor="flexCheckChecked">Lưu mật khẩu</label>
                </div>

                <div className='in2 col-3'>
                  <a className="link" href="/forgot-password">Quên mật khẩu</a>
                </div>
              </div>

              <button type="submit" className='btnLogin btn btn-primary'>Đăng nhập</button>

              {error && <p className="text-danger">{error}</p>}

              <p></p>
              <a className='link1' href="/register">Bạn chưa có tài khoản?</a>
              <a className='link2' href="/register"><span>Đăng ký</span></a>
              <p></p>
            </form>
          </div>
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
        </div>
      </div>
    </div>
  );
};

export default Login;
