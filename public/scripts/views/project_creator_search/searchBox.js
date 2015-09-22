import React from 'react'
import request from 'superagent'
import SearchResults from './searchResults.js'
import Vessel from '../../lib/vessel.js'

export default class SearchBox extends React.Component {
    constructor(props) {
        super();
        this.state = {
            hasResults: false,
            projectCreators: [],
            searchDebounceTimer: 0
        };
        this.getValues = this.getValues.bind(this);
        this.tick = this.tick.bind(this);
        this.searchProjectCreators = this.searchProjectCreators.bind(this);

        this.vessel = new Vessel(this, {clearSearchBox: this.clearSearchBox});
    }

    tick() {
        this.setState({searchDebounceTimer: this.state.searchDebounceTimer + 1})
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    clearSearchBox() {
        this.setState({hasResults: false});
        let searchInput = React.findDOMNode(this.refs.search);
        searchInput.value = "";
    }

    getValues(e) {
        let search = React.findDOMNode(this.refs.search).value.trim();
        let minCharactersForSearch = 3;

        if (search.length >= minCharactersForSearch ) {
            if (this.state.searchDebounceTimer <= 1) {return;}
            this.setState({searchDebounceTimer: 0});

            this.searchProjectCreators(search);
        } else {
            this.setState({hasResults: false})
        }
    }

    searchProjectCreators(query) {
        let normalizedQuery = query.replace(/\s /g,"+")
        console.log( normalizedQuery );
        request
            .post('http://localhost:3000/project_creators/search?search_name=' + normalizedQuery)
            .end((err, res) => {
                if (err) {console.error( err );}
                console.log( res.body );
                this.setState({
                    hasResults: true,
                    projectCreators: res.body
                });
            }
        );
    }


    render() {
        return(
            <div className="ui search">
                <div className="ui icon input">
                    <input onKeyUp={this.getValues} ref="search" className="prompt" type="text" placeholder="new project creator" />
                    <i className="search icon"></i>
                </div>
                <SearchResults vessel={this.vessel} hasResults={this.state.hasResults} projectCreators={this.state.projectCreators}/>
            </div>
        )
    }
}

