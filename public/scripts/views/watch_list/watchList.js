import React from 'react'
import request from 'superagent'
import ProjectCreator from './projectCreator.js'

export default class WatchList extends React.Component {

    constructor(props) {
        super();
        this.state = { projectCreators: [], intervals:[] };
        this.getProjectCreators = this.getProjectCreators.bind(this);
    }

    componentDidMount() {
        this.getProjectCreators();
        let interval = setInterval(() => {
            this.getProjectCreators(interval)
        }, 2000);
        this.setState({intervals: this.state.intervals.push(interval)});
    }

    getProjectCreators(interval) {
        if (! this.props.user) {return;}
        let userToken = this.props.user.token;

        request
            .get('http://localhost:3000/user/project_creators?token=' + userToken)
            .end((err, res) => {
                if (err) {
                    console.error( err );
                    if (err.status === 401) {
                        window.clearInterval(interval);
                        localStorage.removeItem('Kickme');
                    }
                }
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
            <div>
                <div className="ui raised segment">
                    <h1>Watch List <small>Project Creators you're following.</small></h1>
                    <p>
                        Use the Search Bar in the menu to add new project creators.
                    </p>
                    <p>
                        If you have trouble finding a Project Creator, search for a recent project they have posted.
                    </p>
                </div>

                <div className="ui large relaxed list">
                    {projectCreators}
                </div>
            </div>
        )
    }
}
