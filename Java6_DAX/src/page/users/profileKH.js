import React from 'react';
import '../../assets/css/fontawesome.css';
import '../../assets/css/fontawesome.min.css';
import '../../assets/css/slick-theme.css';
import '../../assets/css/slick-theme.min.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/templatemo.min.css';
import '../../assets/css/login.css';

const ThongTinKhachHang = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
            <h2 className="mb-4">Thông Tin Khách Hàng</h2>
            <div className="col-5">
                <div className="mb-3">
                    <label className="form-label text-dark fs-5">Họ và tên:</label>
                    <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        aria-describedby="fullnameHelp"
                    />
                    <p className="text-danger">
                        {/* Error message for fullname */}
                    </p>
                </div>
                <div className="mb-3">
                    <label className="form-label text-dark fs-5">Email:</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                    <p className="text-danger">
                        {/* Error message for email */}
                    </p>
                </div>
                 <div className="mb-3">
                    <label className="form-label text-dark fs-5">Địa Chỉ:</label>
                    <input
                        name="diachi"
                        type="diachi"
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                    <p className="text-danger">
                        {/* Error message for email */}
                    </p>
                </div>
                <div className="mb-3">
                    <label className="form-label text-dark fs-5">Số điện thoại:</label>
                    <input
                        name="phone"
                        type="text"
                        className="form-control"
                        aria-describedby="phoneHelp"
                    />
                    <p className="text-danger">
                        {/* Error message for phone */}
                    </p>
                </div>
                <button className="btn btn-success w-100 fw-bold">Cập nhật</button>
            </div>
        </div>
    );
};

export default ThongTinKhachHang;
