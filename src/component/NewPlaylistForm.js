import React from "react";
import TextField from "@material-ui/core/TextField"
import Button from '@material-ui/core/Button'
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class NewPlaylistForm extends React.Component {
    state = {
        playlistType: 'shared',
        playlistTitle: '',
    };
    handleChange = event => {
        this.setState({playlistType: event.target.value});
    };

    onPlaylistTitleChange = event => {
        this.setState({
            playlistTitle: event.target.value,
        })
    };

    render = () => {
        const {onPlaylistSubmit, classes} = this.props;
        return (
            <div>
                <TextField
                    placeholder={'Playlist title'}
                    onChange={this.onPlaylistTitleChange}
                />
                <RadioGroup
                    aria-label={'Type'}
                    className={classes.group}
                    value={this.state.playlistType}>
                    <FormControlLabel value="shared" control={<Radio/>} label="Shared"/>
                    <FormControlLabel value="private" control={<Radio/>} label="Just for me" disabled/>
                </RadioGroup>
                <Button color={'primary'}
                        variant={'contained'}
                        disabled={!this.state.playlistTitle}
                        onClick={() => {
                            onPlaylistSubmit({title: this.state.playlistTitle, type: this.state.playlistType})
                        }}>
                    Save
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(NewPlaylistForm);