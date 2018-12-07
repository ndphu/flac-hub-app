import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import albumService from '../service/AlbumService';
import TrackListTable from '../component/TrackListTable';
import Paper from '@material-ui/core/Paper/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit
  }
});

class AlbumDetailsPage extends React.Component {
  state = {};

  componentDidMount = () => {
    this.loadAlbum(this.props.match.params.id)
  };

  loadAlbum(id) {
    albumService.getAlbum(id).then((album) => {
      this.setState({album: album})
    })
  }

  render = () => {
    const {classes} = this.props;
    const {album} = this.state;
    return (
      <div className={classes.root}>

        {album && album.trackList &&
        <Paper className={classes.paper}>
          <TrackListTable tracks={album.trackList}/>
        </Paper>
        }
      </div>
    );
  }
}

AlbumDetailsPage.PropTypes = {};

export default withStyles(styles)(AlbumDetailsPage);
