import {RaisedButton} from 'material-ui';
import {TextField} from 'material-ui';
import React from 'react';
import Track from '../component/Track';
import itemService from '../service/ItemService';
import navigationService from '../service/NavigationService';
import searchService from '../service/SearchService';
import loader from '../component/Loader';
import Button from '@material-ui/core/Button/Button';
import {blue500} from 'material-ui/styles/colors';
import AddToPlaylistDialog from './AddToPlaylistDialog';

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
    this.setState({ open: false });
  };

  render = () => {
    return (
      <div>
        <TextField hintText={'Artist Name'}
                   defaultValue={this.state.query}
                   onKeyPress={this.onKeyPress}/>
        {this.state.query && <h3>Search result for <span style={{color: 'crimson'}}>{this.state.query}</span></h3>}
        {this.state.tracks.length > 0 &&
        <div className={'c-toolbar-container'}>
          <Button variant={'contained'} onClick={this.handleSelectAll}>Select All</Button>
          <Button variant="contained" color='primary' disabled={!this.checkAnyItemSelected()}
            onClick={this.handleAddToPlaylistClick}>
            Add To Playlist
          </Button>
          <AddToPlaylistDialog
            open={this.state.open}
            onClose={this.handleClose}
          />
        </div>}
        {this.state.tracks.map((track, i) => {
          return <Track
            onItemClick={this.handleItemClick}
            onItemSelected={this.handleItemSelected}
            key={`track-${track.link}-${i}`}
            item={track}
          />
        })}
        {this.state.hasMore &&
        <RaisedButton primary={true}
                      label={'MORE'}
                      style={{marginTop: 16, marginBottom: 16}}
                      onClick={this.onLoadMoreClick}/>
        }
      </div>
    )
  }
}

export default SearchByArtistPage;