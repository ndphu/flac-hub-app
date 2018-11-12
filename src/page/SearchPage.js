import {RaisedButton} from 'material-ui';
import React from 'react';
import searchService from '../service/SearchService';
import loader from '../component/Loader';
import Track from '../component/Track';
import itemService from '../service/ItemService';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      query: '',
      page: 1,
      hasMore: false,
    };
    this.onLoadMoreClick.bind(this);
  }
  
  componentDidMount = () => {
    const query = decodeURIComponent(this.props.match.params.query);
    this.search(query, 1);
  };
  
  componentWillReceiveProps = (nextProps) => {
    const nextQuery = decodeURIComponent(nextProps.match.params.query);
    
    if (this.state.query !== nextQuery) {
      this.search(nextQuery, 1);
    }
  };
  
  onLoadMoreClick = () => {
    this.search(this.state.query, this.state.page + 1);
  };
  
  search = (query, page) => {
    loader.show();
    this.setState({
      query: query,
    });
    if (page === 1) {
      this.setState({
        tracks: [],
        hasMore: false,
      })
    }
    searchService.search(query, page).then((result) => {
      this.setState({
        tracks: this.state.tracks.concat(result),
        query: query,
        page: page,
        hasMore: result.length >= 25,
      });
      loader.hide();
    })
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
  
  
  render = () => {
    return (
      <div>
        <h3>Search result for <span style={{color: 'crimson'}}>{this.state.query}</span></h3>
        {this.state.tracks.map((track, i) => {
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


export default SearchPage;