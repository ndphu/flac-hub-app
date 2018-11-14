import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import PropTypes from "prop-types";


const styles = theme => {};

class TrackListItem extends React.Component {
    render = () => {
        const {track, checkable} = this.props;

        return (
            <ListItem button dense>
                {checkable &&
                <Checkbox
                    checked={track.selected}
                    tabIndex={-1}
                    disableRipple
                />
                }
                <ListItemText primary={track.title} secondary={track.artist}/>
            </ListItem>
        )
    }
}

TrackListItem.propTypes = {
    track: PropTypes.object.required,
    checkable: PropTypes.bool,
};

export default withStyles(styles)(TrackListItem)