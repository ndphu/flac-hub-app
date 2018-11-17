import React from 'react';
import playlistService from '../service/PlaylistService';
import withStyles from '@material-ui/core/styles/withStyles';
import TrackListTable from '../component/TrackListTable';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import CardActions from '@material-ui/core/CardActions/CardActions';
import Typography from '@material-ui/core/Typography/Typography';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },

  card :{
    marginBottom: 2
  },
});

class PlaylistDetailsPage extends React.Component {
  state = {};

  componentDidMount = () => {
    this.loadPlaylist(this.props.match.params.id);
  };

  componentWillReceiveProps = (nextProps) => {
    const selectedId = nextProps.match.params.id;
    console.log(nextProps);
    this.setState({selectedId: selectedId})
  };

  loadPlaylist = (id) => {
    playlistService.getPlaylist(id).then((playlist) => {
      this.setState({playlist: playlist})
    })
  };

  render = () => {
    const {classes} = this.props;
    const {playlist} = this.state;
    return (
      <div className={classes.root}>
        {playlist &&
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="headline" >
              {playlist.title}
            </Typography>
            <TrackListTable playlist={playlist} tracks={playlist.tracks}/>
          </CardContent>
          <CardActions/>
        </Card>
        }
      </div>
    )
  }
}

export default withStyles(styles)(PlaylistDetailsPage);