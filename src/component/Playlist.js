import React from 'react';

import {Paper} from 'material-ui';


function onPlaylistClick(playlist) {
  alert("Click on " + playlist.id)
}

class Playlist extends React.Component {
  render() {
    const playlist = this.props.playlist;
    return (
      <Paper className={'c-playlist-container'}>
        <span onClick={() => {
          onPlaylistClick(playlist)
        }}
              className={'c-playlist-title'}>
          {playlist.title}
        </span>
      </Paper>
    );
  }
}

export default Playlist