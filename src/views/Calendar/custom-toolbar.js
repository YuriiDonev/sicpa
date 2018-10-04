// import React from 'react';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import SelectResource from './select-resource.js';

class CustomToolbar extends Component {

  goToBack = () => {
    this.props.onNavigate('PREV');
  };

  goToNext = () => {
    this.props.onNavigate('NEXT');
  };

  goToCurrent = () => {
    this.props.onNavigate('TODAY');
  };

  label = () => {
    // const date = moment(toolbar.date);
    return (
      <span>{this.props.label}</span>
    );
  };

  changeView = (view) => {
    if (view === 'month') { this.props.onViewChange('month'); }
    else if (view === 'week') { this.props.onViewChange('week'); }
    else if (view === 'day') { this.props.onViewChange('day'); }
    else if (view === 'agenda') { this.props.onViewChange('agenda'); }
    else { return }
  }

  render () {
    // console.log('CustomToolbar ', this.props);

    return (
      <div className='custom-toolbar-container'>
        <div className='select-navigation-container'>
          <div className='custom-toolbar-navigation'>
            <div className='back-next-buttons'>
              <div className='btn-back' onClick={this.goToBack}><div>&#8249;</div></div>
              <div className='btn-current' onClick={this.goToCurrent}><div>TODAY</div></div>
              <div className='btn-next' onClick={this.goToNext}><div>&#8250;</div></div>
            </div>
            <div className='period-view-container'>
              <div className={`month-view ${(this.props.view === 'month') ? 'active' : ''}`} onClick={()=>{ this.changeView('month') }}>{'MONTH'}</div>
              <div className={`week-view ${(this.props.view === 'week') ? 'active' : ''}`} onClick={()=>{ this.changeView('week') }}>{'WEEK'}</div>
              <div className={`day-view ${(this.props.view === 'day') ? 'active' : ''}`} onClick={()=>{ this.changeView('day') }}>{'DAY'}</div>
              <div className={`agenda-view ${(this.props.view === 'agenda') ? 'active' : ''}`} onClick={()=>{ this.changeView('agenda') }}>{'AGENDA'}</div>
            </div>
          </div>
        </div>
        <div className='label-date-wrapper'>
          <label className='custom-toolbar-label-date'>{this.label()}</label>
        </div>
      </div >
    );
  }
}

export default CustomToolbar;

//
// // import React from 'react';
// import React, { Component } from 'react';
// // import { connect } from 'react-redux';
// import SelectResource from './select-resource.js';
//
// class CustomToolbar extends Component {
//
//   goToBack = () => {
//     this.props.onNavigate('PREV');
//   };
//
//   goToNext = () => {
//     this.props.onNavigate('NEXT');
//   };
//
//   goToCurrent = () => {
//     this.props.onNavigate('TODAY');
//   };
//
//   label = () => {
//     // const date = moment(toolbar.date);
//     return (
//       <span>{this.props.label}</span>
//     );
//   };
//
//   changeView = (view) => {
//     if (view === 'month') { this.props.onViewChange('month'); }
//     else if (view === 'week') { this.props.onViewChange('week'); }
//     else if (view === 'day') { this.props.onViewChange('day'); }
//     else if (view === 'agenda') { this.props.onViewChange('agenda'); }
//     else { return }
//   }
//
//   render () {
//     // console.log('CustomToolbar ', this.props);
//
//     return (
//       <div className='custom-toolbar-container'>
//         <div className='select-navigation-container'>
//           <div className='select-resource-container'>
//             <SelectResource />
//           </div>
//           <div className='custom-toolbar-navigation'>
//             <div className='back-next-buttons'>
//               <div className='btn-back' onClick={this.goToBack}><div>&#8249;</div></div>
//               <div className='btn-current' onClick={this.goToCurrent}><div>TODAY</div></div>
//               <div className='btn-next' onClick={this.goToNext}><div>&#8250;</div></div>
//             </div>
//             <div className='period-view-container'>
//               <div className={`month-view ${(this.props.view === 'month') ? 'active' : ''}`} onClick={()=>{ this.changeView('month') }}>{'MONTH'}</div>
//               <div className={`week-view ${(this.props.view === 'week') ? 'active' : ''}`} onClick={()=>{ this.changeView('week') }}>{'WEEK'}</div>
//               <div className={`day-view ${(this.props.view === 'day') ? 'active' : ''}`} onClick={()=>{ this.changeView('day') }}>{'DAY'}</div>
//               <div className={`agenda-view ${(this.props.view === 'agenda') ? 'active' : ''}`} onClick={()=>{ this.changeView('agenda') }}>{'AGENDA'}</div>
//             </div>
//           </div>
//         </div>
//         <div className='label-date-wrapper'>
//           <label className='custom-toolbar-label-date'>{this.label()}</label>
//         </div>
//       </div >
//     );
//   }
// }
//
// export default CustomToolbar;
