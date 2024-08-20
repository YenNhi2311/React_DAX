import React, { useState } from 'react';
import '../../assets/css/fontawesome.css';
import '../../assets/css/fontawesome.min.css';
import '../../assets/css/slick-theme.css';
import '../../assets/css/slick-theme.min.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/templatemo.min.css';
import '../../assets/css/login.css';
import { registerApi } from '../../services/RegisterAPI'; // Import API đăng ký
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullname: '',
        phoneNumber: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        fullname: '',
        phoneNumber: '',
        confirmPassword: '',
        general: ''
    });

    const navigate = useNavigate(); // Hook useNavigate để điều hướng

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
            general: ''
        }));
    };

    const validateForm = () => {
        const { username, password, confirmPassword, phoneNumber, email, fullname } = formData;
        let validationErrors = {};

        if (!username) {
            validationErrors.username = 'Tên đăng nhập không được bỏ trống!';
        } else if (username.length < 6) {
            validationErrors.username = 'Tên đăng nhập phải có ít nhất 6 ký tự!';
        }

        if (!password) {
            validationErrors.password = 'Mật khẩu không được bỏ trống!';
        } else if (password.length < 8) {
            validationErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự!';
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Xác nhận mật khẩu không được bỏ trống!';
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
        }

        if (!phoneNumber) {
            validationErrors.phoneNumber = 'Số điện thoại không được bỏ trống!';
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Số điện thoại phải là 10 chữ số!';
        }

        if (!email) {
            validationErrors.email = 'Email không được bỏ trống!';
        }

        if (!fullname) {
            validationErrors.fullname = 'Họ và tên không được bỏ trống!';
        }

        return Object.keys(validationErrors).length > 0 ? validationErrors : null;
    };

    const handleRegister = async () => {
        const validationErrors = validateForm();
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }

        const { username, password, email, fullname, phoneNumber } = formData;

        try {
            await registerApi({ username, password, email, fullname, phoneNumber });
            setErrors({ username: '', password: '', email: '', fullname: '', phoneNumber: '', confirmPassword: '', general: '' }); // Xóa lỗi khi đăng ký thành công
            alert('Đăng ký thành công!');
            navigate('/login'); // Chuyển hướng tới trang login
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                let specificErrors = {};
                if (message.includes('Username already exists')) {
                    specificErrors.username = 'Tên đăng nhập đã tồn tại!';
                }
                if (message.includes('Email already exists')) {
                    specificErrors.email = 'Email đã tồn tại!';
                }
                if (message.includes('Phone number already exists')) {
                    specificErrors.phoneNumber = 'Số điện thoại đã tồn tại!';
                }
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    ...specificErrors,
                    general: `Lỗi đăng ký: ${message}`
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: 'Lỗi đăng ký không xác định!'
                }));
                console.error('Lỗi không xác định:', error);
            }
        }
    };

    const { username, password, email, fullname, phoneNumber, confirmPassword } = formData;

    return (
        <div>
            <div className='bodyLogin pt-5'>
                <div className='box col-8 offset-2'>
                    <h1>Đăng Ký</h1>

                    <div style={{ marginTop: '40px' }} className="row">
                        <div className="col-6">
                            <div className="inRes">
                                <label style={{ color: 'black', fontSize: '18px' }} className="form-label">
                                    Tên đăng nhập:
                                </label>
                                <input
                                    name="username"
                                    type="text"
                                    className="inpRes form-control"
                                    aria-describedby="emailHelp"
                                    onChange={handleInputChange}
                                    value={username} // Thêm value để đồng bộ với state
                                />
                                {errors.username && <p className="text-danger">{errors.username}</p>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="inRes">
                                <label style={{ color: 'black', fontSize: '18px' }} className="form-label">
                                    Họ và tên:
                                </label>
                                <input
                                    name="fullname"
                                    type="text"
                                    className="inpRes form-control"
                                    aria-describedby="emailHelp"
                                    onChange={handleInputChange}
                                    value={fullname} // Thêm value để đồng bộ với state
                                />
                                {errors.fullname && <p className="text-danger">{errors.fullname}</p>}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }} className="row">
                        <div className="col-6">
                            <div className="inRes">
                                <label style={{ color: 'black', fontSize: '18px' }} className="form-label">
                                    Mật khẩu:
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    className="inpRes form-control"
                                    aria-describedby="emailHelp"
                                    onChange={handleInputChange}
                                    value={password} // Thêm value để đồng bộ với state
                                />
                                {errors.password && <p className="text-danger">{errors.password}</p>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="inRes">
                                <label style={{ color: 'black', fontSize: '18px' }} className="form-label">
                                    Xác nhận mật khẩu:
                                </label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    className="inpRes form-control"
                                    aria-describedby="emailHelp"
                                    onChange={handleInputChange}
                                    value={confirmPassword} // Thêm value để đồng bộ với state
                                />
                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }} className="row">
                        <div className="col-6">
                            <div className="inRes">
                                <label style={{ color: 'black', fontSize: '18px' }} className="form-label">
                                    Email:
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    className="inpRes form-control"
                                    aria-describedby="emailHelp"
                                    onChange={handleInputChange}
                                    value={email} // Thêm value để đồng bộ với state
                                />
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="inRes">
                                <label style={{ color: 'black', fontSize: '18px' }} className="form-label">
                                    Số điện thoại:
                                </label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    className="inpRes form-control"
                                    aria-describedby="emailHelp"
                                    onChange={handleInputChange}
                                    value={phoneNumber} // Thêm value để đồng bộ với state
                                />
                                {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                            </div>
                        </div>
                    </div>
                    {errors.general && <p className="text-danger">{errors.general}</p>}
                    
                    <button className='btnRes btn btn-primary' type="button" onClick={handleRegister}>
                        Đăng ký
                    </button>
                    
                    <p></p>
                    <a className='back mb-5' href="/login"><button type="button" className='btn btn-floating mx-1'>
                        <i className="fa-solid fa-arrow-left "></i>
                    </button></a>
                </div>
            </div>
        </div>
    );
};

export default Register;
