import React, { Component } from 'react';

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    handleChange = e => {
        this.setState({ search: e.target.value });
    }

    handleSearch = e => {
        e.preventDefault();
        if (this.state.search) {
        }
    }

    render() {
        return (
            <div className="top">
                <form className="search" onSubmit={this.handleSearch}>
                    <svg id="searchicon" className="icon">
                        <path fill="#bababa" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z">
                        </path>
                    </svg>
                    <input
                        className="searchtext"
                        type="text"
                        placeholder="Tags"
                        aria-label="Search"
                        onChange={this.handleChange}
                        value={this.state.search} />
                </form>
            </div>
        )
    }
}