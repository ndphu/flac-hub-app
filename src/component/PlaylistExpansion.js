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
import TrackListTable from './TrackListTable';
import Typography from '@material-ui/core/Typography/Typography';
import Hidden from '@material-ui/core/Hidden/Hidden';
import TrackList from './TrackList';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  playlistList: {
    width: '100%'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class PlaylistExpansion extends React.Component {

  render() {
    const {playlist, classes} = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
          <Typography variant="body1">
            {playlist.title}
          </Typography>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Hidden smUp implementation="css">
            <TrackList tracks={playlist.tracks}/>
          </Hidden>
          <Hidden xsDown implementation="css">
            <div>
              <TrackListTable tracks={playlist.tracks}
                              playlist={playlist}
              />
            </div>
          </Hidden>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(PlaylistExpansion)