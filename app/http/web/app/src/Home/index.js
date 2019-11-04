import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { withAuth } from '@okta/okta-react';

import GithubRepo from "../GithubRepo"
import SearchBar from "../SearchBar"

import githubClient from '../githubClient'
import APIClient from '../apiClient'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Home extends React.Component {
    state = {
        value: 0,
        repos: [],
        kudos: []
    };

    async componentDidMount() {
        const accessToken = await this.props.auth.getAccessToken()
        this.apiClient = new APIClient(accessToken);
        this.apiClient.getKudos().then((data) =>
            this.setState({ ...this.state, kudos: data })
        );
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handleTabChangeIndex = index => {
        this.setState({ value: index });
    };

    resetRepos = repos => this.setState({ ...this.state, repos })

    isKudo = repo => this.state.kudos.find(r => r.id == repo.id)
    onKudo = repo => {
        this.updateBackend(repo);
    }


    updateBackend = repo => {
        if (this.isKudo(repo)) {
            this.apiClient.deleteKudo(repo);
        } else {
            this.apiClient.createKudo(repo);
        }
        this.updateState(repo);
    }


    updateState = (repo) => {
        if (this.isKudo(repo)) {
            this.setState({
                ...this.state,
                kudos: this.state.kudos.filter(r => r.id !== repo.id)
            })
        } else {
            this.setState({
                ...this.state,
                kudos: [repo, ...this.state.kudos]
            })
        }
    }

    onSearch = event => {
        const target = event.target;
        if (!target.value || target.length < 3) { return }
        if (event.which !== 13) { return }

        githubClient
            .getJSONRepos(target.value)
            .then((response) => {
                target.blur();
                this.setState({
                    ...this.state, value: 1
                });
                this.resetRepos(response.items);
            })
    }
    renderRepos = repos => {
        if (!repos) { return [] }
        return repos.map((repo) => {
            return (
                <Grid item xs={12} md={3} key={repo.id}>
                    <GithubRepo onKudo={this.onKudo} isKudo={this.isKudo(repo)} repo={repo} />
                </Grid>
            );
        })
    }


}









export default withStyles(styles)(withAuth(home));