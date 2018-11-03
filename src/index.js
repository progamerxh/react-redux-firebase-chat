import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose  } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import rootReducer from './Reducers/Reducers';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import firebaseConfig from './Config';

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)
const initialState = {};
const middlewares = applyMiddleware(thunk)
const store = createStoreWithFirebase(rootReducer, initialState, middlewares);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
