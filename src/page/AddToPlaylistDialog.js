import React from 'react';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '@material-ui/core/List/List';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Album from '@material-ui/icons/PlaylistPlay';
import AddIcon from '@material-ui/icons/PlaylistAdd';

class AddToPlaylistDialog extends React.Component {

  state = {playlist:[]};

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  addNewPlaylist = () => {

  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Select Playlist</DialogTitle>
        <div>
          <List>
            {this.state.playlists && this.state.playlists.map(playlist => (
              <ListItem button onClick={() => this.handleListItemClick(playlist)} key={playlist._id}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <Album />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={playlist.title} />
              </ListItem>
            ))}
            <ListItem button onClick={() => this.addNewPlaylist()}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="New Playlist" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

export default AddToPlaylistDialog;