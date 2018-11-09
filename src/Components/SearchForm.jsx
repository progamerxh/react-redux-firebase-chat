import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUser } from '../Actions/usersActions';

export class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    handleChange = e => {
        this.props.dispatch(searchUser(e.target.value));
        this.setState({ search: e.target.value });
    }

    handleSearch = e => {
        e.preventDefault();
        if (this.state.search !== '') {
            this.props.dispatch(searchUser(this.state.search));
        }
    }

    render() {
        return (
            <div className="top">
                <form className="search" onSubmit={this.handleSearch}>
                    <i id="searchicon" className="prefix mdi-action-search" />

                    <input
                        className="searchtext"
                        type="text"
                        placeholder="Type somethings..."
                        aria-label="Search"
                        onChange={this.handleChange}
                        value={this.state.search} />
                </form>
            </div>
        )
    }
}
export default connect(
)(SearchForm);
