import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import IconButton from '@material-ui/core/IconButton/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Slider from '@material-ui/lab/Slider/Slider';
import GridList from '@material-ui/core/GridList/GridList';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';
import playService from '../../service/PlayService';
import Button from '@material-ui/core/Button/Button';
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import RepeatIcon from '@material-ui/icons/Repeat';
import Hidden from '@material-ui/core/Hidden/Hidden';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: theme.spacing.unit,
    margin: 6,
    [theme.breakpoints.down('md')]: {
      margin: 12,
    }
  },

  controls: {
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      alignItems: 'right',
      textAlign: 'right',
      marginTop: 12,
    }
  },

  additionalControls: {
    marginTop: 12,
    alignItems: 'right',
    textAlign: 'right',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },

  playIcon: {
    height: 42,
    width: 42,
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
    margin: theme.spacing.unit
  },

  skipIcon: {
    [theme.breakpoints.down('md')]: {
      height: 24,
      width: 24,
    }
  },

  spacer: {
    flex: '1 1 100%',
  },

  slider: {
    paddingLeft: 4
  },

  playButton: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      margin: 0
    }
  },
});

class PlayerComponent extends React.Component {
  audioEl = null;
  seeking = false;
  state = {
    isPlaying: false,
    seekerValue: 0,
    duration: 9999,
    repeatMode: 'all',
    shuffle: false,
  };

  constructor(props) {
    super(props);
    playService.setPlayer(this);
  }

  playTrack = (track) => {
    const _this = this;
    this.setState({track, isPlaying: false, seekerValue: 0, duration: 9999}, function () {
      _this.audioEl.pause();
      _this.audioEl.load();
      _this.audioEl.play();
    });
  };

  onCanPlay = () => {
    console.log('can play');
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
    if (playService.isLoopOne()) {
      this.audioEl.play();
    } else {
      playService.next();
    }
  };


  onPlayClick = () => {
    if (this.state.isPlaying) {
      this.audioEl.pause();
    } else {
      this.audioEl.play();
    }
  };

  handleToggleShuffle = () => {
    const nextShuffle = !this.state.shuffle;
    playService.setShuffle(nextShuffle);
    this.setState({shuffle: nextShuffle});
  };

  handleToggleRepeat = () => {
    let nextMode;
    if (this.state.repeatMode === 'one') {
      nextMode = 'none';
    } else if (this.state.repeatMode === 'all') {
      nextMode = 'one';
    } else if (this.state.repeatMode === 'none') {
      nextMode = 'all';
    }
    playService.setLoopMode(nextMode);
    this.setState({repeatMode: nextMode})
  };

  handleNextClick = () => {
    playService.next();
  };

  handlePreviousClick = () => {
    playService.prev();
  };

  handleSeekerChange = (event, value) => {
    this.setState({seekerValue: value});
  };

  handleSeekerDragStart = () => {
    this.seeking = true;
  };

  handleSeekerDragEnd = () => {
    this.seeking = false;
    this.audioEl.currentTime = this.state.seekerValue;
  };

