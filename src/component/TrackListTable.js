import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table/Table';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import EnhancedTableToolbar from './table/TableToolbarExt';
import EnhancedTableHead from './table/TableHeadExt';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import loader from './Loader';
import playlistService from '../service/PlaylistService';
import IconButton from '@material-ui/core/IconButton/IconButton';
import playService from '../service/PlayService';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  root: {},
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const rows = [
  {id: 'title', label: 'Title'},
  {id: 'artist', label: 'Artist'},
  {id: 'duration', label: 'Duration'},
  {id: 'quality', label: 'Best Quality'},
  {id: 'download', label: 'Download'},
];


class TrackListTable extends React.Component {
  state = {
    selected: [],
    page: 0,
    newPlaylistDialogOpen: false,

  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState({selected: this.props.tracks.map(n => n)});
      return;
    }
    this.setState({selected: []});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleNewPlaylistDialogClose = () => {
    this.setState({newPlaylistDialogOpen: false});
  };

  handleSubmitNewPlaylist = () => {
    this.setState({newPlaylistDialogOpen: false});
    const playlist = {
      title: this.state.newPlaylistTitle,
      shared: "shared",
      tracks: this.state.selected,
    };
    loader.show();
    playlistService.createPlaylist(playlist).then(created => {
      console.log(created);
      loader.hide();
    })
  };

  handlePlayAllClick = () => {

  };

  handlePlaySelectedClick = () => {

  };

  playTrackClick = (e, track, index) => {
    if (this.props.playlist) {
      playService.playTrackInPlaylist(this.props.playlist, index);
    } else {
      playService.playTrack(track);
    }
  };

  handlePlaylistNameKeyUp = (e) => {
    e.target.setAttribute('maxlength', 32);
    const text = e.target.value.trim();
    this.setState({newPlaylistTitle: text});
    if (e.key === 'Enter' && text) {
      this.handleSubmitNewPlaylist();
    }
  };

  render = () => {
    const {classes, tracks, tableTitle} = this.props;
    const {selected, newPlaylistTitle} = this.state;
    return (
      <div className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length}
                              toolbarDefaultText={tableTitle}
                              onNewPlaylistClick={() => {
                                this.setState({newPlaylistDialogOpen: true})
                              }}
                              onPlayAllClick={this.handlePlayAllClick}
                              onPlaySelectedClick={this.handlePlaySelectedClick}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={tracks.length}
              columns={rows}
              toolbarDefaultText={tableTitle}
            />
            <TableBody>
              {tracks.map((track, idx) => {
                const isSelected = this.isSelected(track);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={`key-track-in-table-${idx}`}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Checkbox checked={isSelected} onClick={event => this.handleClick(event, track)}/>
                      <IconButton onClick={event => this.playTrackClick(event, track, idx)}>
                        <PlayArrowIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {track.title}
                    </TableCell>
                    <TableCell>{track.artist}</TableCell>
                    <TableCell>{track.duration}</TableCell>
                    <TableCell>{track.quality}</TableCell>
                    <TableCell>{track.download}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog
            open={this.state.newPlaylistDialogOpen}
            onClose={this.handleNewPlaylistDialogClose}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">New Playlist</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the Playlist name
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                onKeyUp={this.handlePlaylistNameKeyUp}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleNewPlaylistDialogClose} color="default">
                Cancel
              </Button>
              <Button onClick={this.handleSubmitNewPlaylist} color="primary"
                      disabled={!newPlaylistTitle}>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

TrackListTable.propTypes = {
  tableTitle: PropTypes.string.isRequired,
};

export default withStyles(styles)(TrackListTable);
