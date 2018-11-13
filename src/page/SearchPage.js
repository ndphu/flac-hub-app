import React from 'react';
import searchService from '../service/SearchService';
import loader from '../component/Loader';
import itemService from '../service/ItemService';
import SearchResultList from '../layout/SearchResultList';

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
      item.sources = sources;
      this.setState({});
      loader.hide()
    });
  };


  render = () => {
    return (
      <div>
        <h5>Search result for <span style={{color: 'crimson'}}>{this.state.query}</span></h5>
        <SearchResultList tracks={this.state.tracks}
                          hasMore={this.state.hasMore}
                          onLoadMoreClick={this.onLoadMoreClick}
        />
      </div>
    )
  }
}


export default SearchPage;