  render = () => {
    const {classes, theme} = this.props;
    const {isPlaying, seekerValue, duration, track, repeatMode, shuffle} = this.state;
    return (
      <div>
        <Hidden only={['lg','xl', 'md']} implementation={'css'}>
          <GridList cols={2}>
            <GridListTile cols={1}>
              <div className={classes.details}>
                <div className={classes.content}>
                  <Typography variant="title" noWrap color={'primary'}>
                    {track ? track.title : 'No Track To Play'}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" noWrap>
                    {track ? track.artist : 'Please select a track to play'}
                  </Typography>
                </div>
              </div>
            </GridListTile>
            <GridListTile cols={1}>
              <div className={classes.controls}>
                <IconButton aria-label="Previous"
                            disabled={!track}
                            onClick={this.handlePreviousClick}
                >
                  <SkipPreviousIcon className={classes.skipIcon}/>
                </IconButton>
                <Button aria-label="Play/pause"
                        variant={'fab'}
                        color={'primary'}
                        className={classes.playButton}
                        onClick={this.onPlayClick}
                        disabled={!track}
                >
                  {!isPlaying && <PlayArrowIcon/>}
                  {isPlaying && <PauseIcon/>}
                </Button>
                <IconButton aria-label="Next"
                            disabled={!track}
                            onClick={this.handleNextClick}
                >
                  <SkipNextIcon className={classes.skipIcon}/>
                </IconButton>
              </div>
            </GridListTile>
          </GridList>
        </Hidden>

        <Hidden only={['sm','xs']} implementation={'css'}>
          {track && <Slider
            classes={{container: classes.slider}}
            aria-labelledby="label"
            value={seekerValue}
            min={0}
            max={duration}
            onChange={this.handleSeekerChange}
            onDragEnd={this.handleSeekerDragEnd}
            onDragStart={this.handleSeekerDragStart}
          />
          }
          <div className={classes.container}>
            <GridList cols={3}>
              <GridListTile cols={1}>
                <div className={classes.details}>
                  <div className={classes.content}>
                    <Typography variant="title" noWrap color={'primary'}>
                      {track ? track.title : 'No Track To Play'}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" noWrap>
                      {track ? track.artist : 'Please select a track to play'}
                    </Typography>
                  </div>
                </div>
              </GridListTile>
              <GridListTile cols={1}>
                <div className={classes.controls}>
                  <IconButton aria-label="Previous"
                              disabled={!track}
                              onClick={this.handlePreviousClick}
                  >
                    <SkipPreviousIcon className={classes.skipIcon}/>
                  </IconButton>
                  <Button aria-label="Play/pause"
                          variant={'fab'}
                          color={'primary'}
                          className={classes.playButton}
                          onClick={this.onPlayClick}
                          disabled={!track}
                  >
                    {!isPlaying && <PlayArrowIcon className={classes.playIcon}/>}
                    {isPlaying && <PauseIcon className={classes.playIcon}/>}
                  </Button>
                  <IconButton aria-label="Next"
                              disabled={!track}
                              onClick={this.handleNextClick}
                  >
                    <SkipNextIcon className={classes.skipIcon}/>
                  </IconButton>
                </div>
              </GridListTile>
              <GridListTile cols={1}>
                <div className={classes.additionalControls}>
                  {repeatMode === 'one' ?
                    <IconButton aria-label="Repeat One"
                                disabled={!track}
                                color={'secondary'}
                                onClick={this.handleToggleRepeat}
                    >
                      <RepeatOneIcon/>
                    </IconButton> :
                    <IconButton aria-label="Repeat All"
                                disabled={!track}
                                color={repeatMode === 'all' ? 'secondary' : 'default'}
                                onClick={this.handleToggleRepeat}>
                      <RepeatIcon/>
                    </IconButton>
                  }
                  <IconButton aria-label="Shuffle"
                              disabled={!track}
                              onClick={this.handleToggleShuffle}
                              color={shuffle ? 'secondary' : 'default'}>
                    <ShuffleIcon/>
                  </IconButton>
                  <IconButton aria-label="Current Queue"
                              disabled={!track}>
                    <QueueMusicIcon/>
                  </IconButton>
                  <IconButton aria-label="Download"
                              disabled={!track}>
                    <DownloadIcon/>
                  </IconButton>
                </div>
              </GridListTile>
            </GridList>
          </div>
        </Hidden>

        <audio autoPlay={false}
               ref={node => this.audioEl = node}
               onCanPlay={this.onCanPlay}
               onPlay={this.onPlay}
               onPause={this.onPause}
               onTimeUpdate={this.onTimeUpdate}
               onEnded={this.onEnded}
        >
          {track && <source
            src={track.sources[0].source}
            type={'audio/mp3'}
          />}
        </audio>
      </div>
    );
  }
}

PlayerComponent.PropTypes = {};

export default withStyles(styles)(PlayerComponent);
