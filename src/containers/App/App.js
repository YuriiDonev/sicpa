
import React, {Component} from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';

// dinamically create app routes
// import appRoutes from 'routes/app.jsx';

import Dash from '../Dash/Dash';

import { getProjects as _getProjects } from '../../actions/projects-actions.js';


class App extends Component{

  componentDidMount() {
    
  }

    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render(){
      return (
        <Switch>
          <Route path='/' component={Dash} />
        </Switch>
      );
    }
}

// const mapStateToProps = ({ _isLoading }) => ({
//   _isLoading,
// });

const actions = {
  _getProjects,
};

export default connect(null, actions)(App);
// export default App;

// return (
//     <Switch>
//       <Route path='/' component={Dash} />
//     </Switch>
// );

  // <Route path="/login" component={() => <Redirect to="/" />}/>

// import React, {Component} from 'react';
// import {
//     Switch,
//     Route
// } from 'react-router-dom';
// import { connect } from 'react-redux';
//
// // dinamically create app routes
// import appRoutes from 'routes/app.jsx';
//
// import { getProjects as _getProjects } from '../../actions/projects-actions.js';
//
//
// class App extends Component{
//
//   componentDidMount() {
//     this.props._getProjects();
//   }
//
//     componentDidUpdate(e){
//         if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
//             document.documentElement.classList.toggle('nav-open');
//         }
//     }
//     render(){
//
//         return (
//             <Switch>
//                 {
//                     appRoutes.map((prop,key) => {
//                         return (
//                             <Route path={prop.path} component={prop.component} key={key} />
//                         );
//                     })
//                 }
//             </Switch>
//         );
//     }
// }
//
// // const mapStateToProps = ({ _isLoading }) => ({
// //   _isLoading,
// // });
//
// const actions = {
//   _getProjects,
// };
//
// export default connect(null, actions)(App);
// // export default App;
