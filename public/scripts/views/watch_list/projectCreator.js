import React from 'react'

export default class ProjectCreator extends React.Component {
    render() {
        return(
            <div className="item">
                <img className="ui avatar image" src={this.props.avatar} />
                <div className="content">
                    <a className="header" href={this.props.url_web} >{this.props.name}</a>
                    <div className="description">{this.props.bio}</div>
                </div>
            </div>
        )
    }
}