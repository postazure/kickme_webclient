import React from 'react'

export default class SignUp extends React.Component {
    render() {
        return(
            <form className="ui large form">
                <div className="ui stacked segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address" autoComplete="off" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" autoComplete="off" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password_conformation" name="password_conformation" placeholder="Password Conformation" autoComplete="off" />
                        </div>
                    </div>
                    <div className="ui fluid large blue submit button">Register</div>
                </div>

                <div className="ui error message"></div>
            </form>
        )
    }
}