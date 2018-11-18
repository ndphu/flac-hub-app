import React from 'react';
import searchService from '../service/SearchService';
import loader from '../component/Loader';
import itemService from '../service/ItemService';
import Hidden from '@material-ui/core/Hidden/Hidden';
import TrackList from '../component/TrackList';
import TrackListTable from '../component/TrackListTable';
import Button from '@material-ui/core/Button/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Paper from '@material-ui/core/Paper/Paper';
import Divider from '@material-ui/core/Divider/Divider';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

const searchTypes = ['all', 'artist', 'album'];
const searchFunctions = {
  'all': searchService.search,
  'artist': searchService.searchByArtist,
  'album': searchService.searchByAlbum,
};


class SearchPage extends React.Component {

  state = {
    tracks: {},
    query: '',
    page: {},
    hasMore: false,
    idx: 0,
    searchType: 'all',
    initialized: {},
  };

  componentDidMount = () => {
    const query = decodeURIComponent(this.props.match.params.query);
    this.search(query, 1, 'all');
  };

  componentWillReceiveProps = (nextProps) => {
    const nextQuery = decodeURIComponent(nextProps.match.params.query);
    if (this.state.query && this.state.query !== nextQuery) {
      this.search(nextQuery, 1, this.state.searchType);
    }
  };

  onLoadMoreClick = () => {
    this.search(this.state.query,
      this.state.page[this.state.searchType] + 1,
      this.state.searchType);
  };

  search = (query, page, searchType) => {
    console.log("search", query, page, searchType);
    if (!searchType) {
      return;
    }
    loader.show();
    if (this.state.query && this.state.query !== query) {
      // clear current search result
      this.setState({
        tracks: {},
        initialized: {},
      });
    }
    searchFunctions[searchType](query, page).then((result) => {
      if (this.state.tracks[searchType]) {
        this.state.tracks[searchType] = this.state.tracks[searchType].concat(result);
      } else {
        this.state.tracks[searchType] = result;
      }
      this.state.initialized[searchType] = true;
      this.state.page[searchType] = page;
      this.setState({
        query: query,
        tracks: this.state.tracks,
        page: this.state.page,
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

  handleTabChange = (event, idx) => {
    const searchType = searchTypes[idx];
    this.setState({searchType, idx});
    if (!this.state.initialized[searchType]) {
      this.search(this.state.query, this.state.page[searchType] ? this.state.page[searchType] : 1, searchType)
    }
  };


  render = () => {
    const {tracks, hasMore, searchType, idx} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={idx}
            onChange={this.handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label={'All'}/>
            <Tab label={'Artist'}/>
            {/*<Tab label={'Album'}/>*/}
          </Tabs>
          <Divider/>

          {tracks[searchType] && tracks[searchType].length > 0 &&
          <div>
            <div hidden={searchType !== 'all'}>
              <Hidden smUp implementation="css">
                <TrackList tracks={tracks[searchType]}/>
              </Hidden>
              <Hidden xsDown implementation="css">
                <TrackListTable tracks={tracks[searchType]}
                                tableTitle={`Search result for ${this.state.query}`}
                                editable={true}/>
              </Hidden>
            </div>
            <div hidden={searchType !== 'artist'}>
              <Hidden smUp implementation="css">
                <TrackList tracks={tracks[searchType]}/>
              </Hidden>
              <Hidden xsDown implementation="css">
                <TrackListTable tracks={tracks[searchType]}
                                tableTitle={`Search result for ${this.state.query}`}
                                editable={true}/>
              </Hidden>
            </div>
          </div>
          }

        </Paper>
        {hasMore &&
        <Button variant={'contained'}
                style={{marginTop: 16, marginBottom: 16}}
                onClick={this.onLoadMoreClick}>More</Button>
        }</div>
    )
  }
}


export default withStyles(styles)(SearchPage);