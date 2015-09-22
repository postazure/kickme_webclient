import React from 'react'
import Header from './views/shared/header.js'
import WatchList from './views/watch_list/watchList.js'
import AuthForm from './views/auth/auth.js'

export default class App extends React.Component {
    constructor(props) {
        super();
        let user = this.getUser();

        this.state = { user: user };
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
        setInterval(this.getUser, 200);
    }

    getUser() {
        let storageData = localStorage.getItem('Kickme');
        let user = false;

        if (storageData) {
            user = JSON.parse(storageData).user;
        }

        this.setState({user: user});
    }

    render() {
        let user = this.state.user;
        return(
            <div className="container">
                <Header user={user} />
                <div className="content container">
                    { user ? <WatchList user={user} /> : <AuthForm /> }
                </div>
            </div>
        )
    }
}