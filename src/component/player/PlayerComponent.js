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
  },

  controls: {
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },

  playIcon: {
    height: 44,
    width: 44,
  },
  spacer: {
    flex: '1 1 100%',
  },
  slider: {
    paddingLeft: 4
  }
});

class PlayerComponent extends React.Component {
  audioEl = null;
  seeking = false;
  state = {
    isPlaying: false,
    seekerValue: 0,
    duration: 9999,
  };

  constructor(props) {
    super(props);
    playService.setPlayer(this);
  }

  playTrack = (track) => {
    const _this = this;
    this.setState({currentTrack: track, isPlaying: false, seekerValue: 0, duration: 9999}, function () {
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


  onPlayClick = () => {
    if (this.state.isPlaying) {
      this.audioEl.pause();
    } else {
      this.audioEl.play();
    }
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
    const {isPlaying, seekerValue, duration, currentTrack} = this.state;
    console.log(currentTrack);
    return (
      <div>
        {currentTrack && <Slider
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
                  <Typography component="h6" variant="h5">
                    {currentTrack ? currentTrack.title : 'No Track To Play'}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {currentTrack ? currentTrack.artist : 'Please select a track to play'}
                  </Typography>
                </div>
              </div>
            </GridListTile>
            <GridListTile cols={1}>
              <div className={classes.controls}>
                <IconButton aria-label="Previous">
                  <SkipPreviousIcon className={classes.skipIcon}/>
                </IconButton>
                <IconButton aria-label="Play/pause" onClick={this.onPlayClick}>
                  {!isPlaying && <PlayArrowIcon className={classes.playIcon}/>}
                  {isPlaying && <PauseIcon className={classes.playIcon}/>}
                </IconButton>
                <IconButton aria-label="Next">
                  <SkipNextIcon className={classes.skipIcon}/>
                </IconButton>
              </div>
            </GridListTile>
            <GridListTile cols={1}>

            </GridListTile>
          </GridList>
        </div>
        <audio autoPlay={false}
               ref={node => this.audioEl = node}
               onCanPlay={this.onCanPlay}
               onPlay={this.onPlay}
               onPause={this.onPause}
               onTimeUpdate={this.onTimeUpdate}
        >
          {currentTrack && <source
            src={currentTrack.sources[0].source}
            type={'audio/mp3'}
          />}
        </audio>
      </div>
    );
  }
}

PlayerComponent.PropTypes = {};

export default withStyles(styles)(PlayerComponent);
