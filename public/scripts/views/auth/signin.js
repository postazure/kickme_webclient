import React from 'react'
import request from 'superagent'

export default class SignIn extends React.Component {
    constructor(props) {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        let email = React.findDOMNode(this.refs.email).value.trim();
        let password = React.findDOMNode(this.refs.password).value.trim();

        if (!email || !password) {
            console.error( "Form has blank fields!" );
            return;
        }

        this.signInUser(email, password);
    }

    clearForm() {
        React.findDOMNode(this.refs.email).value = '';
        React.findDOMNode(this.refs.password).value = '';
    }

    signInUser(email, password) {
        let params = '?email=' + email + '&password=' + password;

        request
            //.post('http://localhost:3000/login' + params)
            .post('https://postazure-kickme.herokuapp.com/login' + params)
            .end((err, res) => {
                if (err) {console.error( err );}
                if (res) {
                    let token = res.body.token;
                    this.storeUser(email, token)
                }
                this.clearForm()
            }
        );
    }

    storeUser(email, token) {
        let json = JSON.stringify({
            user: {
                email: email,
                token: token
            }
        });

        localStorage.setItem("Kickme", json);
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit} className="ui large form">
                <div className="ui stacked segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input ref="email" type="text" name="email" placeholder="E-mail address" autoComplete="off" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input ref="password" type="password" name="password" placeholder="Password" autoComplete="off" />
                        </div>
                    </div>
                    <input type="submit" value="Sign In" className="ui fluid large blue submit button" />
                </div>

                <div className="ui error message"></div>
            </form>
        )
    }
}