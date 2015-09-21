import React from 'react'

export default class SearchResult extends React.Component {
    render() {
        return(
            <a className="result">
                <div className="content">
                    <div className="title">{this.props.projectCreator.name}</div>
                </div>
            </a>
        )
    }
}