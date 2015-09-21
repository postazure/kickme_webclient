import React from 'react'
import SearchResults from './searchResults.js'

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
    }

    tick() {
        console.log( this.state.searchDebounceTimer );
        this.setState({searchDebounceTimer: this.state.searchDebounceTimer + 1})
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getValues(e) {
        let search = React.findDOMNode(this.refs.search).value.trim();

        if (search.length > 0 ) {
            if (this.state.searchDebounceTimer <= 1) {return;}
            this.setState({searchDebounceTimer: 0});

            this.setState({
                hasResults: true,
                projectCreators: [
                    {
                        "name": "CoolMiniOrNot",
                        "kickstarter_id": 1234,
                        "profile_avatar": "https://avatar.com/coolminiornot",
                        "url_api": "https://profile.com/coolminiornot"
                    }
                ]
            });
        } else {
            this.setState({hasResults: false})
        }
    }


    render() {
        return(
            <div className="ui search">
                <div className="ui icon input">
                    <input onKeyUp={this.getValues} ref="search" className="prompt" type="text" placeholder="new project creator" />
                    <i className="search icon"></i>
                </div>
                <SearchResults hasResults={this.state.hasResults} projectCreators={this.state.projectCreators}/>
            </div>
        )
    }
}

