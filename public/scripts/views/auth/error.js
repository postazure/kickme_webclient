import React from 'react'

export default class Error extends React.Component {
    render() {
        let capitalizedTitle = this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1);

        let msgs = this.props.msgs.map(function (msg) {

            return(
                <p>{capitalizedTitle} {msg}.</p>
            )
        });

        return(
            <div className="ui error visible message">
                <div class="header">The Following Error has occurred.</div>
                {msgs}
            </div>
        )
    }
}