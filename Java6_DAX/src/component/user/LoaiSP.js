<<<<<<< HEAD
<<<<<<< HEAD
import axios from "axios";
import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import "../../assets/css/templatemo.css";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";

export default class LoaiSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      filteredProducts: [],
      searchQuery: "",
      openItem: null,
      currentPage: 1,
      productsPerPage: 6,
      sortOption: "Nổi bật",
      successMessage: "thêm thành công", // Đưa vào state của constructor
    };

    // Ràng buộc phương thức
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.startVoiceSearch = this.startVoiceSearch.bind(this);
    this.stopVoiceSearch = this.stopVoiceSearch.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories() {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        const categories = response.data;
        console.log("Categories:", categories);
        const fetchProductsPromises = categories.map((category) => {
          if (category.id) {
            return axios
              .get(`http://localhost:8080/api/products/category/${category.id}`)
              .then((productsResponse) => ({
                ...category,
                products: productsResponse.data,
              }));
          }
          return Promise.resolve({ ...category, products: [] });
        });

        Promise.all(fetchProductsPromises)
          .then((categoriesWithProducts) => {
            console.log("Categories with Products:", categoriesWithProducts);
            this.setState({ categories: categoriesWithProducts });
          })
          .catch((error) => {
            console.error("Error fetching products for categories:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  fetchProducts() {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        const products = response.data;
        const fetchSkusPromises = products.map((product) =>
          axios
            .get(`http://localhost:8080/api/skus/product/${product.id}`)
            .then((skusResponse) => {
              const skus = skusResponse.data;
              return {
                ...product,
                skus,
                selectedSkuId: skus[0]?.id || null,
                selectedSkuPrice: skus[0]?.price || 0,
              };
            })
        );

        Promise.all(fetchSkusPromises)
          .then((productsWithSkus) => {
            this.setState({
              products: productsWithSkus,
              filteredProducts: productsWithSkus,
            });
          })
          .catch((error) => {
            console.error("Error fetching SKUs:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    this.setState({ searchQuery: query });

    if (query) {
      const filteredProducts = this.state.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      this.setState({ filteredProducts, currentPage: 1 }, this.sortProducts);
    } else {
      this.setState(
        { filteredProducts: this.state.products, currentPage: 1 },
        this.sortProducts
      );
    }
  };

  handleToggle = (id) => {
    this.setState((prevState) => ({
      openItem: prevState.openItem === id ? null : id,
    }));
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  handleSortChange = (event) => {
    this.setState({ sortOption: event.target.value }, this.sortProducts);
  };

  handleSkuChange = (productId, skuId, price) => {
    this.setState((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === productId
          ? { ...product, selectedSkuId: skuId, selectedSkuPrice: price }
          : product
      ),
      filteredProducts: prevState.filteredProducts.map((product) =>
        product.id === productId
          ? { ...product, selectedSkuId: skuId, selectedSkuPrice: price }
          : product
      ),
    }));
  };

  handleAddToCart = async (productId, skuId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    console.log("Sending request with:", {
      userId,
      productId,
      skuId,
      quantity: 1,
    });

    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders/cart/add/${userId}/${skuId}/${productId}/1`
      );

      if (response.status === 201) {
        console.log("API Response Data:", response.data);
        this.setState({
          successMessage: "Product added to cart successfully!",
        });
        setTimeout(() => {
          this.setState({ successMessage: "Thêm giỏ hàng thành công" });
        }, 3000);
      } else {
        console.error("Failed to add product to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  sortProducts = () => {
    const { filteredProducts, sortOption } = this.state;
    let sortedProducts = [...filteredProducts];

    sortedProducts.sort((a, b) => {
      const priceA = a.selectedSkuPrice || 0;
      const priceB = b.selectedSkuPrice || 0;

      switch (sortOption) {
        case "Nổi bật":
          return 0;

        case "Giảm giá":
          const discountA = a.skus[0]?.discount || 0;
          const discountB = b.skus[0]?.discount || 0;
          return discountB - discountA;

        case "Thấp đến cao":
          return priceA - priceB;

        case "Cao đến thấp":
          return priceB - priceA;

        default:
          return 0;
      }
    });

    this.setState({ filteredProducts: sortedProducts });
  };

  startVoiceSearch() {
    // Kiểm tra xem SpeechRecognition có được hỗ trợ không
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API không được hỗ trợ trên trình duyệt của bạn.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      this.setState({ recognizing: true });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.setState({ searchQuery: transcript }, () => {
        this.handleSearch({ target: { value: transcript } });
      });
    };

    recognition.onerror = (event) => {
      console.error("Lỗi nhận diện giọng nói:", event.error);
      this.stopVoiceSearch();
    };

    recognition.onend = () => {
      this.setState({ recognizing: false });
    };

    recognition.start();
  }

  stopVoiceSearch() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.stop();
    }
  }

  render() {
    const {
      categories,
      filteredProducts,
      searchQuery,
      openItem,
      currentPage,
      productsPerPage,
      sortOption,
      recognizing,
    } = this.state;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <h1 className="h2 pb-4">Categories</h1>
            <ul className="list-unstyled templatemo-accordion">
              {categories.map((category) => (
                <li className="pb-3" key={category.id}>
                  <a
                    className={`d-flex justify-content-between h3 text-decoration-none ${
                      openItem === category.id ? "" : "collapsed"
                    }`}
                    onClick={() => this.handleToggle(category.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {category.categoryName}
                    <i
                      className={`fa fa-fw ${
                        openItem === category.id
                          ? "fa-chevron-circle-up"
                          : "fa-chevron-circle-down"
                      } mt-1`}
                    ></i>
                  </a>
                  <ul
                    className={`collapse ${
                      openItem === category.id ? "show" : ""
                    } list-unstyled pl-3`}
                  >
                    {category.products &&
                      category.products.map((product) => (
                        <li key={product.id}>
                          <Link
                            className="text-decoration-none"
                            to={`/product/${product.id}`}
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-9">
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm sản phẩm..."
                    value={searchQuery}
                    onChange={this.handleSearch}
                  />
                  <IconButton
                    color="primary"
                    onClick={this.startVoiceSearch}
                    disabled={recognizing}
                    style={{ marginLeft: "10px" }}
                  >
                    <MicIcon />
                  </IconButton>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex">
                  <select
                    className="form-control"
                    value={sortOption}
                    onChange={this.handleSortChange}
                  >
                    <option value="Nổi bật">Nổi bật</option>
                    <option value="Giảm giá">Giảm giá</option>
                    <option value="Thấp đến cao">Thấp đến cao</option>
                    <option value="Cao đến thấp">Cao đến thấp</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              {currentProducts.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="card mb-4 product-wap rounded-0">
                    <div className="card rounded-0">
                      <img
                        className="card-img rounded-0 img-fluid"
                        src={`/assets/img/${product.imgUrl}`}
                        alt={product.name}
                      />
                      <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <ul className="list-unstyled">
                          <li>
                            <Link
                              className="btn btn-success text-white mt-2"
                              to={`/chitiet/${product.id}`}
                            >
                              <i className="far fa-eye" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="card-body">
                      <Link
                        to={`/chitiet/${product.id}`}
                        className="h3 text-decoration-none"
                      >
                        {product.name}
                      </Link>
                      <ul className="list-unstyled d-flex justify-content-center mb-1">
                        <li>
                          <i className="text-warning fa fa-star" />
                          <i className="text-warning fa fa-star" />
                          <i className="text-warning fa fa-star" />
                          <i className="text-muted fa fa-star" />
                          <i className="text-muted fa fa-star" />
                        </li>
                      </ul>
                      <div className="sku-options">
                        {product.skus &&
                          product.skus.map((sku) => {
                            const sortedAttributes = sku.attributesSkus
                              .filter(
                                (attr) =>
                                  attr.attributeOption.attributes.name ===
                                    "Ram" ||
                                  attr.attributeOption.attributes.name ===
                                    "Dung lượng"
                              )
                              .sort((a, b) => {
                                if (a.attributeOption.attributes.name === "Ram")
                                  return -1;
                                if (
                                  b.attributeOption.attributes.name ===
                                  "Dung lượng"
                                )
                                  return 1;
                                return 0;
                              });

                            return (
                              <div
                                key={sku.id}
                                className={`sku-option ${
                                  product.selectedSkuId === sku.id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  this.handleSkuChange(
                                    product.id,
                                    sku.id,
                                    sku.price
                                  )
                                }
                              >
                                {sortedAttributes.map((attr, index) => (
                                  <span key={attr.id} className="attribute">
                                    {attr.attributeOption.value}
                                    {index < sortedAttributes.length - 1 &&
                                      "  "}
                                  </span>
                                ))}
                              </div>
                            );
                          })}
                      </div>

                      <p className="text-center mt-3 mb-0">
                        Giá: {product.selectedSkuPrice.toLocaleString()} VNĐ
                      </p>

                      <button
                        className="btn btn-success text-white mt-2"
                        onClick={() =>
                          this.handleAddToCart(
                            product.id,
                            product.selectedSkuId
                          )
                        }
                      >
                        <i className="fas fa-cart-plus" />
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => this.handlePageChange(currentPage - 1)}
                  >
                    Trước
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((page) => (
                  <li
                    key={page + 1}
                    className={`page-item ${
                      currentPage === page + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => this.handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => this.handlePageChange(currentPage + 1)}
                  >
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
=======
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
export default class LoaiSP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openItem: null // Mặc định không có mục nào mở
        };
    }

    handleToggle = (id) => {
        this.setState({ openItem: this.state.openItem === id ? null : id });
    };
    render() {
        const { openItem } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="h2 pb-4">Categories</h1>
                        <ul className="list-unstyled templatemo-accordion">
                            <li className="pb-3">
                                <a
                                    className={`d-flex justify-content-between h3 text-decoration-none ${openItem === 'collapseGender' ? '' : 'collapsed'}`}
                                    onClick={() => this.handleToggle('collapseGender')}
                                >
                                    Laptop
                                    <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                                </a>
                                <ul
                                    id="collapseGender"
                                    className={`collapse ${openItem === 'collapseGender' ? 'show' : ''} list-unstyled pl-3`}
                                >
                                    <li><a className="text-decoration-none" href="#">Macbook</a></li>
                                    <li><a className="text-decoration-none" href="#">Asus</a></li>
                                    <li><a className="text-decoration-none" href="#">Acer</a></li>
                                </ul>
                            </li>
                            <li className="pb-3">
                                <a
                                    className={`d-flex justify-content-between h3 text-decoration-none ${openItem === 'collapseSale' ? '' : 'collapsed'}`}
                                    onClick={() => this.handleToggle('collapseSale')}
                                >
                                    Điện Thoại
                                    <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                                </a>
                                <ul
                                    id="collapseSale"
                                    className={`collapse ${openItem === 'collapseSale' ? 'show' : ''} list-unstyled pl-3`}
                                >
                                    <li><a className="text-decoration-none" href="#">Iphone</a></li>
                                    <li><a className="text-decoration-none" href="#">Samsung</a></li>
                                    <li><a className="text-decoration-none" href="#">Oppo</a></li>
                                </ul>
                            </li>
                            <li className="pb-3">
                                <a
                                    className={`d-flex justify-content-between h3 text-decoration-none ${openItem === 'collapseProduct' ? '' : 'collapsed'}`}
                                    onClick={() => this.handleToggle('collapseProduct')}
                                >
                                    Đồng hồ
                                    <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                                </a>
                                <ul
                                    id="collapseProduct"
                                    className={`collapse ${openItem === 'collapseProduct' ? 'show' : ''} list-unstyled pl-3`}
                                >
                                    <li><a className="text-decoration-none" href="#">Apple Watch</a></li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="row mb-4">
                            <div className="col-md-6">
                                {/* <div className="d-flex">
                                    <select className="form-control">
                                        <option>Nổi bật</option>
                                        <option>Giảm giá</option>
                                        <option>Thấp đến cao</option>
                                        <option>Cao đến thấp</option>
                                       
                                    </select>
                                </div> */}
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex">
                                    <select className="form-control">
                                        <option>Nổi bật</option>
                                        <option>Giảm giá</option>
                                        <option>Thấp đến cao</option>
                                        <option>Cao đến thấp</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-4 product-wap rounded-0">
                                    <div className="card rounded-0">
                                        <img className="card-img rounded-0 img-fluid" src={require('../../assets/img/shop_01.jpg')} />
                                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul className="list-unstyled">

                                                <li><Link className="btn btn-success text-white mt-2" to='/chitiet'><i className="far fa-eye" /></Link></li>
                                                <li><Link className="btn btn-success text-white mt-2" to='/giohang'><i className="fas fa-cart-plus" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Link to="/chitiet" className="h3 text-decoration-none">Oupidatat non</Link>
                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                            <li>M/L/X/XL</li>
                                            <li className="pt-2">
                                                <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                            <li>
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                            </li>
                                        </ul>
                                        <p className="text-center mb-0">$250.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 product-wap rounded-0">
                                    <div className="card rounded-0">
                                        <img className="card-img rounded-0 img-fluid" src={require('../../assets/img/shop_01.jpg')} />
                                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul className="list-unstyled">

                                                <li><Link className="btn btn-success text-white mt-2" to='/chitiet'><i className="far fa-eye" /></Link></li>
                                                <li><Link className="btn btn-success text-white mt-2" to='/giohang'><i className="fas fa-cart-plus" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Link to="/chitiet" className="h3 text-decoration-none">Oupidatat non</Link>
                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                            <li>M/L/X/XL</li>
                                            <li className="pt-2">
                                                <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                            <li>
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                            </li>
                                        </ul>
                                        <p className="text-center mb-0">$250.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 product-wap rounded-0">
                                    <div className="card rounded-0">
                                        <img className="card-img rounded-0 img-fluid" src={require('../../assets/img/shop_01.jpg')} />
                                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul className="list-unstyled">

                                                <li><Link className="btn btn-success text-white mt-2" to='/chitiet'><i className="far fa-eye" /></Link></li>
                                                <li><Link className="btn btn-success text-white mt-2" to='/giohang'><i className="fas fa-cart-plus" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Link to="/chitiet" className="h3 text-decoration-none">Oupidatat non</Link>
                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                            <li>M/L/X/XL</li>
                                            <li className="pt-2">
                                                <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                            <li>
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                            </li>
                                        </ul>
                                        <p className="text-center mb-0">$250.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 product-wap rounded-0">
                                    <div className="card rounded-0">
                                        <img className="card-img rounded-0 img-fluid" src={require('../../assets/img/shop_01.jpg')} />
                                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul className="list-unstyled">

                                                <li><Link className="btn btn-success text-white mt-2" to='/chitiet'><i className="far fa-eye" /></Link></li>
                                                <li><Link className="btn btn-success text-white mt-2" to='/giohang'><i className="fas fa-cart-plus" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Link to="/chitiet" className="h3 text-decoration-none">Oupidatat non</Link>
                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                            <li>M/L/X/XL</li>
                                            <li className="pt-2">
                                                <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                            <li>
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                            </li>
                                        </ul>
                                        <p className="text-center mb-0">$250.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 product-wap rounded-0">
                                    <div className="card rounded-0">
                                        <img className="card-img rounded-0 img-fluid" src={require('../../assets/img/shop_01.jpg')} />
                                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul className="list-unstyled">

                                                <li><Link className="btn btn-success text-white mt-2" to='/chitiet'><i className="far fa-eye" /></Link></li>
                                                <li><Link className="btn btn-success text-white mt-2" to='/giohang'><i className="fas fa-cart-plus" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Link to="/chitiet" className="h3 text-decoration-none">Oupidatat non</Link>
                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                            <li>M/L/X/XL</li>
                                            <li className="pt-2">
                                                <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                                                <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                            <li>
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-warning fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                                <i className="text-muted fa fa-star" />
                                            </li>
                                        </ul>
                                        <p className="text-center mb-0">$250.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
