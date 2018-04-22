import React from 'react';
import searchService from '../service/SearchService';
import loader from '../component/Loader';
import Track from '../component/Track';
import itemService from './ItemService';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      query: '',
      page: 1,
    }
  }

  componentDidMount = () => {
    const query = this.props.match.params.query;
    const page = this.props.match.params.page;
    this.search(query, page);
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = nextProps.match.params.query;
    const nextPage = nextProps.match.params.page;

    if (this.state.query !== nextQuery || this.state.page !== nextPage) {
      this.search(nextQuery, nextPage);
    }
  };

  search = (query, page) => {
    loader.show();
    searchService.search(query, page).then((result) => {
      this.setState({
        tracks: result,
        query: query,
        page: page,
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
        {this.state.tracks.map(track => {
          return <Track
            onItemClick={this.handleItemClick}
            key={'track-' + track.link}
            item={track}
          />
        })}
      </div>
    )
  }
}


export default SearchPage;