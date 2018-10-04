import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { RingLoader } from 'react-spinners';

// this is used to create scrollbars on windows devices like the ones from apple devices
import * as Ps from 'perfect-scrollbar';

import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';
// react component that creates notifications (like some alerts with messages)
import NotificationSystem from 'react-notification-system';

import Sidebar from '../../components/Sidebar/Sidebar.js';
import Header from '../../components/Header/Header.js';
// import Footer from 'components/Footer/Footer.jsx';

// dinamically create dashboard routes
// import dashRoutes from 'routes/dash.js';

// style for notifications
import { style } from "../../variables/Variables.jsx";

import EditProfile from '../../components/User/edit-profile.js';
import MySchedule from '../../components/Schedule/my-schedule.js';

// import BookingRequests from '../../components/Booking/booking.js';
import BookingDetail from '../../components/Booking/booking-detail.js';
// import RequestBooking from '../../components/Booking/request-booking.js';

import ProjectInfo from '../../components/Project/project-info.js';
import ProjectContacts from '../../components/Project/project-contacts.js';
// import ProjectContactsAdd from '../../components/Project/project-contacts-add.js';
import ProjectResources from '../../components/Project/Resources/project-resources.js';
import ProjectResourcesAdd from '../../components/Project/Resources/project-resources-add.js';
import Users from '../../components/User/users.js';

import { scrollToTopRemove as _scrollToTopRemove } from '../../actions/scrollTop-actions.js';

import Calendar from '../../views/Calendar/Calendar.js';
// import GlobalCalendar from '../../views/Calendar/global-calendar.js';

import Settings from '../../components/Settings/Settings.js';

import OrdersList from '../../components/Orders/orders-list.js';
import OrderInfo from '../../components/Orders/order-info.js';

class Dash extends Component{
  constructor(props){
      super(props);
      this.handleNotificationClick = this.handleNotificationClick.bind(this);
      this.state = {
          _notificationSystem: null
      };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.scrollTop) {
  //     this.myEl.scrollIntoView();
  //     this.props._scrollToTopRemove();
  //   }
  // }

  componentDidMount(){
      this.setState({_notificationSystem: this.refs.notificationSystem});
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          Ps.initialize(this.refs.mainPanel, { wheelSpeed: 2, suppressScrollX: true });
      }
  }
  // function that shows/hides notifications - it was put here, because the wrapper div has to be outside the main-panel class div
  handleNotificationClick(position){
      var color = Math.floor((Math.random() * 4) + 1);
      var level;
      switch (color) {
          case 1:
              level = 'success';
              break;
          case 2:
              level = 'warning';
              break;
          case 3:
              level = 'error';
              break;
          case 4:
              level = 'info';
              break;
          default:
              break;
      }
      this.state._notificationSystem.addNotification({
          title: (<span data-notify="icon" className="pe-7s-gift"></span>),
          message: (
              <div>
                  Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
              </div>
          ),
          level: level,
          position: position,
          autoDismiss: 15,
      });
  }
  // function that creates perfect scroll bar for windows users (it creates a scrollbar that looks like the one from apple devices)
  isMac(){
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }
  componentDidUpdate(e){
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          // setTimeout(() => { Ps.update(this.refs.mainPanel) }, 350);
      }
      if(e.history.action === "PUSH"){
          this.refs.mainPanel.scrollTop = 0;
      }
  }
  componentWillMount(){
      if(document.documentElement.className.indexOf('nav-open') !== -1){
          document.documentElement.classList.toggle('nav-open');
      }
  }

  isIphone = () => {
    return !!navigator.userAgent.match(/iPhone/i);
  }

  // isAndroid = () => {
  //   return !!navigator.userAgent.match(/Android/i);
  // }
  isIpad = () => {
    return !!navigator.userAgent.match(/Ipad/i);
  }

  render() {
    // console.log('!!!! navigator.userAgent ', navigator.userAgent);

    // console.log('this.isIphone() ', this.isIphone());
    // console.log('this.isAndroid() ', this.isAndroid());
    // console.log('this.isIpad() ', this.isIpad());

    return (
      <div className='wrapper'>
        {
          (this.props._isLoading) ?
          <div className="loading-indicator-wrapper">
          <RingLoader
          color={'white'}
          size={80}
          />
          </div> : null
        }

        <NotificationSystem ref="notificationSystem" style={style}/>
        <Header {...this.props}/>
        <Sidebar {...this.props} />
        <div className="main-panel" ref="mainPanel">
          <Switch>
            <Route exact path='/orders' component={OrdersList} />
            <Route path='/orders/:orderId' component={OrderInfo} />
            <Redirect to='/orders'/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ }) => ({
  // _isLoading,
  // scrollTop,
});

const actions = {
  // _scrollToTopRemove,
};

export default connect(mapStateToProps, actions)(Dash);

{/* <div className={`wrapper${(this.isIphone() || this.isIpad()) ? ' IphoneOrIpad' : ''}`}> */}
{/* <div className={"main-panel"+(this.props.location.pathname === "/maps/full-screen-maps" ? " main-panel-maps":"")} ref="mainPanel"> */}


