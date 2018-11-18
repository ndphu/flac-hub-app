import React from 'react';
import playlistService from '../service/PlaylistService';
import withStyles from '@material-ui/core/styles/withStyles';
import TrackListTable from '../component/TrackListTable';
import Typography from '@material-ui/core/Typography/Typography';
import Hidden from '@material-ui/core/Hidden/Hidden';
import TrackList from '../component/TrackList';
import Paper from '@material-ui/core/Paper/Paper';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';


const styles = theme => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },

  card: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class PlaylistDetailsPage extends React.Component {
  state = {};

  componentDidMount = () => {
    this.loadPlaylist(this.props.match.params.id);
  };

  componentWillReceiveProps = (nextProps) => {
    const selectedId = nextProps.match.params.id;
    this.setState({selectedId: selectedId})
  };

  loadPlaylist = (id) => {
    this.setState({loading: true});
    playlistService.getPlaylist(id).then((playlist) => {
      this.setState({playlist: playlist, loading: false})
    })
  };

  render = () => {
    const {classes} = this.props;
    const {playlist, loading} = this.state;
    return (
      <div className={classes.root}>
        {loading && <LinearProgress/>}
        {playlist && (
          <div>
            <Hidden only={['sm', 'xs']} implementation={'css'}>
              <Paper className={classes.card} square>
                <Typography variant="title"
                            color={'primary'} >
                  {playlist.title}
                </Typography>
                <TrackListTable playlist={playlist} tracks={playlist.tracks}/>
              </Paper>
            </Hidden>
            <Hidden only={['lg', 'xl', 'md']} implementation={'css'}>
              <Paper square>
                <TrackList tracks={playlist.tracks} playlist={playlist}/>
              </Paper>
            </Hidden>
          </div>
        )
        }
      </div>
    )
  }
}

export default withStyles(styles)(PlaylistDetailsPage);