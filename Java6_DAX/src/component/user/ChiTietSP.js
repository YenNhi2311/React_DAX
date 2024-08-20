<<<<<<< HEAD
<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/templatemo.css';

const ChiTietSP = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [skus, setSkus] = useState([]);
    const [selectedSku, setSelectedSku] = useState({});
    const [imgProduct, setImgProduct] = useState(require('../../assets/img/iphone-15-den-1.jpg'));
    const [colorImages, setColorImages] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(response => {
                const productData = response.data;
                setProduct(productData);
                setImgProduct(productData.imgUrl ? `/assets/img/${productData.imgUrl}` : require('../../assets/img/iphone-15-den-1.jpg'));

                axios.get(`http://localhost:8080/api/skus/product/${id}`)
                    .then(skusResponse => {
                        const skus = skusResponse.data;
                        setSkus(skus);
                        setSelectedSku(skus[0] || {});

                        const colorImgs = skus.map(sku => 
                            sku.attributesSkus
                                .filter(attr => attr.attributeOption.attributes.name === 'Màu')
                                .map(attr => attr.attributeOption.img)
                        ).flat();
                        setColorImages([...new Set(colorImgs)]);
                    })
                    .catch(error => {
                        console.error('Error fetching SKUs:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    const handleSkuChange = (sku) => {
        setSelectedSku(sku);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleAddToCart = async (productId, skuId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
        }

        console.log("Sending request with:", { userId, productId, skuId, quantity: 1 });

        try {
            const response = await axios.post(
                `http://localhost:8080/api/orders/cart/add/${userId}/${skuId}/${productId}/1`
            );

            if (response.status === 201) {
                console.log("API Response Data:", response.data);
                setSuccessMessage("Thêm giỏ hàng thành công");
                setTimeout(() => {
                    setSuccessMessage(""); // Xóa thông báo sau 3 giây
                }, 3000);
            } else {
                console.error("Failed to add product to cart:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    return (
        <div>
            <div className="container pb-5">
                <div className="row">
                    <div className="col-lg-5 mt-5">
                        <div className="card mb-3">
                            <img className="card-img img-fluid mt-3 mb-3" style={{ width: '70%', marginLeft: '80px' }} src={imgProduct} alt="Card image cap" id="product-detail" />
                        </div>
                        <div className="colors">
                            <h6>Màu sắc:</h6>
                            <ul className="list-unstyled d-flex">
                                {colorImages.map((img, index) => (
                                    <li key={index} style={{ marginRight: '10px' }}>
                                        <img
                                            src={`/assets/img/${img}`}
                                            alt={`color-${index}`}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                cursor: 'pointer',
                                                border: selectedColor === img ? '5px solid blue' : '1px solid #ddd'
                                            }}
                                            onClick={() => handleColorSelect(img)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-7 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="fw-bold fs-2" style={{color: 'blue' }}>{product.name}</h1>
                                <p className="fw-bold fs-3" style={{ fontWeight: '900', color: '#ff5733' }}>
                                    Giá: {selectedSku.price?.toLocaleString() || 'N/A'} VND
                                </p>
                                <ul className="list-unstyled d-flex mb-1">
                                    <li>
                                        <i className="text-warning fa fa-star" />
                                        <i className="text-warning fa fa-star" />
                                        <i className="text-warning fa fa-star" />
                                        <i className="text-muted fa fa-star" />
                                        <i className="text-muted fa fa-star" />
                                    </li>
                                </ul>
                                <h6 className='pt-3'>Mô tả:</h6>
                                <p>{product.description}</p>
                                <h6>Thông số sản phẩm:</h6>
                                <ul className="list-unstyled pb-3">
                                    {skus.map(sku => {
                                        const sortedAttributes = sku.attributesSkus
                                            .filter(attr => attr.attributeOption.attributes.name === 'Ram' || attr.attributeOption.attributes.name === 'Dung lượng')
                                            .sort((a, b) => {
                                                if (a.attributeOption.attributes.name === 'Ram') return -1;
                                                if (b.attributeOption.attributes.name === 'Dung lượng') return 1;
                                                return 0;
                                            });

                                        return (
                                            <li
                                                key={sku.id}
                                                className={`sku-option ${selectedSku.id === sku.id ? 'selected' : ''}`}
                                                onClick={() => handleSkuChange(sku)}
                                                style={{
                                                    border: '1px solid #ddd',
                                                    padding: '10px',
                                                    margin: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {sortedAttributes.map((attr, index) => (
                                                    <span key={attr.id} className="attribute">
                                                        {attr.attributeOption.value}
                                                        {index < sortedAttributes.length - 1 && ' - '}
                                                    </span>
                                                ))}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="row pb-3">
                                    <div className="col d-grid">
                                        <button type="button" className="btn btn-success btn-lg" onClick={() => handleAddToCart(product.id, selectedSku.id)}>Thêm vào giỏ hàng</button>
                                    </div>
                                    <div className="col d-grid">
                                        <button type="button" className="btn btn-success btn-lg">Mua ngay</button>
                                    </div>
                                </div>
                                {successMessage && <p className="text-success">{successMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChiTietSP;
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import React, { Component } from 'react'
import '../../assets/css/fontawesome.css';
import '../../assets/css/fontawesome.min.css';
import '../../assets/css/slick-theme.css';
import '../../assets/css/slick-theme.min.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/templatemo.min.css';

export default class ChiTietSP extends Component {

    state = {
        //Bắt buộc require nếu lấy từ trong máy ra
        imgProduct: require('../../assets/img/iphone-15-den-1.jpg')
    }

    renderPhone = (imgNewProduct) => {
        //Tạo 1 state mới
        let newState = {
            imgProduct: imgNewProduct
        }
        this.setState(newState);

        //cách 2
        this.setState({
            imgProduct: imgNewProduct
        });
    }

    render() {
            return (
                <div>
                    <div className="container pb-5">
                        <div className="row">
                            <div className="col-lg-5 mt-5">
                                <div className="card mb-3">
                                    <img className="card-img img-fluid mt-3 mb-3" style={{ width: '70%', marginLeft: '80px' }} src={this.state.imgProduct} alt="Card image cap" id="product-detail" />
                                </div>
                                <div className="row">
                                    {/*Start Controls*/}
                                    <div className="col-1 align-self-center">
                                        <a href="#multi-item-example" role="button" data-bs-slide="prev">
                                            <i className="text-dark fas fa-chevron-left" />
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </div>
                                    {/*End Controls*/}
                                    {/*Start Carousel Wrapper*/}
                                    <div id="multi-item-example" className="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                                        {/*Start Slides*/}
                                        <div className="carousel-inner product-links-wap" role="listbox">
                                            {/*First slide*/}
                                            <div className="carousel-item active">
                                                <div className="row" style={{ width: '100%', marginLeft: '20px' }}>
                                                    <div className="col-4" onClick={() => { this.renderPhone(require('../../assets/img/iphone-15-den-1.jpg')) }} style={{ curson: 'pointer' }}>
                                                        <a href="#">
                                                            <img className="card-img img-fluid " style={{ width: '70%', borderRadius: '10px' }} src={require('../../assets/img/Logo_iphone-15-den-1.jpg')} alt="Product Image 1" />
                                                        </a>
                                                    </div>
                                                    <div className="col-4" onClick={() => { this.renderPhone(require('../../assets/img/iphone-15-hong-1.jpg')) }} style={{ curson: 'pointer' }}>
                                                        <a href="#">
                                                            <img className="card-img img-fluid" style={{ width: '70%', borderRadius: '10px' }} src={require('../../assets/img/Logo_iphone-15-hong-1.jpg')} alt="Product Image 2" />
                                                        </a>
                                                    </div>
                                                    <div className="col-4" onClick={() => { this.renderPhone(require('../../assets/img/iphone-15-vang-1.jpg')) }} style={{ curson: 'pointer' }}>
                                                        <a href="#">
                                                            <img className="card-img img-fluid" style={{ width: '70%', borderRadius: '10px' }} src={require('../../assets/img/Logo_iphone-15-vang-1.jpg')} alt="Product Image 2" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*/.First slide*/}
                                            {/*Second slide*/}
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <a href="#">
                                                            <img className="card-img img-fluid" src="assets/img/product_single_04.jpg" alt="Product Image 4" />
                                                        </a>
                                                    </div>
                                                    <div className="col-4">
                                                        <a href="#">
                                                            <img className="card-img img-fluid" src="assets/img/product_single_05.jpg" alt="Product Image 5" />
                                                        </a>
                                                    </div>
                                                    <div className="col-4">
                                                        <a href="#">
                                                            <img className="card-img img-fluid" src="assets/img/product_single_06.jpg" alt="Product Image 6" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*/.Second slide*/}
                                            {/*Third slide*/}
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <a href="#">
                                                            <img className="card-img img-fluid" src="assets/img/product_single_07.jpg" alt="Product Image 7" />
                                                        </a>
                                                    </div>
                                                    <div className="col-4">
                                                        <a href="#">
                                                            <img className="card-img img-fluid" src="assets/img/product_single_08.jpg" alt="Product Image 8" />
                                                        </a>
                                                    </div>
                                                    <div className="col-4">
                                                        <a href="#">
                                                            <img className="card-img img-fluid" src="assets/img/product_single_09.jpg" alt="Product Image 9" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*/.Third slide*/}
                                        </div>
                                        {/*End Slides*/}
                                    </div>
                                    {/*End Carousel Wrapper*/}
                                    {/*Start Controls*/}
                                    <div className="col-1 align-self-center">
                                        <a href="#multi-item-example" role="button" data-bs-slide="next">
                                            <i className="text-dark fas fa-chevron-right" />
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                    {/*End Controls*/}
                                </div>
                            </div>
                            {/* col end */}
                            <div className="col-lg-7 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <h1 className="h2">Active Wear</h1>
                                        <p className="h3 py-2">$25.00</p>
                                        <p className="py-2">
                                            <i className="fa fa-star text-warning" />
                                            <i className="fa fa-star text-warning" />
                                            <i className="fa fa-star text-warning" />
                                            <i className="fa fa-star text-warning" />
                                            <i className="fa fa-star text-secondary" />
                                            <span className="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
                                        </p>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <h6>Brand:</h6>
                                            </li>
                                            <li className="list-inline-item">
                                                <p className="text-muted"><strong>Easy Wear</strong></p>
                                            </li>
                                        </ul>
                                        <h6>Description:</h6>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse. Donec condimentum elementum convallis. Nunc sed orci a diam ultrices aliquet interdum quis nulla.</p>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <h6>Avaliable Color :</h6>
                                            </li>
                                            <li className="list-inline-item">
                                                <p className="text-muted"><strong>White / Black</strong></p>
                                            </li>
                                        </ul>

                                        <form action method="GET">
                                            <input type="hidden" name="product-title" defaultValue="Activewear" />
                                            <div className="row">
                                                <div className="col-auto">
                                                    <ul className="list-inline pb-3">
                                                        <li className="list-inline-item">Size :
                                                            <input type="hidden" name="product-size" id="product-size" defaultValue="S" />
                                                        </li>
                                                        <li className="list-inline-item"><span className="btn btn-success btn-size">Đen</span></li>
                                                        <li className="list-inline-item"><span className="btn btn-success btn-size">Hồng</span></li>
                                                        <li className="list-inline-item"><span className="btn btn-success btn-size">Vàng</span></li>

                                                    </ul>
                                                </div>
                                                <div className="col-auto">
                                                    <ul className="list-inline pb-3">
                                                        <li className="list-inline-item text-right">
                                                            Quantity
                                                            <input type="hidden" name="product-quanity" id="product-quanity" defaultValue={1} />
                                                        </li>
                                                        <li className="list-inline-item"><span className="btn btn-success" id="btn-minus">-</span></li>
                                                        <li className="list-inline-item"><span className="badge bg-secondary" id="var-value">1</span></li>
                                                        <li className="list-inline-item"><span className="btn btn-success" id="btn-plus">+</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row pb-3">
                                                <div className="col d-grid">
                                                    <button type="submit" className="btn btn-success btn-lg" name="submit" value="buy"  >Buy</button>
                                                </div>
                                                <div className="col d-grid">
                                                    <button type="submit" className="btn btn-success btn-lg" name="submit" value="addtocard">Add To Cart</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
