import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

import { logoutFromApp as _logoutFromApp } from '../../actions/login-actions.js';


// we import here the routes for dashboard pages (links that appear in sidebar) to set navbar's name

import dashRoutes from '../../routes/dash.js';

class Header extends Component{
    constructor(props){
        super(props);
        this.handleMinimizeSidebar = this.handleMinimizeSidebar.bind(this);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    }

    // state = {
    //   project_name: 'SOME NAME',
    // }

    // componentWillReceiveProps(nextProps) {
    //   if (!_.isEqual(this.props.currentProject, nextProps.currentProject)) {
    //     this.setState({ project_name: nextProps.currentProject.name });
    //   }
    //   if (!_.isEqual(this.props.projectInfo, nextProps.projectInfo)) {
    //     this.setState({ project_name: nextProps.projectInfo.name });
    //   }
    // }

    makeBrand(){

        var name;
        dashRoutes.map((prop,key) => {
            if(prop.collapse){
                 prop.views.map((prop,key) => {
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    } else if (this.props.location.pathname.includes(prop.id)) {
                      name = prop.name;
                    }
                    return null;
                })
            } else {
                if(prop.redirect){
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                      } else if (this.props.location.pathname.includes(prop.id)) {
                        name = prop.name;
                      }
                }else{
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                      } else if (this.props.location.pathname.includes(prop.id)) {
                        name = prop.name;
                      }
                }
            }
            return null;
        })
        return name;
    }

    // function that makes the sidebar from normal to mini and vice-versa
    handleMinimizeSidebar(){
      // off-canvas-sidebar
        document.body.classList.toggle('sidebar-mini');
    }
    // function for responsive that hides/shows the sidebar
    mobileSidebarToggle(e){
        document.documentElement.classList.toggle('nav-open');
    }

    logOut = () => {
      // removeToken();
      this.props.history.push('/login');
      // this.props._loginToApp(false);
      this.props._logoutFromApp();
    }

    render(){

        return (
            <Navbar fluid style={{backgroundColor: '#F9F9F9'}}>

                <div className="navbar-minimize">
                    <button id="minimizeSidebar" className="btn btn-default btn-fill btn-round btn-icon" onClick={this.handleMinimizeSidebar}>
                        <i className="fa fa-ellipsis-v visible-on-sidebar-regular"></i>
                        <i className="fa fa-navicon visible-on-sidebar-mini"></i>
                    </button>
                </div>
                <Navbar.Header>
                    <Navbar.Brand>
                        {/* Here we create navbar brand, based on route name */}
                        <div>{this.makeBrand()}</div>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>
            </Navbar>
        );
    }
}

const mapStateToProps = ({ }) => ({
	// projects,
  // currentProject,
  // user,
  // projectInfo,
});

const actions = {
  // _loginToApp,
  // _logoutFromApp,
};

export default connect(mapStateToProps, actions)(Header);


// makeBrand(){
//
//     var name;
//     dashRoutes.map((prop,key) => {
//         if(prop.collapse){
//              prop.views.map((prop,key) => {
//                 if(prop.path === this.props.location.pathname){
//                     name = prop.name;
//                 } else if (_.includes(this.props.location.pathname, prop.id)) {
//                   name = prop.name;
//                 }
//                 return null;
//             })
//         } else {
//             if(prop.redirect){
//                 if(prop.path === this.props.location.pathname){
//                     name = prop.name;
//                   } else if (_.includes(this.props.location.pathname, prop.id)) {
//                     name = prop.name;
//                   }
//             }else{
//                 if(prop.path === this.props.location.pathname){
//                     name = prop.name;
//                   } else if (_.includes(this.props.location.pathname, prop.id)) {
//                     name = prop.name;
//                   }
//             }
//         }
//         return null;
//     })
//     return name;
// }
