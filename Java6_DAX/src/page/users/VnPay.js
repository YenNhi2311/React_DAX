import React, { Component } from 'react';

export default class VnPay extends Component {
    componentDidMount() {
        // Redirect to the URL when the component mounts
        window.location.href = 'https://pay.vnpay.vn/';
    }

    render() {
        // Optionally, you can render some loading content here
        return (
           <div>
              Redirecting...
           </div>
        );
    }
}
