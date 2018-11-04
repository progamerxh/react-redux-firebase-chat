import React, { Component } from 'react';
import {joininRoom } from '../Actions/roomActions';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loading from './Loading';

export class RoomList extends Component {

    render() {
        const { rooms, dispatch } = this.props;
        return (
            <div className="bot">
                {!isLoaded(rooms) ? (<Loading />)
                    : isEmpty(rooms) ? (
                        <h2>RoomList is empty!</h2>
                    ) : (
                            <div className="row">
                                {Object.keys(rooms).map((key, index) => {
                                    const room = rooms[key];
                                    room.roomName = key;
                                    return (
                                        <div className="column" key={index} >
                                            <img src={room.photoURL} alt="" className="roomphoto"></img>
                                            <div className="roominfor">
                                                <h4>{room.roomName}</h4>
                                                <p>Tags: {room.tags}</p>
                                                <Link to={`/room/${room.roomName}`}>
                                                    <button className="join"
                                                        onClick={() => {
                                                            dispatch(joininRoom(room.roomName));

                                                        }}>
                                                        <span className="jointext">Join</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                }
            </div>
        );
    }
}

export default compose(
    firebaseConnect([
        'rooms'
    ]),
    connect((state) => ({
        rooms: state.firebase.data.rooms,
    }))
)(RoomList)

