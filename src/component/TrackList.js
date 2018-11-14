import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import TrackListItem from "./TrackListItem";
import Switch from "@material-ui/core/Switch/Switch";

const styles = theme => {
};

class TrackList extends React.Component {
    state = {enableCheckable: false};

    switchCheckable = () => {this.setState({enableCheckable: !this.state.enableCheckable})};

    render = () => {
        const {tracks, checkable} = this.props;
        const {enableCheckable} = this.state;
        return (
            <div>
                <Switch
                    checked={enableCheckable}
                    onChange={this.switchCheckable()}
                    value="checkedA"
                />
                <List>
                    {tracks.length > 0 && tracks.map((track, i) =>
                        <TrackListItem track={track}
                                       checkable={checkable}
                                       key={`key-track-list-item-${i}`}/>)
                    }
                </List>
            </div>
        )
    }
}

TrackList.propTypes = {
    tracks: PropTypes.array.isRequired,
    checkable: PropTypes.bool.isRequired,
};


export default withStyles(styles)(TrackList);