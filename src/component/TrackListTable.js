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
import Typography from '@material-ui/core/Typography/Typography';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import itemService from '../service/ItemService';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Select from '@material-ui/core/Select/Select';

const styles = theme => ({
  root: {},
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  titleCell: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: 0
  },
  playButton: {
    //padding: 16
    marginRight: theme.spacing.unit,
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
    editable: false,
    loadingTracks: [],
  };

  componentDidMount() {
    this.setState({tracks: this.props.tracks});
  }

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

  handleDownloadTrack = (track, idx) => {
    this.state.loadingTracks[track.link] = true;
    this.setState({loadingTracks: this.state.loadingTracks})
    itemService.getItemSources(track).then(sources => {
      this.state.tracks[idx].sources = sources;
      this.state.loadingTracks[track.link] = false;
      this.setState({tracks: this.state.tracks, loadingTracks: this.state.loadingTracks});
    })
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
    const {classes, tableTitle, editable} = this.props;
    const {selected, newPlaylistTitle, loadingTracks, tracks} = this.state;
    return tracks ? (
      <div className={classes.root}>
        {editable && <EnhancedTableToolbar numSelected={selected.length}
                                           toolbarDefaultText={tableTitle}
                                           onNewPlaylistClick={() => {
                                             this.setState({newPlaylistDialogOpen: true})
                                           }}
                                           onPlayAllClick={this.handlePlayAllClick}
                                           onPlaySelectedClick={this.handlePlaySelectedClick}
        />}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              editable={editable}
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
                    key={`key-track-in-table-${track._id}`}
                    selected={isSelected}
                  >
                    {editable &&
                    <TableCell>
                      <Checkbox checked={isSelected} onClick={event => this.handleClick(event, track)}/>
                    </TableCell>
                    }
                    <TableCell scope="row">
                      <div className={classes.titleCell}>
                        <IconButton onClick={event => this.playTrackClick(event, track, idx)}
                                    className={classes.playButton}>
                          <PlayArrowIcon/>
                        </IconButton>
                        <Typography>
                          {track.title}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {track.artist}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {track.duration}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {track.quality}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {(track.sources && track.sources.length) ? (
                        <Select
                          native
                          onChange={(e) => {e.target.value && window.open(e.target.value, '_newtab');}}
                        >
                          <option/>
                          {track.sources.map((s, sidx) => {
                            return <option value={s.source}
                                           key={`source-download-${sidx}`}>{s.quality}</option>
                          })}
                        </Select>
                      ) : (
                        <div>
                          {!loadingTracks[track.link] ?
                            (
                              <IconButton onClick={() => {
                                this.handleDownloadTrack(track, idx)
                              }}>
                                <DownloadIcon/>
                              </IconButton>
                            ) : (
                              <CircularProgress className={classes.progress}/>
                            )
                          }
                        </div>)}
                    </TableCell>
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
    ) : (
      <div/>
    );
  }
}

TrackListTable.propTypes = {};

export default withStyles(styles)(TrackListTable);
