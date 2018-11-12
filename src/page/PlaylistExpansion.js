import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import PlayArrow from "@material-ui/icons/PlayArrow";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";


const styles = theme => ({});

class PlaylistExpansion extends React.Component {

    render() {
        const {playlist, classes} = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography
                        color={'textPrimary'}
                        variant={'h6'}>
                        {playlist.title}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {playlist.tracks && playlist.tracks.map((track, i) => {
                            return (
                                <ListItem key={`key-track-in-playlist-${playlist._id}-${i}`}>
                                    <ListItemIcon>
                                        <PlayArrow/>
                                    </ListItemIcon>
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