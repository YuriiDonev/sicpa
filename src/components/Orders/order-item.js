
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// import { RingLoader } from 'react-spinners';

const OrderItem = (props) => {
  return (
    <div className='order-list-table-row'>
      <div className='created'>{props.createdDate}</div>
      <div className='confirmed'>{props.deliveryConfirmed || 'not confirmed'}</div>
      <div className='order'>{props.id}</div>
      <div className='carrier'>{props.carrier}</div>
      <div className='status'>{props.status}</div>
      <div
        className={`action ${props.deliveryConfirmed ? 'confirmed' : ''}`}
        onClick={() => props.redirectToOrderInfo(props.id)}
      >
        {props.deliveryConfirmed ? 'Sign' : 'Edit'}
      </div>
    </div>
  );
};

export default OrderItem;

// class OrderItem extends Component {
//
//   render() {
//     console.log('OrderItem ', this.props);
//
//     return (
//       <div className='order-list-table-row'>
//         <div className='created'>{this.props.createdDate}</div>
//         <div className='confirmed'>{this.props.deliveryConfirmed || 'not confirmed'}</div>
//         <div className='order'>{this.props.id}</div>
//         <div className='carrier'>{this.props.carrier}</div>
//         <div className='status'>{this.props.status}</div>
//         <div
//           className={`action ${this.props.deliveryConfirmed ? 'confirmed' : ''}`}
//           onClick={() => this.props.redirectToOrderInfo(this.props.id)}
//         >
//           {this.props.deliveryConfirmed ? 'Sign' : 'Edit'}
//         </div>
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = ({ orders  }) => ({
//   // orders,
// });
//
// const actions = {
//   // _getOrders,
// };
//
// export default connect(mapStateToProps, actions)(OrderItem);
