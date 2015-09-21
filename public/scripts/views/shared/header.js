import React from 'react'
import SearchBox from '../project_creator_search/searchBox.js'

export default class Header extends React.Component {
    render() {
        return (
            <div className="ui menu">
                <h1 className="ui header">Kick Me!
                    <small className="ui sub header">New Project Notifications for Kickstater</small>
                </h1>

                <div className="right menu">
                <span className="item">
                    <SearchBox />
                </span>
                <span className="item">
                    Sign In/Sign Out
                </span>
                </div>
            </div>
        )
    }
}
