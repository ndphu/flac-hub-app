import React from 'react';
import Button from '@material-ui/core/Button/Button';
import AddToPlaylistDialog from '../page/AddToPlaylistDialog';
import Track from '../component/Track';
import withStyles from '@material-ui/core/styles/withStyles';
import loader from '../component/Loader';
import playlistService from '../service/PlaylistService';
import itemService from '../service/ItemService';

const styles = theme => {};

class SearchResultList extends React.Component {

  state = {open: false};

  handleItemClick = (item) => {
    loader.show();
    itemService.getItemSources(item).then(sources => {
      item.sources = sources;
      this.setState({});
      loader.hide()
    });
  };

  handleItemSelected = (item) => {
    item.selected = !item.selected;
    this.setState({})
  };

  handleSelectAll = () => {
    this.props.tracks.forEach((t) => {
      t.selected = true;
    });
    this.setState({})
  };

  onLoadMoreClick = () => {
    this.searchArtist(this.state.query, this.state.page + 1);
  };

  checkAnyItemSelected = () => {
    return this.props.tracks && this.props.tracks.findIndex((t) => {
      return t.selected;
    }) >= 0;
  };

  handleAddToPlaylistClick = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({open: false});
  };

  handleCreateNewPlaylist = newPlaylist => {
    const playlist = {
      title: newPlaylist.title,
      shared: newPlaylist.shared,
      tracks: this.props.tracks.filter(track => track.selected === true)
    };
    loader.show();
    playlistService.createPlaylist(playlist).then(created => {
      console.log(created);
      loader.hide();
    })
  };

  render = () => {
    const {tracks, hasMore, onLoadMoreClick} = this.props;
    return (
      <div>
        <div className={'c-toolbar-container'}>
          <Button variant={'contained'} onClick={this.handleSelectAll}>Select All</Button>
          <Button variant="contained" color='primary' disabled={!this.checkAnyItemSelected()}
                  onClick={this.handleAddToPlaylistClick}>
            Add To Playlist
          </Button>
          <AddToPlaylistDialog
            open={this.state.open}
            onCreateNewPlaylist={this.handleCreateNewPlaylist}
            onClose={this.handleClose}
          />
        </div>
        {tracks.map((track, i) => {
          return <Track
            onItemClick={this.handleItemClick}
            onItemSelected={this.handleItemSelected}
            key={`track-${track.link}-${i}`}
            item={track}
          />
        })}
        {hasMore &&
        <Button primary={true}
                variant={'contained'}
                label={'MORE'}
                style={{marginTop: 16, marginBottom: 16}}
                onClick={onLoadMoreClick}/>
        }
      </div>
    )
  }
}


export default withStyles(styles)(SearchResultList);

