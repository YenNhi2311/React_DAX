import React, { Component } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../../services/cookie";

export default class Head extends Component {
  state = {
    cartCount: 0,
  };

  // Example method to add an item to the cart
  addItemToCart = () => {
    // Increase the cart count
    this.setState((prevState) => ({
      cartCount: prevState.cartCount + 1,
    }));
  };

  state = {
    isLoggedIn: false,
    userName: "",
  };

  componentDidMount() {
    // Kiểm tra trạng thái đăng nhập từ cookie hoặc localStorage
    const token = getCookie("token");
    const userName = localStorage.getItem("userName");
    if (token) {
      this.setState({ isLoggedIn: true, userName });
    }
  }

  handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    localStorage.removeItem("userName");
    this.setState({ isLoggedIn: false, userName: "" });
    window.location.href = "/"; // Chuyển hướng về trang chủ sau khi đăng xuất
  };

  render() {
    const { isLoggedIn, userName } = this.state;
    const { cartCount } = this.props;

=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6

import { Link } from "react-router-dom";

export default class Head extends Component {
  render() {
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
          id="templatemo_nav_top"
        >
          <div className="container text-light">
            <div className="w-100 d-flex justify-content-between">
              <div>
                <i className="fa fa-envelope mx-2" />
                <a
                  className="navbar-sm-brand text-light text-decoration-none"
                  href="mailto:info@company.com"
                >
                  info@company.com
                </a>
                <i className="fa fa-phone mx-2" />
                <a
                  className="navbar-sm-brand text-light text-decoration-none"
                  href="tel:010-020-0340"
                >
                  010-020-0340
                </a>
              </div>
              <div>
                <a
                  className="text-light"
                  href="https://fb.com/templatemo"
                  target="_blank"
                  rel="sponsored"
                >
                  <i className="fab fa-facebook-f fa-sm fa-fw me-2" />
                </a>
                <a
                  className="text-light"
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-sm fa-fw me-2" />
                </a>
                <a
                  className="text-light"
                  href="https://twitter.com/"
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-sm fa-fw me-2" />
                </a>
                <a
                  className="text-light"
                  href="https://www.linkedin.com/"
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-sm fa-fw" />
                </a>
              </div>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light shadow">
          <div className="container d-flex justify-content-between align-items-center">
            <a
              className="navbar-brand text-success logo h1 align-self-center"
              href="index.html"
            >
              Zay
            </a>
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#templatemo_main_nav"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
              id="templatemo_main_nav"
            >
              <div className="flex-fill">
                <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  <li className="nav-item">
                    <Link to="/" className="h3 text-decoration-none">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/shop" className="h3 text-decoration-none">
                      Shop
                    </Link>
                  </li>
<<<<<<< HEAD
<<<<<<< HEAD
                  {isLoggedIn && (
                    <li className="nav-item">
                      <Link to="/history" className="h3 text-decoration-none">
                        History
                      </Link>
                    </li>
                  )}
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                  <li className="nav-item">
                    <Link to="/history" className="h3 text-decoration-none">
                      History
                    </Link>
                  </li>
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                </ul>
              </div>
              <div className="navbar align-self-center d-flex">
                <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="inputMobileSearch"
                      placeholder="Search ..."
                    />
                    <div className="input-group-text">
                      <i className="fa fa-fw fa-search" />
                    </div>
                  </div>
                </div>
                <a
                  className="nav-icon d-none d-lg-inline"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#templatemo_search"
                >
                  <i className="fa fa-fw fa-search text-dark mr-2" />
                </a>
                <a
                  className="nav-icon position-relative text-decoration-none"
<<<<<<< HEAD
<<<<<<< HEAD
                  href="/giohang"
                >
                  <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    {cartCount}
                  </span>
                </a>

                <div className="dropdown">
                  <a
                    className="nav-icon position-relative text-decoration-none"
                    href="#"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-fw fa-user text-dark mr-3"></i>
                    {isLoggedIn && (
                      <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                        {userName}
                      </span>
                    )}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {!isLoggedIn ? (
                      <>
                        <li>
                          <Link to="/login" className="dropdown-item">
                            Đăng Nhập
                          </Link>
                        </li>
                        <li>
                          <Link to="/register" className="dropdown-item">
                            Đăng Ký
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/profile" className="dropdown-item">
                            Thông tin người dùng
                          </Link>
                        </li>
                        <li>
                          <Link to="/change-password" className="dropdown-item">
                            Đổi mật khẩu
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={this.handleLogout}
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                  href="#"
                >
                  <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    7
                  </span>
                </a>

                <a
                  className="nav-icon position-relative text-decoration-none"
                  href="#"
                >
                  <i className="fa fa-fw fa-user text-dark mr-3"></i>
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    +99
                  </span>
                  <div className="dropdown-menu">
                    {/* <a className="dropdown-item" href="/login">Đăng Nhập</a> */}
                    <Link to="/login" className="dropdown-item">
                      Đăng Nhập
                    </Link>
                    {/* <a className="dropdown-item" href="/register">Đăng Ký</a> */}
                    <Link to="/register" className="dropdown-item">
                      Đăng Ký
                    </Link>
                  </div>
                </a>
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
