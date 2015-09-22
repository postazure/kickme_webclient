import React from 'react'
import SearchResult from './searchResult.js'

export default class SearchResults extends React.Component {
    render() {

        let searchResults;

        if ( ! this.props.hasResults) {
            searchResults =  (<div className="results hidden"></div>);
        } else {
            let projectCreators = this.props.projectCreators.map((projectCreator) => {
                return (
                    <SearchResult user={this.props.user} vessel={this.props.vessel} projectCreator={projectCreator}/>
                )
            });

            searchResults = (
                <div className="results visible transition">
                    {projectCreators}
                </div>
            )
        }

        return searchResults;
    }
}