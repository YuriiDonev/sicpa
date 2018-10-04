import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
// this is used to create scrollbars on windows devices like the ones from apple devices
import * as Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';

import HeaderLinks from '../../components/Header/HeaderLinks.jsx';

// backgroundImage for Sidebar
import image from '../../assets/img/full-screen-image-3.jpg';
// image for avatar in Sidebar
// import avatar from 'assets/img/default-avatar.png';
// logo for sidebar
import Dockmaster_Logo from "../../assets/img/Dockmaster_Logo.png";

import { setProject as _setProject } from '../../actions/projects-actions.js';
import { loginToApp as _loginToApp, logoutFromApp as _logoutFromApp } from '../../actions/login-actions.js';

import { HOST_NAME } from '../../mock-data/host-name.js';
import { getTokenForImages } from '../../service/token.js';

import ChooseProjectMenu from './choose-project.js';

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            openAvatar: false,
            openComponents: (this.activeRoute("/components") !== '' ? true:false),
            openForms: (this.activeRoute("/forms") !== '' ? true:false),
            openProjects: (this.activeRoute("/project") !== '' ? true:false),
            openTables: (this.activeRoute("/tables") !== '' ? true:false),
            openMaps: (this.activeRoute("/maps") !== '' ? true:false),
            openPages: (this.activeRoute("/pages") !== '' ? true:false),
            isWindows: (navigator.platform.indexOf('Win') > -1 ? true : false),
            width: window.innerWidth,

        }
    }

    componentWillReceiveProps(nextProps) {
      if (!_.isEqual(this.props.userInfo, nextProps.userInfo)) {
        this.setState({
          first_name: nextProps.userInfo.first_name || '',
          last_name: nextProps.userInfo.last_name || '',
          img_url: nextProps.userInfo.img_url || '',
          is_admin: nextProps.userInfo.is_admin || '',
        });
      }
      if (!_.isEqual(this.props.currentProject, nextProps.currentProject)) {
        this.setState({ project_name: nextProps.currentProject.name, project_color: nextProps.currentProject.color });
      }
      if (!_.isEqual(this.props.projectInfo, nextProps.projectInfo)) {
        this.setState({ project_name: nextProps.projectInfo.name, project_color: nextProps.projectInfo.color });
      }
      if (!_.isEqual(this.props.projects, nextProps.projects)) {
        this.setState({ projectsList: _.cloneDeep(nextProps.projects) });
      }
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    // if the windows width changes CSS has to make some changes
    // this functions tell react what width is the window
    updateDimensions(){
      this.setState({width:window.innerWidth});
    }

    componentDidMount() {
        this.updateDimensions();
        // add event listener for windows resize
        window.addEventListener("resize", this.updateDimensions.bind(this));
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            Ps.initialize(this.refs.sidebarWrapper, { wheelSpeed: 2, suppressScrollX: true });
        }
    }

    componentDidUpdate(){
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          // setTimeout(() => { Ps.update(this.refs.sidebarWrapper) }, 350);
      }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    // function that creates perfect scroll bar for windows users (it creates a scrollbar that looks like the one from apple devices)
    isMac(){
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    toggleOpenProjects = () => {
      if (this.state.openProjects) {
        this.setState({ openProjects: false });
      } else {
        this.setState({ openProjects: true });
      }
    }

    setCurrentProject = (project) => {
      this.props._setProject(project);
      localStorage.setItem('current-project', project.id);
    }

		addNewProject = () => {
			this.props.history.push('/project/add');
		}

    logOutMobile = () => {
      this.props.history.push('/');
      this.props._logoutFromApp();
    }

    render() {
      document.title = `Dockmasters-${this.state.project_name}`;

      // const token = getTokenForImages();

        return (
            <div className="sidebar" data-color="black" data-image={image}>
                <div className="logo">
                	<a className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={Dockmaster_Logo} alt="react-logo" />
                        </div>
                	</a>
                	<div className="simple-text logo-normal">
                		{'DOCKMASTERS'}
                	</div>
                </div>
                <div className="sidebar-wrapper" ref="sidebarWrapper">
                    <div className="user">
                        <div className="photo">
                          <img src={'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100'} alt="Avatar"/>
                        </div>
                        <div className="info">
                            <a onClick={()=> this.setState({ openAvatar: !this.state.openAvatar })}>
                                <span>
                                  {
                                    (_.isEmpty(this.props.userInfo)) ? null :
                                    <div>
                                      {`${this.state.first_name} ${this.state.last_name}`}
                                    </div>
                                  }
                                  <b className={this.state.openAvatar ? "caret rotate-180":"caret"}></b>
                                </span>
                            </a>
                            <Collapse in={this.state.openAvatar}>
                                <ul className="nav">
                        					<li>
                                      <Link to='/profile'>
                        							   <span className="sidebar-normal">Edit Profile</span>
                                      </Link>
                        					</li>
                                </ul>
                            </Collapse>
                        </div>
                    </div>

                      <ul className="nav">
                          <li className={this.activeRoute('/my-schedule')} onClick={ ()=> this.setState({ openProjects: false }) }>
                              <NavLink to='/my-schedule' className="nav-link" activeClassName="active">
                                  <i className="pe-7s-clock"></i>
                                  <p>{'MY SCHEDULE'}</p>
                              </NavLink>
                          </li>
                          <li className={this.activeRoute('/booking')} onClick={ ()=> this.setState({ openProjects: false }) }>
                              <NavLink to='/booking' className="nav-link" activeClassName="active">
                                  <i className="pe-7s-comment"></i>
                                  <p>{'BOOKING REQUESTS'}</p>
                              </NavLink>
                          </li>
                          <li className={this.activeRoute('/project')}>
                              <a onClick={ this.toggleOpenProjects }>
                                <i className="pe-7s-home"></i>
                                <p>{'PROJECT'}
                                  <b className={this.state.openProjects ? "caret rotate-180":"caret"}></b>
                                </p>
                              </a>
                              <Collapse in={this.state.openProjects}>
                                <ul className="nav">
                                  <li className={this.activeRoute('/project/info')} >
                                    <NavLink to={'/project/info'} className="nav-link" activeClassName="active">
                                      <span className="sidebar-mini">{'PI'}</span>

                                      <span className="sidebar-normal">{'Project Info'}</span>
                                    </NavLink>
                                  </li>
                                  <li className={this.activeRoute('/project/contacts')}>
                                    <NavLink to={'/project/contacts'} className="nav-link" activeClassName="active">
                                      <span className="sidebar-mini">{'CO'}</span>

                                      <span className="sidebar-normal">{'Contacts'}</span>
                                    </NavLink>
                                  </li>
                                  <li className={this.activeRoute('/project/resources')}>
                                    <NavLink to={'/project/resources'} className="nav-link" activeClassName="active">
                                      <span className="sidebar-mini">{'RE'}</span>

                                      <span className="sidebar-normal">{'Resources'}</span>
                                    </NavLink>
                                  </li>
                                </ul>
                              </Collapse>
                          </li>
                          <li className={this.activeRoute('/users')} onClick={ ()=> this.setState({ openProjects: false }) }>
                              <NavLink to='/users' className="nav-link" activeClassName="active">
                                  <i className="pe-7s-users"></i>
                                  <p>{'USERS'}</p>
                              </NavLink>
                          </li>
                          <li className={this.activeRoute('/calendar')} onClick={ ()=> this.setState({ openProjects: false }) }>
                              <NavLink to='/calendar' className="nav-link" activeClassName="active">
                                  <i className="pe-7s-date"></i>
                                  <p>{'CALENDAR'}</p>
                              </NavLink>
                          </li>
                          <li className={this.activeRoute('/settings')} onClick={ ()=> this.setState({ openProjects: false }) }>
                              <NavLink to='/settings' className="nav-link" activeClassName="active">
                                  <i className="pe-7s-config"></i>
                                  <p>{'SETTINGS'}</p>
                              </NavLink>
                          </li>

                          {/* If we are on responsive, we want both links from navbar and sidebar
                              to appear in sidebar, so we render here HeaderLinks */}
                          { this.state.width <= 992 ? (<HeaderLinks logOut={this.logOutMobile} />):null }
                          {/*
                              here we render the links in the sidebar
                              if the link is simple, we make a simple link, if not,
                              we have to create a collapsible group,
                              with the speciffic parent button and with it's children which are the links
                          */}
                      </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ }) => ({
  // userInfo,
  // projects,
  // currentProject,
  // users,
  // projectInfo,
});

const actions = {
  // _setProject,
  // _loginToApp,
  // _logoutFromApp,
};

export default connect(mapStateToProps, actions)(Sidebar);

//
// render() {
//   document.title = `Dockmasters-${this.state.project_name}`;
//
//   const token = getTokenForImages();
//
//     return (
//         <div className="sidebar" data-color="black" data-image={image}>
//             <div className="logo">
//               <a className="simple-text logo-mini">
//                     <div className="logo-img">
//                         <img src={Dockmaster_Logo} alt="react-logo" />
//                     </div>
//               </a>
//               <div className="simple-text logo-normal">
//                 {'DOCKMASTERS'}
//               </div>
//             </div>
//             <div className="sidebar-wrapper" ref="sidebarWrapper">
//                 <div className="user">
//                     <div className="photo">
//                       {
//                         (this.state.img_url) ?
//                         <img src={`${HOST_NAME}${this.state.img_url}?access_token=${token}`} alt="Avatar"/> :
//                         <img src={'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100'} alt="Avatar"/>
//                       }
//                     </div>
//                     <div className="info">
//                         <a onClick={()=> this.setState({ openAvatar: !this.state.openAvatar })}>
//                             <span>
//                               {
//                                 (_.isEmpty(this.props.userInfo)) ? null :
//                                 <div>
//                                   {`${this.state.first_name} ${this.state.last_name}`}
//                                 </div>
//                               }
//                               <b className={this.state.openAvatar ? "caret rotate-180":"caret"}></b>
//                             </span>
//                         </a>
//                         <Collapse in={this.state.openAvatar}>
//                             <ul className="nav">
//                               <li>
//                                   <Link to='/profile'>
//                                      <span className="sidebar-normal">Edit Profile</span>
//                                   </Link>
//                               </li>
//                             </ul>
//                         </Collapse>
//                     </div>
//                 </div>
//                 {
//                   (this.props.currentProject.role === 'admin') ?
//                   <ul className="nav">
//                       <li className={this.activeRoute('/my-schedule')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to='/my-schedule' className="nav-link" activeClassName="active">
//                               <i className="pe-7s-clock"></i>
//                               <p>{'MY SCHEDULE'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/booking')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to='/booking' className="nav-link" activeClassName="active">
//                               <i className="pe-7s-comment"></i>
//                               <p>{'BOOKING REQUESTS'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/project')}>
//                           <a onClick={ this.toggleOpenProjects }>
//                             <i className="pe-7s-home"></i>
//                             <p>{'PROJECT'}
//                               <b className={this.state.openProjects ? "caret rotate-180":"caret"}></b>
//                             </p>
//                           </a>
//                           <Collapse in={this.state.openProjects}>
//                             <ul className="nav">
//                               <li className={this.activeRoute('/project/info')} >
//                                 <NavLink to={'/project/info'} className="nav-link" activeClassName="active">
//                                   <span className="sidebar-mini">{'PI'}</span>
//
//                                   <span className="sidebar-normal">{'Project Info'}</span>
//                                 </NavLink>
//                               </li>
//                               <li className={this.activeRoute('/project/contacts')}>
//                                 <NavLink to={'/project/contacts'} className="nav-link" activeClassName="active">
//                                   <span className="sidebar-mini">{'CO'}</span>
//
//                                   <span className="sidebar-normal">{'Contacts'}</span>
//                                 </NavLink>
//                               </li>
//                               <li className={this.activeRoute('/project/resources')}>
//                                 <NavLink to={'/project/resources'} className="nav-link" activeClassName="active">
//                                   <span className="sidebar-mini">{'RE'}</span>
//
//                                   <span className="sidebar-normal">{'Resources'}</span>
//                                 </NavLink>
//                               </li>
//                             </ul>
//                           </Collapse>
//                       </li>
//                       <li className={this.activeRoute('/users')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to='/users' className="nav-link" activeClassName="active">
//                               <i className="pe-7s-users"></i>
//                               <p>{'USERS'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/calendar')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to='/calendar' className="nav-link" activeClassName="active">
//                               <i className="pe-7s-date"></i>
//                               <p>{'CALENDAR'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/settings')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to='/settings' className="nav-link" activeClassName="active">
//                               <i className="pe-7s-config"></i>
//                               <p>{'SETTINGS'}</p>
//                           </NavLink>
//                       </li>
//
//                       {/* If we are on responsive, we want both links from navbar and sidebar
//                           to appear in sidebar, so we render here HeaderLinks */}
//                       { this.state.width <= 992 ? (<HeaderLinks logOut={this.logOutMobile} />):null }
//                       {/*
//                           here we render the links in the sidebar
//                           if the link is simple, we make a simple link, if not,
//                           we have to create a collapsible group,
//                           with the speciffic parent button and with it's children which are the links
//                       */}
//                   </ul> :
//
//                   <ul className="nav">
//                       <li className={this.activeRoute('/my-schedule')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to='/my-schedule' className="nav-link" activeClassName="active">
//                               <i className="pe-7s-clock"></i>
//                               <p>{'MY SCHEDULE'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/project/info')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to={'/project/info'} className="nav-link" activeClassName="active">
//                               <i className="pe-7s-home"></i>
//                               <p>{'PROJECT INFO'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/project/contacts')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to={'/project/contacts'} className="nav-link" activeClassName="active">
//                               <i className="pe-7s-users"></i>
//                               <p>{'CONTACTS'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/project/resources')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to={'/project/resources'} className="nav-link" activeClassName="active">
//                               <i className="pe-7s-box2"></i>
//                               <p>{'RESOURCES'}</p>
//                           </NavLink>
//                       </li>
//                       <li className={this.activeRoute('/calendar')} onClick={ ()=> this.setState({ openProjects: false }) }>
//                           <NavLink to='/calendar' className="nav-link" activeClassName="active">
//                               <i className="pe-7s-date"></i>
//                               <p>{'CALENDAR'}</p>
//                           </NavLink>
//                       </li>
//
//                       {/* If we are on responsive, we want both links from navbar and sidebar
//                           to appear in sidebar, so we render here HeaderLinks */}
//                       { this.state.width <= 992 ? (<HeaderLinks logOut={this.logOutMobile} />):null }
//                       {/*
//                           here we render the links in the sidebar
//                           if the link is simple, we make a simple link, if not,
//                           we have to create a collapsible group,
//                           with the speciffic parent button and with it's children which are the links
//                       */}
//                   </ul>
//                 }
//                 {
//                   (_.isEmpty(this.state.projectsList)) ?
//
//                   <div className='sidebar-choose-project-wrapper'>
//                     {
//                       (this.state.is_admin) ?
//                       <div className='sidebar-choose-project-container' onClick={ this.addNewProject }>
//                         <div className='add-project-button'>
//                           <div className='project-menu-sign plus' style={{ backgroundColor: 'gray' }}>{'+'}</div>
//                           <div className='project-menu-title'>{'ADD PROJECT'}</div>
//                         </div>
//                       </div> : null
//                     }
//                   </div> :
//
//                   <ChooseProjectMenu
//                     allProjects={this.state.projectsList}
//                     setProject={this.setCurrentProject}
//                     project_name={this.state.project_name}
//                     project_color={this.state.project_color}
//                     isAdmin={this.state.is_admin}
//                     _addNewProject={this.addNewProject}
//                   />
//                 }
//             </div>
//         </div>
//     );
// }
