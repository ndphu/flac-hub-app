import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Collapse from "@material-ui/core/Collapse/Collapse";
import IconButton from "@material-ui/core/IconButton/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import api from "../api/Api";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link/Link";
import Grid from "@material-ui/core/Grid/Grid";
import PlayIcon from "@material-ui/icons/PlayCircleOutline"
import PauseIcon from "@material-ui/icons/PauseCircleOutline"

const styles = theme => ({
    downloadLink: {
        display: "block",
        marginRight: 4,
        fontSize: 12,
    },
    detailsContainer: {
        display: "flex",
    },
    audio: {
        display: "block",
    },
    container: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        // paddingLeft: theme.spacing.unit,
        // paddingRight: theme.spacing.unit,
    },
    trackTitle: {
        cursor: "pointer",
        fontSize: 15,
    },
    trackArtist: {
        cursor: "pointer",
        fontSize: 13,
    },
    // sourcesContainer: {
    //     display: "inline",
    // },

    audioContainer: {
        display: "inline",
        alignItems: "center",
        marginLeft: theme.spacing.unit * 2,
    },

    divider: {
        marginTop: theme.spacing.unit,
    },

    progressBar: {
        marginTop: theme.spacing.unit,
    },

    margin: {
        // margin: theme.spacing.unit,
        padding: 4,
    },

    playButtonContainer: {
        textAlign: "center",
    },

    errorText: {
        fontSize: 12,
    },

    tryAgainLink: {
        cursor: "pointer",
        fontSize: 12,
    }
});


class TrackListItem extends Component {
    state = {};

    handleClick = () => {
        if (this.state.loading || this.state.badTrack) {
            return
        }
        const track = this.props.track;
        if (!this.state.sources && !this.state.loading) {
            this.setState(state => ({loading: true}), function () {
                api.post("/source", {
                    url: btoa(track.link)
                }).then(resp => {
                    if (resp && resp.length > 0) {
                        if (resp[0].source.startsWith("http://data4") || resp[0].source.startsWith("https://data4")) {
                            this.setState({loading: false, sources: null, open: true, hasError: true, badTrack: true});
                        } else {
                            this.setState({loading: false, sources: resp, open: true, hasError: false});
                        }
                    }
                }).catch(err => {
                    this.setState({loading: false, hasError: true, open: true})
                })
            });
        }
    };

    onPlayClick = () => {
        this.audioEl.play();
    };

    onPauseClick = () => {
        this.audioEl.pause();
    };

    onCanPlay = () => {
        this.setState({duration: this.audioEl.duration})
    };

    onPlay = () => {
        this.setState({isPlaying: true});
    };

    onPause = () => {
        this.setState({isPlaying: false});
    };

    onTimeUpdate = () => {
        if (!this.seeking) {
            this.setState({seekerValue: Math.round(this.audioEl.currentTime)})
        }
    };

    onEnded = () => {
        // if (playService.isLoopOne()) {
        //     this.audioEl.play();
        // } else {
        //     playService.next();
        // }
        this.setState({isPlaying: false});
    };


    render = () => {
        const {track, classes} = this.props;
        const {sources, loading, isPlaying, hasError, badTrack} = this.state;

        return (
            <Paper className={classes.container} elevation={0} square>
                <Grid container justify={'space-between'}>
                    <Grid item xs={10}>
                        <Link variant={"h6"}
                              onClick={this.handleClick}
                              className={classes.trackTitle}>
                            {track.title}
                        </Link>
                        <Typography variant={"body2"}
                                    color={"textSecondary"}
                                    className={classes.trackArtist}>
                            {track.artist}
                        </Typography>
                    </Grid>
                    {sources &&
                    <Grid item xs={2} justify={'flex-end'} className={classes.playButtonContainer}>
                        {isPlaying ?
                            <IconButton size="small" color="primary" className={classes.margin}
                                        onClick={this.onPauseClick}>
                                <PauseIcon fontSize={"large"}/>
                            </IconButton> :
                            <IconButton size="small" color="primary" className={classes.margin}
                                        onClick={this.onPlayClick}>
                                <PlayIcon fontSize={"large"}/>
                            </IconButton>
                        }
                    </Grid>
                    }
                </Grid>

                {loading && <LinearProgress className={classes.progressBar} variant={"indeterminate"}/>}
                {!loading && hasError &&
                (badTrack ?
                        <div>
                            <Typography className={classes.errorText} color={'secondary'}>
                                This track is not available for downloading. Please try another one.
                            </Typography>
                        </div> :
                        <div>
                            <Typography className={classes.errorText} color={'secondary'}>
                                Something went wrong!
                            </Typography>
                            <Link href onClick={this.handleClick} className={classes.tryAgainLink}>Try again</Link>
                        </div>
                )
                }

                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    {sources &&
                    <div className={classes.detailsContainer}>
                        <Grid container justify={"flex-start"}>
                            {sources.filter(s => s.quality !== "32kbps").map(s => {
                                return (
                                    <Grid item key={`${s.source}`} xs={2} spacing={8}>
                                        <a className={classes.downloadLink} href={s.source}>
                                            {s.quality}
                                        </a>
                                    </Grid>
                                )
                            })
                            }
                        </Grid>

                        <audio autoPlay={false}
                               ref={node => this.audioEl = node}
                               onCanPlay={this.onCanPlay}
                               onPlay={this.onPlay}
                               onPause={this.onPause}
                               onTimeUpdate={this.onTimeUpdate}
                               onEnded={this.onEnded}
                               src={sources[0].source}>
                        </audio>

                    </div>
                    }
                </Collapse>
                {/*<Divider className={classes.divider}/>*/}
            </Paper>
        )
    }
}

export default withStyles(styles)(TrackListItem);