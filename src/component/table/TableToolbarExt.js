import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button/Button';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/Add';
import PlayIcon from '@material-ui/icons/PlayArrow';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    addPlaylist: {
        width: 140,
    },
    title: {
        flex: '0 0 auto',
    },
    actionContainer: {
        width: 200,
        textAlign: 'right',
    }
});


class TableToolbarExt extends React.Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleAddToExisting = () => {
        this.setState({anchorEl: null});
    };

    handleSelectCreateNew = () => {
        this.setState({anchorEl: null});
        this.props.onNewPlaylistClick();
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    render = () => {
        const {anchorEl} = this.state;
        const {numSelected, classes, toolbarDefaultText, onPlayAllClick, onPlaySelectedClick} = this.props;

        return (
            <Toolbar
                variant={'dense'}
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subtitle2">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="subtitle2" id="tableTitle">
                            {toolbarDefaultText}
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <div className={classes.actionContainer}>
                            <Tooltip title="Add To Playlist">
                                <IconButton aria-label="Add To Playlist"
                                            onClick={this.handleClick}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Play Selected">
                                <IconButton aria-label="Play Selected"
                                            onClick={onPlaySelectedClick}
                                >
                                    <PlayIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (
                        <Tooltip title="Play All">
                            <IconButton aria-label="Play All"
                                        onClick={onPlayAllClick}
                            >
                                <PlayIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleSelectCreateNew}>Create New</MenuItem>
                    <MenuItem onClick={this.handleAddToExisting}>Add To Existing Playlist</MenuItem>
                </Menu>
            </Toolbar>
        );
    };
}

TableToolbarExt.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};


export default withStyles(toolbarStyles)(TableToolbarExt);