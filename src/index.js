import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
// import _ from 'lodash';

import './assets/css/bootstrap.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

import reducers from './reducers';

import App from './containers/App/App';
// import Dash from './containers/Dash/Dash';

import { checkToken } from './service';
import { removeToken } from './service/token.js';

import { getUserInfoEnd } from './service/endPoint.js';

// import { mockprojectsList } from './mock-data/mock-projects.js';

// import Login from './components/Login/login.js';
// import SignUp from './components/Login/signup.js';
// import AccCreated from './components/Login/account-created.js';
// import ResetPassword from './components/Login/reset-password.js';
// import ResendEmail from './components/Login/resend-email.js';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(
    applyMiddleware(middleware, reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path='/' component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// export const logoutFromAppTokenError = () => {
//   console.log('%%%%%%% logoutFromAppTokenError ');
//   store.dispatch({
//     type: 'LOADING_DATA',
//     payload: false,
//   });
//   removeToken();
//   store.dispatch({
//     type: 'IS_LOGIN',
//     payload: false,
//   });
// };

// const renderPublicRoutes = () => {
//   return <Switch>
//       <Route path='/login' component={Login} />
//       <Route path='/signup' component={SignUp} />
//       <Route path='/account' component={AccCreated} />
//       <Route path='/reset-password' component={ResetPassword} />
//       <Route path='/resend-email' component={ResendEmail} />
//       <Redirect to='/login'/>
//     </Switch>
// };
//
// const isToken = checkToken({ store });
// // console.log('isToken ', isToken);
//
// if (isToken.token) {
//   getUserInfoEnd(isToken.userId).then(resolve => {
//     store.dispatch({
//       type: 'GET_USER_INFO',
//       payload: resolve,
//     });
//     store.dispatch({
//       type: 'LOADING_DATA',
//       payload: false,
//     });
//   }, reject => {
//     console.error(reject);
//   });
// }

// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <div>
//         {
//           (isToken.token) ? <Route path='/' component={App} /> : renderPublicRoutes()
//         }
//       </div>
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root')
// );
//
//
// store.subscribe(() => {
//   const _isLogin = store.getState()._isLogin;
//     ReactDOM.render(
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <div>
//             {
//               (!_isLogin) ? renderPublicRoutes() : <Route path='/' component={App} />
//             }
//           </div>
//         </ConnectedRouter>
//       </Provider>,
//       document.getElementById('root')
//     );
// });

// "scripts": {
//   "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
//   "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
//   "start-js": "react-scripts start",
//   "start": "npm-run-all -p watch-css start-js",
//   "build": "npm run build-css && react-scripts build",
//   "test": "react-scripts test --env=jsdom",
//   "eject": "react-scripts eject"
// }
// "scripts": {
//     "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
//     "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
//     "start-js": "react-scripts start",
//     "start": "NODE_PATH=./src npm-run-all -p watch-css start-js",
//     "build": "npm run build-css && react-scripts build",
//     "test": "react-scripts test --env=jsdom",
//     "eject": "react-scripts eject"
// }
