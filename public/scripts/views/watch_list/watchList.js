import React from 'react'
import request from 'superagent'
import ProjectCreator from './projectCreator.js'

export default class WatchList extends React.Component {

    constructor(props) {
        super();
        this.state = { projectCreators: [] };
        this.getProjectCreators = this.getProjectCreators.bind(this);
    }

    componentDidMount() {
        this.getProjectCreators();
        setInterval(this.getProjectCreators, 2000);
    }

    getProjectCreators() {
        let userToken = this.props.user.token;

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
