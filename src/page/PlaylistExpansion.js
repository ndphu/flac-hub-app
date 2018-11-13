import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import LibraryMusic from '@material-ui/icons/LibraryMusic'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  playlistList: {
    width: '100%'
  }
});

class PlaylistExpansion extends React.Component {

  render() {
    const {playlist, classes} = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
          <ListItem dense={true}>
            <ListItemIcon>
              <LibraryMusic/>
            </ListItemIcon>
            <ListItemText primary={playlist.title} secondary={`${playlist.tracks.length} Items`}/>
          </ListItem>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List disablePadding className={classes.playlistList}>
            {playlist.tracks && playlist.tracks.map((track, i) => {
              return (
                <ListItem key={`key-track-in-playlist-${playlist._id}-${i}`}
                          button
                          className={classes.nested}>
                  <ListItemText primary={track.title} secondary={track.artist}/>
                </ListItem>
              )
            })}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(PlaylistExpansion)