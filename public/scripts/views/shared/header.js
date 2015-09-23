import React from 'react'
import SearchBox from '../project_creator_search/searchBox.js'
import request from 'superagent'

export default class Header extends React.Component {
    constructor(props) {
        super();
        this.signUserOut = this.signUserOut.bind(this);
    }

    signUserOut() {
        let token = this.props.user.token;
        request
            .post('http://localhost:3000/logout/' + token)
            .end((err, res) => {
                if (err) {
                    console.error( err );
                }
            });

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
