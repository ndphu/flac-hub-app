import React from 'react';
import Track from '../component/Track';
import itemService from '../service/ItemService';
import navigationService from '../service/NavigationService';
import searchService from '../service/SearchService';
import loader from '../component/Loader';
import Button from '@material-ui/core/Button/Button';
import AddToPlaylistDialog from './AddToPlaylistDialog';
import playlistService from "../service/PlaylistService";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import TrackList from "../component/TrackList";
import TrackListTable from '../component/TrackListTable';
import Hidden from '@material-ui/core/Hidden/Hidden';

const styles = theme => ({});

class SearchByArtistPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      query: '',
      page: 1,
      hasMore: false,
    };
    this.handleItemClick.bind(this);
    this.onLoadMoreClick.bind(this);
  }

  componentDidMount = () => {
    const query = this.props.match.params.query;
    if (query) {
      this.searchArtist(decodeURIComponent(query), 1);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = nextProps.match.params.query;
    if (nextQuery && decodeURIComponent(nextQuery) !== this.state.query) {
      this.searchArtist(nextQuery, 1);
    }
  };

  onKeyPress = (e) => {
    e.target.setAttribute('maxlength', 128);
    const query = e.target.value.trim();
    if (e.key === 'Enter' && query) {
      navigationService.goToArtistSearch(query);
    }
  };


  searchArtist = (query, page) => {
    loader.show();
    if (page === 1) {
      this.setState({
        tracks: [],
        hasMore: false,
      })
    }
    searchService.searchByArtist(query, page).then(result => {
      this.setState({
        tracks: this.state.tracks.concat(result),
        query: query,
        page: page,
        hasMore: result.length >= 25,
      });
      loader.hide();
    });
  };

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
    this.state.tracks.forEach((t) => {
      t.selected = true;
    });
    this.setState({})
  };

  onLoadMoreClick = () => {
    this.searchArtist(this.state.query, this.state.page + 1);
  };

  checkAnyItemSelected = () => {
    return this.state.tracks && this.state.tracks.findIndex((t) => {
      return t.selected;
    }) >= 0;
  };

  handleAddToPlaylistClick = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    console.log(value);
    this.setState({open: false});
  };

  handleCreateNewPlaylist = newPlaylist => {
    const playlist = {
      title: newPlaylist.title,
      shared: newPlaylist.shared,
      tracks: this.state.tracks.filter(track => track.selected === true)
    };
    loader.show();
    playlistService.createPlaylist(playlist).then(created => {
      console.log(created);
      loader.hide();
    })
  };

  render = () => {
    const {tracks} = this.state;

    return (
      <div>
        <TextField placeholder={'Artist Name'}
                   defaultValue={this.state.query}
                   onKeyPress={this.onKeyPress}/>
        <Hidden smUp implementation="css">
          <TrackList tracks={tracks}/>
        </Hidden>
        <Hidden xsDown implementation="css">
          <TrackListTable tracks={tracks}
                          tableTitle={`Search result for ${this.state.query}`}/>
        </Hidden>
        {this.state.hasMore &&
        <Button variant={'contained'}
                style={{marginTop: 16, marginBottom: 16}}
                onClick={this.onLoadMoreClick}>More</Button>
        }
      </div>
    )
  }
}

export default withStyles(styles)(SearchByArtistPage);