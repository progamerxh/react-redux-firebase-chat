import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import rootReducer from './Reducers/Reducers';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import firebaseConfig from './Config';
import * as types from './Actions/authActionTypes';

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users', // where profiles are stored in database
    attachAuthIsReady: true, // attaches auth is ready promise to store
    firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default)
    onAuthStateChanged: ((authData, firebase, dispatch) => {
        if (authData) {
            const userRef = firebase.database().ref(`users/${authData.uid}`)
            const connectedRef = firebase.database().ref(".info/connected");
            connectedRef.on("value", function (snap) {
                if (snap.val() === true) {
                    userRef.child('isActive').onDisconnect().set(false);
                    userRef.child('lastTimeLoggedIn').onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
                }
            });
            firebase.database().ref(`users/${authData.uid}`).update(
                {
                    isActive: true,
                    firstName: authData.displayName.split(" ", 1)[0],
                    lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
                }
            )
            firebase.database().ref(`users/${authData.uid}/favList`)
                .once('value', favList => {
                    var _favList = [];
                    favList.forEach(user => {
                        if (user.val())
                            _favList.push(user.key)
                    })
                    dispatch({
                        type: types.GET_FAVLIST,
                        favList: _favList
                    });
                });
        }
        else
            firebase.auth().signOut();

    })
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
