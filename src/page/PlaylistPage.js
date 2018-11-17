import React from 'react';
import playlistService from '../service/PlaylistService';
import PlaylistCard from '../component/playlist/PlaylistCard';
import GridList from '@material-ui/core/GridList/GridList';
import withStyles from '@material-ui/core/styles/withStyles';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';
import navigationService from '../service/NavigationService';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import CardActions from '@material-ui/core/CardActions/CardActions';
import Button from '@material-ui/core/Button/Button';


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
          <GridList cellHeight={145} className={classes.gridList} cols={6}>
            {playlists.map(playlist => (
              <GridListTile key={`key-${playlist._id}`} cols={1}>
                <PlaylistCard playlist={playlist} onPlaylistCardClick={this.handlePlaylistCardClick}/>
              </GridListTile>
            ))}
          </GridList>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(PlaylistPage);