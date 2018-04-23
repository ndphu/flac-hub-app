import {RaisedButton} from 'material-ui';
import {TextField} from 'material-ui';
import React from 'react';
import Track from '../component/Track';
import itemService from '../service/ItemService';
import navigationService from '../service/NavigationService';
import searchService from '../service/SearchService';
import loader from '../component/Loader';

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
      const index = this.state.tracks.map(track => track.link).indexOf(item.link);
      const tracks = this.state.tracks.slice();
      tracks[index].sources = sources;
      this.setState({
        tracks: tracks
      });
      loader.hide()
    });
  };
  
  onLoadMoreClick = () => {
    this.searchArtist(this.state.query, this.state.page + 1);
  };
  
  render = () => {
    return (
      <div>
        <TextField hintText={'Artist Name'}
                   defaultValue={this.state.query}
                   onKeyPress={this.onKeyPress}/>
        {this.state.query && <h3>Search result for <span style={{color: 'crimson'}}>{this.state.query}</span></h3>}
        {this.state.tracks.map(track => {
          return <Track
            onItemClick={this.handleItemClick}
            key={'track-' + track.link}
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