<<<<<<< HEAD
<<<<<<< HEAD
import React, { Component } from "react";
import "../../assets/css/fontawesome.css";
import "../../assets/css/fontawesome.min.css";
import "../../assets/css/slick-theme.css";
import "../../assets/css/slick-theme.min.css";
import "../../assets/css/slick.min.css";
import "../../assets/css/templatemo.css";
import "../../assets/css/templatemo.min.css";
import LoaiSP from "../../component/user/LoaiSP";

export default class Shop extends Component {
  render() {
    return (
      <div>
        {/* Modal */}
        <div
          className="modal fade bg-white"
          id="templatemo_search"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="w-100 pt-1 mb-5 text-right">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form
              action="true"
              method="get"
              className="modal-content modal-body border-0 p-0"
            >
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="inputModalSearch"
                  name="q"
                  placeholder="Search ..."
                />
                <button
                  type="submit"
                  className="input-group-text bg-success text-light"
                >
                  <i className="fa fa-fw fa-search text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Start Content */}
        <div className="container py-5">
          <LoaiSP />
        </div>
        {/* End Content */}
      </div>
    );
  }
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
import Loai from '../../component/user/Loai';
import LoaiSP from '../../component/user/LoaiSP';


export default class Shop extends Component {
    
    render() {
        return (
            <div>
                
                {/* Modal */}
                <div className="modal fade bg-white" id="templatemo_search" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="w-100 pt-1 mb-5 text-right">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form action method="get" className="modal-content modal-body border-0 p-0">
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..." />
                                <button type="submit" className="input-group-text bg-success text-light">
                                    <i className="fa fa-fw fa-search text-white" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Start Content */}
                <div className="container py-5">
                    <LoaiSP/>
                </div>
                {/* End Content */}
                {/* Start Brands */}
               
                {/*End Brands*/}

              
                
            </div>
        )
    }
<<<<<<< HEAD
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
}
