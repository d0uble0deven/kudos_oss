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



}









export default withStyles(styles)(withAuth(home));