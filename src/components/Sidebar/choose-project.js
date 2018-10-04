import React, { Component } from 'react';
import _ from 'lodash';

class ChooseProjectMenu extends Component {

  state = {
    isMenuOpen: false,
  }

  dropupOpenElement = null;

  componentDidMount() {
    window.addEventListener('click', this.closeMenu);
    this.dropupOpenElement = document.getElementsByClassName('choose-project-menu-open');
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu);
  }

  componentDidUpdate() {
    if (this.dropupOpenElement) {
      setTimeout(() => {
        if (this.dropupOpenElement[0]) {
          if (this.dropupOpenElement[0].clientHeight > window.innerHeight) {
            this.dropupOpenElement[0].style.height = window.innerHeight - 144 + 'px';
            this.dropupOpenElement[0].style.overflow = 'auto';
          }
        }
      }, 100);
    }
  }

  closeMenu = (event) => {
    if (event.target.className === 'sidebar-choose-project-container' || event.target.className === 'sidebar-choose-project-title' ||
    event.target.className === 'project-logo-title' || event.target.className === 'project-logo' || event.target.className === 'project-logo-caret') {
      return;
    }
    this.setState({ isMenuOpen: false });
  }

  openMenu = () => {
    if (this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false });
    } else {
      this.setState({ isMenuOpen: true });
      if (this.dropupOpenElement) {
        setTimeout(() => {
          if (this.dropupOpenElement[0]) {
            if (this.dropupOpenElement[0].clientHeight > window.innerHeight) {
              this.dropupOpenElement[0].style.height = window.innerHeight - 144 + 'px';
              this.dropupOpenElement[0].style.overflow = 'auto';
            }
          }
        }, 100);
      }
    }
  }

  chooseCurrentProject = (project) => {
    this.props.setProject(project);
  }

  addProject = () => {
    this.props._addNewProject();
  }

  render() {
    return (
      <div className='sidebar-choose-project-wrapper'>
        {
          (this.state.isMenuOpen) ?
          <div className='choose-project-menu-open'>
            {
              this.props.allProjects.map((proj, i) =>
                <div className='choose-project-menu-item' key={i} onClick={() => this.chooseCurrentProject(proj)}>
                  <div className='project-menu-sign' style={{ backgroundColor: proj.color || 'gray' }}>{proj.name[0].toUpperCase()}</div>
                  <div className='project-menu-title'>{proj.name}</div>
                </div>
              )
            }
            {
              (this.props.isAdmin) ?
              <div className='add-project-button' onClick={ this.addProject }>
                <div className='project-menu-sign plus' style={{ backgroundColor: 'gray' }}>{'+'}</div>
                <div className='project-menu-title'>{'ADD PROJECT'}</div>
              </div> : null
            }
          </div> : null
        }
        <div className='sidebar-choose-project-container' onClick={this.openMenu}>
          <div className='sidebar-choose-project-title'>
            <div className='project-logo' style={{ backgroundColor: this.props.project_color || 'gray' }}>
              {
                (!this.props.project_name) ? this.props.allProjects[0].name[0].toUpperCase() :
                 this.props.project_name[0].toUpperCase()
              }
            </div>
              <div className='project-logo-title'>
                {
                  (!this.props.project_name) ? this.props.allProjects[0].name :
                  this.props.project_name
                }
              </div>
              <div className='project-logo-caret'>
                <span className={`caret ${(this.state.isMenuOpen) ? '' : 'up'}`}></span>
              </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ChooseProjectMenu;
