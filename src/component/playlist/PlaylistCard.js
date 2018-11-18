import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import CardActions from '@material-ui/core/CardActions/CardActions';
import Button from '@material-ui/core/Button/Button';
import playService from '../../service/PlayService';

const styles = {
  card: {
    margin: 4,
  },
  title: {
    cursor: 'pointer',
  },
  pos: {
    marginBottom: 4,
  },
};

class PlaylistCard extends React.Component {
  render = () => {
    const {playlist, classes, onPlaylistCardClick} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="title"
                      color="primary"
                      className={classes.title}
                      noWrap
                      onClick={() => {onPlaylistCardClick(playlist)}}
            >
            {playlist.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {`${playlist.tracks.length} songs`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color={'secondary'}
                  onClick={() => {
                    playService.playTrackInPlaylist(playlist, 0)
                  }}
          >
            Listen
          </Button>
        </CardActions>
      </Card>
    );
  }
}

PlaylistCard.PropTypes = {};

export default withStyles(styles)(PlaylistCard);
