import React from 'react'
import request from 'superagent'
import ProjectCreator from './projectCreator.js'

export default class WatchList extends React.Component {

    constructor(props) {
        super();
        this.state = { projectCreators: [] };
    }

    componentDidMount() {
        this.getProjectCreators();
        setInterval(this.getProjectCreators, 20000);
    }

    getProjectCreators() {
        let userToken = 'gtYz5UAsmNBqSJY1EfNCkHaP'; //TODO: Don't hard code this

        request
            .get('http://localhost:3000/user/project_creators?token=' + userToken)
            .end((err, res) => {
                if (err) {console.error( err );}
                this.setState({projectCreators: res.body});
            }
        )
    }

    render() {
        let projectCreators = this.state.projectCreators.map(function (projectCreator) {
            return(
                <ProjectCreator
                    name={projectCreator.name}
                    avatar={projectCreator.avatar}
                    bio={projectCreator.bio}
                    url_web={projectCreator.url_web}
                />
            )
        });

        return (
            <div className="ui large relaxed list">
                {projectCreators}
            </div>
        )
    }
}
