import React, { Component } from 'react';


class UserItem extends Component {
  
  updateStatusItem = (event) => {
    this.props.updateStatus(this.props.email, event.target.value, this.props.contact);
  }

  deleteUserItem = () => {
    this.props.deleteUser(this.props.email);
  }

  resendInvitationItem = () => {
    // this.setState({isInvitationSent: true});
    this.props.resendInvitation(this.props.email);
  }

  toggleProjectContact = () => {
    if (this.props.contact) {
      this.props.isUserContact(this.props.email, this.props.role, false);
    } else {
      this.props.isUserContact(this.props.email, this.props.role, true);
    }
  }

  render() {
    // console.log('USER ITEM this.props ', this.props);
    return (
      <div className='invite-users-list-item'>

          <div className='invite-users-list-close-cross' onClick={this.deleteUserItem}><i className="pe-7s-close"></i></div>

          <div className='invite-users-list-email'>
            {
              (this.props.invitationList) ?
              <div className='invitation-email'>{`${this.props.first_name} ${this.props.last_name} ${this.props.email}`}</div> :
              <div className='invitation-email'>{`${this.props.first_name} ${this.props.last_name} (${this.props.email})`}</div>
            }
            {
              (this.props._isInvitationSent) ? <div className='invitation-sent'>{'INVITATION SENT'}</div> : null
            }
            {
              (this.props._isInvitationSent) ? null :
              <div>
                {
                  (this.props.resendLabel) ? <div className='invitation-resend' onClick={this.resendInvitationItem}><a>{'Resend Invitation'}</a></div> : null
                }
              </div>
            }
          </div>

          <div className='invite-users-list-admin'>
            <div className={`radio-item ${(this.props.role === 'admin') ? 'checked-admin' : '' }`}>
              <input type="radio" id={`ritema ${this.props.id } ${this.props.email}`} name={`ritema ${this.props.id } ${this.props.email}`} value="admin"
                checked={(this.props.role === 'admin') ? true : false}
                onChange={this.updateStatusItem}
              />
              <label htmlFor={`ritema ${this.props.id } ${this.props.email}`}></label>
            </div>
          </div>
          <div className='invite-users-list-user'>
            <div className={`radio-item ${(this.props.role === 'user') ? 'checked-user' : '' }`}>
              <input type="radio" id={`ritemu ${this.props.id } ${this.props.email}`} name={`ritemu ${this.props.id } ${this.props.email}`} value="user"
                checked={(this.props.role === 'user') ? true : false}
                onChange={this.updateStatusItem}
              />
              <label htmlFor={`ritemu ${this.props.id } ${this.props.email}`}></label>
            </div>
          </div>
          <div className='invite-users-list-read-only'>
            <div className={`radio-item ${(this.props.role === 'read-only') ? 'checked-read-only' : '' }`}>
              <input type="radio" id={`ritemr ${this.props.id } ${this.props.email}`} name={`ritemr ${this.props.id } ${this.props.email}`} value="read-only"
                checked={(this.props.role === 'read-only') ? true : false}
                onChange={this.updateStatusItem}
              />
              <label htmlFor={`ritemr ${this.props.id } ${this.props.email}`}></label>
            </div>
          </div>


          <div className='user-project-contact'>
            <label className="switch">
              <input type="checkbox"
                checked={this.props.contact}
                name={this.props.email}
                id={'full_day'}
                value={this.props.contact}
                onChange={this.toggleProjectContact}
              />
              <span className="slider round"></span>
            </label>
          </div>

      </div>
    );
  }
}


export default UserItem;