// <Switch>
//   <Route path='/profile' component={EditProfile} />
//   <Route path='/my-schedule' component={MySchedule} />
//
//   <Route path='/booking/detail/:booking_id' component={BookingDetail} />
//   <Route path='/booking/request' component={RequestBooking} />
//   <Route exact strict path='/booking' component={MySchedule} />
//
//   <Route exact strict path='/project/info' component={ProjectInfo} />
//   <Route exact strict path='/project/add' component={ProjectInfo} />
//   <Route exact strict path='/project/contacts/add' component={ProjectContactsAdd} />
//   <Route exact strict path='/project/contacts' component={ProjectContacts} />
//   <Route path='/project/contacts/add/:contact_id' component={ProjectContactsAdd} />
//   <Route exact strict path='/project/resources/add' component={ProjectResourcesAdd} />
//   <Route exact strict path='/project/resources' component={ProjectResources} />
//   <Route path='/project/resources/add/:resource_id' component={ProjectResourcesAdd} />
//   <Route path='/users' component={Users} />
//
//   <Route exact strict path='/calendar' component={Calendar} />
//   <Route path='/calendar/:resource_id' component={Calendar} />
//
//   <Redirect to='/my-schedule'/>
// </Switch>

// <Route exact path='/' component={() => <Redirect to='/my-schedule' />}/>
// <Route exact path='/' component={() => <Redirect to='/my-schedule' />}/>
// <Route exact path='/login' component={() => <Redirect to='/my-schedule' />}/>
// <Route exact path='/signup' component={() => <Redirect to='/my-schedule' />}/>
// <Route exact strict path='/' component={MySchedule} />

// <Route exact strict path='/booking' component={BookingRequests} />

// <div className="loading-indicator-wrapper">
//   <div className="loading-indicator">{'Loading...'}</div>
// </div>


// <Route path='/project/contacts/add' component={ProjectContactsAdd} />


// import React, {Component} from 'react';
// import {
//     Switch,
//     Route,
//     Redirect
// } from 'react-router-dom';
// // this is used to create scrollbars on windows devices like the ones from apple devices
// import * as Ps from 'perfect-scrollbar';
// import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';
// // react component that creates notifications (like some alerts with messages)
// import NotificationSystem from 'react-notification-system';
//
// import Sidebar from 'components/Sidebar/Sidebar.js';
// import Header from 'components/Header/Header.jsx';
// import Footer from 'components/Footer/Footer.jsx';
//
// // dinamically create dashboard routes
// import dashRoutes from 'routes/dash.js';
//
// // style for notifications
// import { style } from "variables/Variables.jsx";
//
// class Dash extends Component{
//     constructor(props){
//         super(props);
//         this.handleNotificationClick = this.handleNotificationClick.bind(this);
//         this.state = {
//             _notificationSystem: null
//         };
//     }
//     componentDidMount(){
//         this.setState({_notificationSystem: this.refs.notificationSystem});
//         if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
//             Ps.initialize(this.refs.mainPanel, { wheelSpeed: 2, suppressScrollX: true });
//         }
//     }
//     // function that shows/hides notifications - it was put here, because the wrapper div has to be outside the main-panel class div
//     handleNotificationClick(position){
//         var color = Math.floor((Math.random() * 4) + 1);
//         var level;
//         switch (color) {
//             case 1:
//                 level = 'success';
//                 break;
//             case 2:
//                 level = 'warning';
//                 break;
//             case 3:
//                 level = 'error';
//                 break;
//             case 4:
//                 level = 'info';
//                 break;
//             default:
//                 break;
//         }
//         this.state._notificationSystem.addNotification({
//             title: (<span data-notify="icon" className="pe-7s-gift"></span>),
//             message: (
//                 <div>
//                     Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
//                 </div>
//             ),
//             level: level,
//             position: position,
//             autoDismiss: 15,
//         });
//     }
//     // function that creates perfect scroll bar for windows users (it creates a scrollbar that looks like the one from apple devices)
//     isMac(){
//         let bool = false;
//         if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
//             bool = true;
//         }
//         return bool;
//     }
//     componentDidUpdate(e){
//         if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
//             setTimeout(() => { Ps.update(this.refs.mainPanel) }, 350);
//         }
//         if(e.history.action === "PUSH"){
//             this.refs.mainPanel.scrollTop = 0;
//         }
//     }
//     componentWillMount(){
//         if(document.documentElement.className.indexOf('nav-open') !== -1){
//             document.documentElement.classList.toggle('nav-open');
//         }
//     }
//     render(){
//
//     console.log('Dash!!!');
//
//         return (
//             <div className="wrapper">
//                 <NotificationSystem ref="notificationSystem" style={style}/>
//                 <Sidebar {...this.props} />
//                 <div className={"main-panel"+(this.props.location.pathname === "/maps/full-screen-maps" ? " main-panel-maps":"")} ref="mainPanel">
//                     <Header {...this.props}/>
//                         <Switch>
//                             {
//                                 dashRoutes.map((prop,key) => {
//                                     if(prop.collapse){
//                                         return prop.views.map((prop,key) => {
//                                             if(prop.name === "Notifications"){
//                                                 return (
//                                                     <Route
//                                                         path={prop.path}
//                                                         key={key}
//                                                         render={routeProps =>
//                                                            <prop.component
//                                                                {...routeProps}
//                                                                handleClick={this.handleNotificationClick}
//                                                            />}
//                                                     />
//                                                 );
//                                             } else {
//                                                 return (
//                                                     <Route path={prop.path} component={prop.component} key={key}/>
//                                                 );
//                                             }
//                                         })
//                                     } else {
//                                         if(prop.redirect)
//                                             return (
//                                                 <Redirect from={prop.path} to={prop.pathTo} key={key}/>
//                                             );
//                                         else
//                                             return (
//                                                 <Route path={prop.path} component={prop.component} key={key}/>
//                                             );
//                                     }
//                                 })
//                             }
//                         </Switch>
//                     <Footer fluid/>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default Dash;
