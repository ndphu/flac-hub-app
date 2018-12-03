import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import albumService from '../service/AlbumService';
import contentService from '../service/ContentService';
import {withWidth} from '@material-ui/core';
import navigationService from '../service/NavigationService';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    albumDetails: {
        marginTop: theme.spacing.unit,
    },
    gridCell: {
        maxWidth: 160,
        minWidth: 160,
        width: 160,
        maxHeight: 220,
        minHeight: 220,
        height: 220,
        marginRight: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    cover: {
        maxWidth: 160,
        minWidth: 160,
        width: 160,
        maxHeight: 160,
        minHeight: 160,
        height: 160,
        cursor: "pointer",
    }
});

class AlbumsPage extends React.Component {
    state = {
        albums: []
    };

    componentDidMount = () => {
        albumService.getRandomAlbums(32).then(albums => {
            this.setState({albums: albums});
        })
    };

    handleListenAlbumClick = (album) => {
        console.log("listen", album)
    };

    handleAlbumClick = (album) => {
        navigationService.goToAlbum(album._id);
    };

    render = () => {
        const {albums} = this.state;
        const {classes, width} = this.props;
        let col = 2;
        switch (width) {
            case "sm":
                col = 3;
                break;
            case "md":
                col = 4;
                break;
            case "lg":
                col = 6;
                break;
            case "xl":
                col = 8;
                break;
        }

        const albumItem = albums.map(album => (
            <Grid key={`album-card-${album._id}`}
                  item
                  wrap={'nowrap'}
                  xs={1}
                  className={classes.gridCell}>
                <Card className={classes.cover}>
                    <CardActionArea onClick={() => {
                        this.handleAlbumClick(album)
                    }}>
                        <CardMedia
                            className={classes.cover}
                            image={contentService.getAlbumCoverUrl(album._id)}
                        />
                    </CardActionArea>
                </Card>
                <div className={classes.albumDetails}>
                    <Typography variant="subtitle1" color={'textPrimary'} noWrap>
                        {album.title}
                    </Typography>
                    <Typography variant={'subtitle2'} color={'textSecondary'} noWrap>
                        {album.artist}
                    </Typography>
                </div>
            </Grid>
        ));
        return (
            <div className={classes.root}>
                <Grid container
                      spacing={24}
                >
                    {albumItem}
                </Grid>
            </div>
        );
    }
}

AlbumsPage.PropTypes = {};

export default withStyles(styles)(withWidth()(AlbumsPage));
