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
        let mainView;

        if (user) {
            mainView = (
                <WatchList user={user} />
            )
        } else {
            mainView = (
                <div>
                    <div className="ui raised segment">
                        <h1>Kickme! <small>Email notifications for kickstarter.</small></h1>
                        <p>
                            Kickme gives you the ability to 'follow' Project Creators on Kickstarter.
                        </p>
                        <p>
                            When a project creator on your watchlist starts a new campaign, you will receive an email
                            with all the new project creator's projects.
                        </p>
                        <p>
                            Please create an account or log in.
                        </p>
                    </div>
                    <AuthForm />
                </div>

            )
        }


        return(
            <div className="container">
                <Header user={user} />
                <div className="content container">
                    {mainView}
                </div>
            </div>
        )
    }
}