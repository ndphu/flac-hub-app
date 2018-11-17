import React from 'react';
import playlistService from '../service/PlaylistService';
import PlaylistCard from '../component/playlist/PlaylistCard';
import GridList from '@material-ui/core/GridList/GridList';
import withStyles from '@material-ui/core/styles/withStyles';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';
import navigationService from '../service/NavigationService';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
});

class PlaylistPage extends React.Component {
  state = {};

  componentDidMount = () => {
    this.loadPlaylist();
  };

  componentWillReceiveProps = (nextProps) => {
    const selectedId = nextProps.match.params.id;
    console.log(nextProps);
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
        <GridList cols={6} cellHeight={145} spacing={4}>
          {playlists && playlists.map((playlist, i) => {
            return (
              <GridListTile key={`${playlist._id}`}>
                <PlaylistCard playlist={playlist}
                              onPlaylistCardClick={this.handlePlaylistCardClick}
                />
              </GridListTile>
            )
          })}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(PlaylistPage);