import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import PropTypes from "prop-types";
import TrackListItem from "./TrackListItem";
import playService from '../service/PlayService';
import trackService from '../service/TrackService';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Dialog from '@material-ui/core/Dialog/Dialog';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
});

class TrackList extends React.Component {
  state = {enableCheckable: false, openDialog: false};

  switchCheckable = () => {
    this.setState({enableCheckable: !this.state.enableCheckable})
  };

  handleTrackClick = (track, i) => {
    if (this.props.playlist) {
      playService.playTrackInPlaylist(this.props.playlist, i)
    } else {
      playService.playTrack(track);
    }
  };

  handleDownloadClick = (track) => {
    track.loading = true;
    trackService.getItemSources(track).then(sources => {
      track.loading = false;
      this.setState({sources: sources, openDialog: true})
    })

  };

  handleDownloadSource = (source) => {
    this.setState({openDialog: false}, function () {
      window.open(source.source, '_newtab');
    });
  };

  handleDialogClose = () => {
    this.setState({openDialog: false});
  };

  handleAddClick = () => {
    this.setState({enableCheckable: true})
  };

  render = () => {
    const {tracks, classes} = this.props;
    const {enableCheckable, sources, openDialog} = this.state;
    return (
      <div>
        <List>
          {tracks.length > 0 && tracks.map((track, i) =>
            <TrackListItem track={track}
                           checkable={enableCheckable}
                           key={`key-track-list-item-${i}`}
                           onTrackClick={() => {this.handleTrackClick(track, i);}}
                           onDownloadClick={this.handleDownloadClick}
            />)
          }
        </List>
        <Dialog aria-labelledby="download-dialog-title"
                open={openDialog}
                onClose={this.handleDialogClose}
                fullWidth
        >
          <DialogTitle id="download-dialog-title">Select Quality</DialogTitle>
          <div>
            <List>
              {sources && sources.map(source => (
                <ListItem button onClick={()=>{this.handleDownloadSource(source);}} key={source.source}>
                  <ListItemText primary={source.quality} />
                </ListItem>
              ))}
            </List>
          </div>
        </Dialog>
      </div>
    )
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
};


export default withStyles(styles)(TrackList);