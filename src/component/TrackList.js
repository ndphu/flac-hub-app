import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TrackListItem from "./TrackListItem";
import Grid from "@material-ui/core/Grid/Grid";

const itemWidth = 410;

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    downloadLink: {
        paddingLeft: theme.spacing.unit * 4,
    },
    gridItem: {
        // marginTop: theme.spacing.unit,
        // marginBottom: theme.spacing.unit,
    },
});


class TrackList extends Component {
    state = {};

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };


    render = () => {
        const {tracks} = this.props;
        const {classes} = this.props;

        return (
            <Grid style={{marginTop: 8}}
                  container
                  spacing={8}
                  justify="flex-start"
            >
                {tracks && tracks.map(track => {
                    return (
                        <Grid item
                              xs={12}
                              sm={6}
                              md={4}
                              lg={3}
                              xl={2}
                              className={classes.gridItem}
                              key={`track-id-${track.link}`}>
                            <TrackListItem track={track}/>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }
};

export default withStyles(styles)(TrackList);