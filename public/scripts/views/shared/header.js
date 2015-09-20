import React from 'react'

export default class Header extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="ui menu">
                    <h1 className="ui header">Kick Me!
                        <small className="ui sub header">New Project Notifications for Kickstater</small>
                    </h1>

                    <div className="right menu">
                    <span className="item">Sign In/Sign Out</span>
                    </div>
                </div>
            </div>
        )
    }
}
