
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { RingLoader } from 'react-spinners';

import {
  getOrders as _getOrders,
} from '../../actions/orders-actions.js';

import OrderItem from './order-item.js';

class OrdersList extends Component {

  componentDidMount() {
    this.props._getOrders();
  }

  redirectToOrderInfo = (orderId) => {
    this.props.history.push(`/orders/${orderId}`);
  }

  render() {
    console.log('this.props ', this.props);

    return (
      <div className="main-content">
        <div>
          <button>{'Create New Order'}</button>
        </div>
        <div className='order-list-table'>
          <div className='order-list-table-row header'>
            <div className='created header'>{'Created'}</div>
            <div className='confirmed header'>{'Confirmed Delivery'}</div>
            <div className='order header'>{'Order'}</div>
            <div className='carrier header'>{'Carrier'}</div>
            <div className='status header'>{'Status'}</div>
            <div className='action header'>{'Action'}</div>
          </div>
          {
            this.props.orders.map(order =>
              <OrderItem
                key={order.id}
                redirectToOrderInfo={this.redirectToOrderInfo}
              {...order} />)
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ orders  }) => ({
  orders,
});

const actions = {
  _getOrders,
};

export default connect(mapStateToProps, actions)(OrdersList);
