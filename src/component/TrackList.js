import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import PropTypes from "prop-types";
import TrackListItem from "./TrackListItem";
import Button from '@material-ui/core/Button/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
});

class TrackList extends React.Component {
  state = {enableCheckable: false};

  switchCheckable = () => {
    this.setState({enableCheckable: !this.state.enableCheckable})
  };

  handleTrackClick = (track) => {
    console.log(track)

  };

  handleDownloadClick = (track) => {
    console.log(track)
  };

  handleAddClick = () => {
    this.setState({enableCheckable: true})
  };

  render = () => {
    const {tracks, classes} = this.props;
    const {enableCheckable} = this.state;
    return (
      <div>
        <List>
          {tracks.length > 0 && tracks.map((track, i) =>
            <TrackListItem track={track}
                           checkable={enableCheckable}
                           key={`key-track-list-item-${i}`}
                           onTrackClick={this.handleTrackClick}
                           onDownloadClick={this.handleDownloadClick}
            />)
          }
        </List>
        {!enableCheckable &&
        <Button variant="fab" className={classes.fab} color={'primary'}
                onClick={this.handleAddClick}>
          <AddIcon/>
        </Button>}

      </div>
    )
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  checkable: PropTypes.bool.isRequired,
};


export default withStyles(styles)(TrackList);