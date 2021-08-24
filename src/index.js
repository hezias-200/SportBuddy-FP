import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {reduxFirestore} from 'redux-firestore'
import {reactReduxFirebase} from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import rootReducer from './account/reducers/rootReducer'
import { Provider } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

const store=createStore(rootReducer,
  compose (
    applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reactReduxFirebase(fbConfig),
    reduxFirestore(fbConfig)
  )    
    );
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
