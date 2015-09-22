import React from 'react'
import SignInForm from './signIn.js'
import SignUpForm from './signUp.js'

export default class AuthForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            presentSignInForm: true
        };
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm() {
        this.setState({presentSignInForm: !this.state.presentSignInForm});
    }

    render() {
        let presentSignInForm = this.state.presentSignInForm;

        let form;
        if (this.state.presentSignInForm) {
            form = <SignInForm onSubmit={this.state.submitButtonAction} />
        } else {
            form = <SignUpForm onSubmit={this.state.submitButtonAction} />
        }

        return(
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui image header">
                        <div className="content">
                            {'Please ' + (presentSignInForm ? 'Login' : 'Register')}
                        </div>
                    </h2>
                    {form}
                    <div className="ui message">
                         <a onClick={this.toggleForm} >
                            {presentSignInForm ? 'New to us? Register' : 'Already have an account? Login'}
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}