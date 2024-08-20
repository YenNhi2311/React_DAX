import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/fontawesome.css';
import '../../assets/css/fontawesome.min.css';
import '../../assets/css/slick-theme.css';
import '../../assets/css/slick-theme.min.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/templatemo.min.css';

export default class HoanThanh extends Component {
    render() {
        return (
           <div>
               {/* <div className="page-wrapper">
  <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: 'url("assets/")', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
    <div className="container text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
      <h1 className="display-4">Welcome to Our Shop</h1>
      <p className="lead">Your one-stop destination for all your shopping needs</p>
    </div> */}
  {/* </div> */}
<div class="container mt-4">
    <div class="row">
        <div class="col-lg-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-light p-3 rounded shadow-sm">
                    <li class="breadcrumb-item">
                        <a href="/giohang" class="text-primary text-decoration-none">Giỏ hàng</a>
                    </li>
                    <li class="breadcrumb-item active text-dark" aria-current="page">
                        <a href="/ThanhToan" class="text-primary text-decoration-none">Thanh toán</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page" style={{ fontWeight: 'bold', color: 'black' }}>Hoàn thành</li>

                </ol>
            </nav>
        </div>
    </div>
</div>
{/* 
</div> */}


                <div className="col-8 offset-2 pt-5">
                    <div className="alert alert-success" role="alert">
                        Đặt hàng thành công!
                    </div>
                    <p className="d-inline-flex gap-1 d-flex justify-content-center">
                        <a className="btn btn-danger" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Chi tiết đơn hàng
                        </a>
                    </p>
                    <div className="collapse pt-3" id="collapseExample">
                        <div className="card card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sản phẩm</th>
                                            <th scope="col">Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h6>Iphone 14 pro max</h6>
                                                <p>Phiên bản 128GB</p>
                                                
                                            </td>
                                            <td>27.000.000 VND</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Mã đơn hàng:</td>
                                            <td>001</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Tên người nhận:</td>
                                            <td>Nguyễn Văn A</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Địa chỉ người nhận:</td>
                                            <td>Cần Thơ</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Số điện thoại liên hệ:</td>
                                            <td>0912345678</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Phương thức thanh toán:</td>
                                            <td>Thanh toán khi nhận hàng</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">Tổng:</td>
                                            <td>27.000.000 VND</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
        );
    }
}
