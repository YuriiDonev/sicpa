
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SelectComponent from '../Select';

import { RingLoader } from 'react-spinners';

import {
  getSingleOrder as _getSingleOrder,
} from '../../actions/orders-actions.js';

class OrderInfo extends Component {

  state = {
    vehicles: ['bmw', 'honda', 'toyota', 'subaru'],
    drivers: ['Super Mario', 'John Travolta', 'Samuel L. Jackson'],
    selectedVehicle: '',
    selectedDriver1: '',
    selectedDriver2: '',
  }

  componentDidMount() {
    this.props._getSingleOrder(this.props.match.params.orderId)
  }

  setSelectedItem = (selectId, item) => {
    if (selectId === 'vehicle') {
      this.setState({selectedVehicle: {value: item.value, label: item.label}});
    } else if (selectId === 'driver1') {
      this.setState({selectedDriver1: {value: item.value, label: item.label}});
    } else if (selectId === 'driver2') {
      this.setState({selectedDriver2: {value: item.value, label: item.label}});
    }
  }

  render() {
    console.log('OrderInfo ', this.props);

    const options = this.state.vehicles.map(vehicle => ({
      value: vehicle,
      label: vehicle,
    }));

    return (
      <div className="main-content">
        {
          _.isEmpty(this.props.singleOrder) ? '...Loading' :
          <div className='order-info'>
            <div className='order-info-header'>
              <div className='order-info-header-title'>
                {`Update Order ${this.props.singleOrder.orderNumber}`}
              </div>
              <div>
                {` Order ${_.capitalize(this.props.singleOrder.status)}`}
              </div>
            </div>

            <div className='order-info-body'>
              <div className='carrier-block'>

                <div className='carrier-block-header'>
                  <div className='block-title'>{'Carrier'}</div>
                </div>

                <div className='carrier-block-item'>
                  <div className='carrier-block-item-title'>{'Created date:'}</div>
                  <div className='carrier-block-item-value'>{this.props.singleOrder.createdDate}</div>
                </div>

                <div className='block-title'>{'Carrier Resources'}</div>

                <div className='select-block'>
                  <SelectComponent
                    id={'vehicle'}
                    options={this.state.vehicles}
                    value={this.state.selectedVehicle}
                    placeholder={'Select vehicle'}
                    setSelectedItem={this.setSelectedItem}
                  />
                </div>
                <div className='select-block'>
                  <SelectComponent
                    id={'driver1'}
                    options={this.state.drivers}
                    value={this.state.selectedDriver1}
                    placeholder={'Select driver 1'}
                    setSelectedItem={this.setSelectedItem}
                  />
                </div>
                <div className='select-block'>
                  <SelectComponent
                    id={'driver2'}
                    options={this.state.drivers}
                    value={this.state.selectedDriver2}
                    placeholder={'Select driver 2'}
                    setSelectedItem={this.setSelectedItem}
                  />
                </div>

              </div>

              <div className='order-info-block'>
                <div className='order-info-block-header'>
                  <div className='block-title'>{'Order Information'}</div>
                  <div><button>{'Cancel order'}</button></div>
                </div>


                <div className='order-info-block-item'>
                  <div className='order-info-block-item-title'>{'Created date:'}</div>
                  <div className='order-info-block-item-value'>{this.props.singleOrder.createdDate}</div>
                </div>
                <div className='order-info-block-item'>
                  <div className='order-info-block-item-title'>{'Order number:'}</div>
                  <div className='order-info-block-item-value'>{`abc ${this.props.singleOrder.orderNumber}`}</div>
                </div>
                <div className='order-info-block-item'>
                  <div className='order-info-block-item-title'>{'Operator:'}</div>
                  <div className='order-info-block-item-value'>{this.props.singleOrder.operator}</div>
                </div>
                <div className='order-info-block-item'>
                  <div className='order-info-block-item-title'>{'Desired pick up date:'}</div>
                  <div className='order-info-block-item-value'>{this.props.singleOrder.desiredPickupDate}</div>
                </div>
                <div className='order-info-block-item'>
                  <div className='order-info-block-item-title'>{'Pick up site:'}</div>
                  <div className='order-info-block-item-value'>{this.props.singleOrder.pickupSite}</div>
                </div>
                <div className='order-info-block-item'>
                  <div className='order-info-block-item-title'>{'Parcel weight:'}</div>
                  <div className='order-info-block-item-value'>{this.props.singleOrder.parcelWeight}</div>
                </div>
                <div className='order-info-block-item'>
                  <div className='order-info-block-item-title'>{'Comment:'}</div>
                  <div className='order-info-block-item-value'>{this.props.singleOrder.comment}</div>
                </div>

              </div>

            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ singleOrder }) => ({
  singleOrder,
});

const actions = {
  _getSingleOrder,
};

export default connect(mapStateToProps, actions)(OrderInfo);
