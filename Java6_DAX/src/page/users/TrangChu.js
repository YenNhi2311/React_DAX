<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
=======
import React, { Component } from 'react';
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
import React, { Component } from 'react';
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import '../../assets/css/fontawesome.css';
import '../../assets/css/fontawesome.min.css';
import '../../assets/css/slick-theme.css';
import '../../assets/css/slick-theme.min.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/templatemo.min.css';

<<<<<<< HEAD
<<<<<<< HEAD
import SanPhamNoiBat from '../../component/user/SanPhamNoiBat';
import Loai from '../../component/user/Loai';

const TrangChu = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchLatestProducts();
    }, []);

    const fetchLatestProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/latest');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching latest products:", error);
        }
    };

    return (
        <div>
            {/* Modal */}
            <div className="modal fade bg-white" id="templatemo_search" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="w-100 pt-1 mb-5 text-right">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form method="get" className="modal-content modal-body border-0 p-0">
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..." />
                            <button type="submit" className="input-group-text bg-success text-light">
                                <i className="fa fa-fw fa-search text-white" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Banner Hero */}
            <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {products.map((product, index) => (
                        <div key={product.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <div className="container">
                                <div className="row p-5">
                                    <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                        <img className="img-fluid" src={`http://localhost:8080/assets/img/${product.imgUrl}`} alt={product.name} />
                                    </div>
                                    <div className="col-lg-6 mb-0 d-flex align-items-center">
                                        <div className="text-align-left">
                                            <h1 className="h1 text-success"><b>{product.name}</b></h1>
                                            <h3 className="h2">{product.description}</h3>
                                            <p>
                                                <Link className="btn btn-success text-white mt-2" to={`/chitiet/${product.id}`}>
                                                    Chi tiết
                                                </Link>
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
// Import hình ảnh
import bannerImg01 from '../../assets/img/Remove-bg.ai_1721388795613.png';
import bannerImg02 from '../../assets/img/Remove-bg.ai_1721417611424.png';
import bannerImg03 from '../../assets/img/Remove-bg.ai_1721418360942.png';
import SanPhamNoiBat from '../../component/user/SanPhamNoiBat';
import Loai from '../../component/user/Loai';

export default class TrangChu extends Component {
    render() {
        return (
            <div>
        
                

                {/* Modal */}
                <div className="modal fade bg-white" id="templatemo_search" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="w-100 pt-1 mb-5 text-right">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form method="get" className="modal-content modal-body border-0 p-0">
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..." />
                                <button type="submit" className="input-group-text bg-success text-light">
                                    <i className="fa fa-fw fa-search text-white" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Banner Hero */}
                <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={0} className="active" />
                        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={1} />
                        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row p-5">
                                    <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                        <img className="img-fluid" src={bannerImg01} alt="Banner 01" />
                                    </div>
                                    <div className="col-lg-6 mb-0 d-flex align-items-center">
                                        <div className="text-align-left align-self-center">
                                            <h1 className="h1 text-success"><b>IPhone</b> 15 Pro Max</h1>
                                            <h3 className="h2">Sử dụng chuẩn sạc mới</h3>
                                            <p>
                                            Trong một bước đổi đáng chú ý, iPhone 15 Pro Max 512 GB đã quyết định từ bỏ cổng Lightning quen thuộc và chuyển sang cổng Type-C tiện lợi hơn. Quyết định này mang lại nhiều lợi ích, bao gồm khả năng tương thích rộng rãi với các thiết bị khác, cung cấp trải nghiệm sạc nhanh và truyền dữ liệu hiệu quả hơn 
                                               ...
                                                <a rel="sponsored" className="text-success" href="https://icons8.com/" target="_blank" > Chi tiết</a>
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
<<<<<<< HEAD
<<<<<<< HEAD
                    ))}
                </div>
                <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
                    <i className="fas fa-chevron-left" />
                </a>
                <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
                    <i className="fas fa-chevron-right" />
                </a>
            </div>

            {/* Categories of The Month */}
            <section className="container py-5">
                <Loai />
            </section>

            {/* Featured Product */}
            <section className="bg-light">
                <SanPhamNoiBat />
            </section>
        </div>
    );
};

export default TrangChu;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row p-5">
                                    <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                        <img className="img-fluid" src={bannerImg02} alt="Banner 02" />
                                    </div>
                                    <div className="col-lg-6 mb-0 d-flex align-items-center">
                                        <div className="text-align-left">
                                            <h1 className="h1">MacBook Pro 14 2023 M3 8 </h1>
                                            <h3 className="h2">CPU/10 GPU/8GB/1TB</h3>
                                            <p>
                                            là một sản phẩm laptop mới của Apple với sự tập trung vào hiệu suất và đồ họa cao cấp. Dựa trên con chip M3, sản phẩm này được trang bị một CPU mạnh mẽ cùng thiết kế thanh lịch hứa hẹn mang đến trải nghiệm làm việc mượt mà và hiệu quả trên một máy tính di động mạnh mẽ ... 
                                            <a rel="sponsored" className="text-success" href="https://icons8.com/" target="_blank" >Chi tiết</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row p-5">
                                    <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                        <img className="img-fluid" src={bannerImg03} alt="Banner 03" />
                                    </div>
                                    <div className="col-lg-6 mb-0 d-flex align-items-center">
                                        <div className="text-align-left">
                                            <h1 className="h1">Samsung Galaxy Watch Ultra</h1>
                                            <p>
                                            Khai mở trải nghiệm smartwatch hoàn toàn mới của bạn, Galaxy Watch Ultra ghi điểm mạnh mẽ nhờ phong cách thể thao đậm chất và bộ khung vỏ Titanium siêu bền bỉ. Sản phẩm được trang bị cảm biến sức khỏe BioActive thế hệ mới và khéo léo vận dụng công nghệ AI đễ hỗ trợ người dùng rèn luyện sức khỏe...
                                            <a rel="sponsored" className="text-success" href="https://icons8.com/" target="_blank" >Chi tiết</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
                        <i className="fas fa-chevron-left" />
                    </a>
                    <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
                        <i className="fas fa-chevron-right" />
                    </a>
                </div>

                {/* Categories of The Month */}
                <section className="container py-5">
                    <Loai/>
                </section>

                {/* Featured Product */}
                <section className="bg-light">
                    <SanPhamNoiBat/>
                </section>

               
               
            </div>
        );
    }
}
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
