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
import Divider from '@material-ui/core/Divider/Divider';


const styles = theme => ({
  root: {
    justifyContent: 'space-around',
    overflow: 'hidden',
  }
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
    playlistService.getPlaylists().then((playlists) => {
      this.setState({playlists: playlists})
    })
  };

  handlePlaylistCardClick = (playlist) => {
    navigationService.goToPlaylist(playlist._id);
  };

  render = () => {
    const {classes} = this.props;
    const {playlists} = this.state;
    return (
      <div className={classes.root}>
        {playlists && playlists.length > 0 && (
          <div>
            <Hidden implementation={'css'} smDown>
              <GridList cellHeight={145} className={classes.gridList} cols={6}>
                {playlists.map(playlist => (
                  <GridListTile key={`key-${playlist._id}`} cols={1}>
                    <PlaylistCard playlist={playlist} onPlaylistCardClick={this.handlePlaylistCardClick}/>
                  </GridListTile>
                ))}
              </GridList>
            </Hidden>
            <Hidden implementation={'css'} smUp>
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