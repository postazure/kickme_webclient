import React from 'react'
import request from 'superagent'
import Error from './error.js'

export default class SignUp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            formErrors: {}
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        let email = React.findDOMNode(this.refs.email).value.trim();
        let password = React.findDOMNode(this.refs.password).value.trim();
        let passwordConfirmation = React.findDOMNode(this.refs.passwordConfirmation).value.trim();

        if (!email || !password || !passwordConfirmation) {
            return;
        } else if (password !== passwordConfirmation) {
            this.addFormError( {password: ['does not match Password Confirmation!']});
            return;
        }

        this.registerUser(email, password);
    }

    clearForm() {
        React.findDOMNode(this.refs.email).value = '';
        React.findDOMNode(this.refs.password).value = '';
        React.findDOMNode(this.refs.passwordConfirmation).value = '';
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

    registerUser(email, password) {
        this.setState({formErrors: {}});

        request
            //.post('http://localhost:3000/registrations')
            .post('https://postazure-kickme.herokuapp.com/registrations')
            .send({ user: {
                password: password, email: email
            }})
            .end((err, res) => {
                if (err) {
                    let errors = Object.assign({}, res.body['errors']);

                    this.addFormError(errors);
                    console.log( 'formErrors', this.state.formErrors );
                    return;
                }

                if (res) {
                    console.log( res.body );
                    let token = res.body.token;
                    this.storeUser(email, token)
                }
                this.clearForm()
            }
        );
    }

    addFormError(...errorsObj) {
        let errors = this.state.formErrors;
        errors = Object.assign(errors, ...errorsObj);
        this.setState({formErrors: errors});
    }

    render() {
        let errorKeys = Object.keys(this.state.formErrors);
        let errors = errorKeys.map((key) => {
            let error = this.state.formErrors[key];
            return(
                <Error msgs={error} title={key} />
            )
        });

        return(
            <form onSubmit={this.handleFormSubmit} className="ui large form error">
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
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input ref="passwordConfirmation" type="password" name="password_conformation" placeholder="Password Conformation" autoComplete="off" />
                        </div>
                    </div>
                    <input type="submit" value="Register" className="ui fluid large blue submit button" />
                </div>

                {errors}
            </form>
        )
    }
}