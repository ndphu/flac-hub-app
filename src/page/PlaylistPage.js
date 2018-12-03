import React from 'react';
import playlistService from '../service/PlaylistService';
import PlaylistCard from '../component/playlist/PlaylistCard';
import GridList from '@material-ui/core/GridList/GridList';
import withStyles from '@material-ui/core/styles/withStyles';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';
import navigationService from '../service/NavigationService';
import Hidden from '@material-ui/core/Hidden/Hidden';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Paper from '@material-ui/core/Paper/Paper';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class PlaylistPage extends React.Component {
  state = {
    playlists: []
  };

  componentDidMount = () => {
    this.loadPlaylist();
  };

  componentWillReceiveProps = (nextProps) => {
    const selectedId = nextProps.match.params.id;
    this.setState({selectedId: selectedId})
  };

  loadPlaylist = () => {
    this.setState({loading: true});
    playlistService.getPlaylists().then((playlists) => {
      this.setState({playlists: playlists, loading: false})
    })
  };

  handlePlaylistCardClick = (playlist) => {
    navigationService.goToPlaylist(playlist._id);
  };

  render = () => {
    const {classes} = this.props;
    const {playlists, loading} = this.state;
    return (
      <div className={classes.root}>
        {loading && <LinearProgress/>}
        {playlists && playlists.length > 0 && (
          <div>
            <Hidden implementation={'css'} only={['sm', 'xs']}>
              <GridList cellHeight={136} className={classes.gridList} cols={5}>
                {playlists.map(playlist => (
                  <GridListTile key={`key-${playlist._id}`} cols={1}>
                    <PlaylistCard playlist={playlist} onPlaylistCardClick={this.handlePlaylistCardClick}/>
                  </GridListTile>
                ))}
              </GridList>
            </Hidden>
            <Hidden implementation={'css'} only={['lg','xl', 'md']}>
              <Paper>
                <List >
                  {playlists.map(playlist => (
                    <ListItem key={`key-${playlist._id}`}
                              button
                              onClick={() => {this.handlePlaylistCardClick(playlist);}}
                              divider>
                      <ListItemText primary={playlist.title} secondary={`${playlist.tracks.length} tracks`}/>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Hidden>
          </div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(PlaylistPage);