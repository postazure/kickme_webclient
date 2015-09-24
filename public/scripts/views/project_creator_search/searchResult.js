import React from 'react'
import request from 'superagent'


export default class SearchResult extends React.Component {

    constructor(props) {
        super();
        this.addCreatorToWatchList = this.addCreatorToWatchList.bind(this);
    }
    
    addCreatorToWatchList() {
        let user = this.props.user;

        if (!user) {
            console.error( 'No user, cannot add pc to misisng user.' );
            return;
        }
        let userToken = user.token;

        request
            //.post('http://localhost:3000/user/follow?token=' + userToken)
            .post('https://postazure-kickme.herokuapp.com/user/follow?token=' + userToken)
            .send({
                project_creator: {
                    kickstarter_id: this.props.projectCreator.kickstarter_id,
                    name: this.props.projectCreator.name,
                    profile_avatar: this.props.projectCreator.profile_avatar,
                    profile_url: this.props.projectCreator.profile_url,
                    project: this.props.projectCreator.project
                }
            })
            .end((err, res) => {
                if (err) {console.error( err );}
                if (res) {
                    this.props.vessel.run('clearSearchBox')
                }
            })
    }
    
    render() {
        return(
            <a className="result" onClick={this.addCreatorToWatchList}>
                <div className="content">
                    <img className="ui avatar image" src={this.props.projectCreator.profile_avatar} />
                    <div className="title">{this.props.projectCreator.name}</div>
                </div>
            </a>
        )
    }
}