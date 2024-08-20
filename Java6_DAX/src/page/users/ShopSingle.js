import React, { Component } from 'react';
import '../../assets/css/fontawesome.css';
import '../../assets/css/fontawesome.min.css';
import '../../assets/css/slick-theme.css';
import '../../assets/css/slick-theme.min.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/templatemo.min.css';
import ChiTietSP from '../../component/user/ChiTietSP';


export default class ShopSingle extends Component {

  render() {
    return (
      <div>
        {/* Modal */}
        <div className="modal fade bg-white" id="templatemo_search" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="w-100 pt-1 mb-5 text-right">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
            <form method="get" className="modal-content modal-body border-0 p-0">
=======
            <form action method="get" className="modal-content modal-body border-0 p-0">
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
=======
            <form action method="get" className="modal-content modal-body border-0 p-0">
>>>>>>> 83f94400db85848a231e5a651685c099a8b0e6d6
              <div className="input-group mb-2">
                <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..." />
                <button type="submit" className="input-group-text bg-success text-light">
                  <i className="fa fa-fw fa-search text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Open Content */}
        {/* <section className="bg-light">
         
        </section> */}
        {/* Close Content */}

        {/* Start Article */}
        <section class="py-5">
          <div class="container">
            {/* <div class="row text-left p-2 pb-3">
              <h4>Related Products</h4>
            </div> */}
            {/*Start Carousel Wrapper*/}
            <ChiTietSP/>
          </div>
        </section>
        {/* Start Article */}

        {/* End Article */}



      </div>

    )
  }
}
