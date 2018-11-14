import React from "react";
import PropTypes from 'prop-types';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import MusicNodeIcon from '@material-ui/icons/MusicNote';

const styles = theme => {
};

class TrackListItem extends React.Component {
  render = () => {
    const {track, checkable, onDownloadClick, onTrackClick} = this.props;

    return (
      <ListItem button onClick={() => {onTrackClick(track)}} divider>
        <ListItemText primary={track.title} secondary={track.artist}/>
        <ListItemSecondaryAction>
          {!checkable &&
          <IconButton onClick={() => {onDownloadClick(track)}}>
            <DownloadIcon />
          </IconButton>
          }
          {checkable &&
          <Checkbox
            checked={track.selected}
            tabIndex={-1}
          />
          }
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

TrackListItem.propTypes = {
  checkable: PropTypes.bool,
};

export default withStyles(styles)(TrackListItem)