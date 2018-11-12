import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlaylistList from "../component/PlaylistList";
import NewPlaylistForm from "../component/NewPlaylistForm";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class AddToPlaylistDialog extends React.Component {
    state = {playlist: [], expanded: 'new'};

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    addNewPlaylist = () => {

    };

    handlePlaylistSelected = (playlist) => {

    };

    handleSubmitPlaylist = (playlist) => {

    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const {classes, onCreateNewPlaylist, ...other} = this.props;
        const {expanded} = this.state;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Add Songs To Playlist</DialogTitle>
                <DialogContent>
                    <ExpansionPanel
                        style={{marginTop: 4}}
                        onChange={this.handleChange('new')}
                        expanded={expanded === 'new'}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>Create New Playlist</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <NewPlaylistForm onPlaylistSubmit={onCreateNewPlaylist}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        expanded={expanded === 'existing'}
                        onChange={this.handleChange('existing')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>Select Existing Playlist</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <PlaylistList onPlaylistSelected={this.handlePlaylistSelected}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddToPlaylistDialog);