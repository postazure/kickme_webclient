import React from 'react'
import SearchBox from '../project_creator_search/searchBox.js'

export default class Header extends React.Component {

    signUserOut() {
        localStorage.removeItem('Kickme');
    }

    render() {
        let user = this.props.user;

        let loggedInMenu = <a onClick={this.signUserOut} className="item">Sign Out</a>
        let searchBox = <span className="item"><SearchBox user={user} /></span>;

        return (
            <div className="ui menu">
                <div className="header item">
                        Kick Me!
                </div>

                <div className="right menu">
                    {user ? searchBox : null }
                    {user ? loggedInMenu : null }
                </div>
            </div>
        )
    }
}
