import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import accountService from '../service/AccountService';
import Typography from '@material-ui/core/Typography/Typography';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import DriveFileTable from '../component/account/DriveFileTable';
import {humanFileSize} from "../utils/StringUtils";
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton/IconButton';
import downloadService from '../service/DownloadService';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  spacer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  quotaContainer: {
    display: "flex",
    alignItems: "center",
    height: 56,
  },
  refreshQuotaButton: {
    margin: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit,
  }
});

class DriveAccountDetailsPage extends React.Component {

  state = {
    files: [],
    page: 1,
    size: 50,
  };

  componentDidMount = () => {
    this.load();
  };

  handleFileClick = (file) => {

  };

  handleDownloadClick = (file) => {
    accountService.getDownloadLink(this.state.account._id, file.id).then(resp => {
      const link = resp.link;
      downloadService.downloadDriveFile(file.name, link);
    });
  };

  load = () => {
    accountService.getAccountById(this.props.match.params.id)
      .then(account => {
        this.setState({account});
        accountService.getAccountFiles(account._id, this.state.page, this.state.size)
          .then(files => {
            this.setState({files})
          })
      })
  };

  refreshQuota = () => {
    this.setState({refreshingQuota: true});
    accountService.refreshQuota(this.props.match.params.id)
      .then(account => {
        this.setState({account, refreshingQuota: false});
      }).catch(() => {
      this.setState({refreshingQuota: false});
    });
  };

  render = () => {
    const {classes} = this.props;
    const {account, files, refreshingQuota} = this.state;
    return (
      <Paper className={classes.root} elevation={1} square={true}>
        {account &&
        <div>
          <Typography variant="h5" component="h3" color={"primary"}>
            {account.name}
          </Typography>
          <div className={classes.spacer}/>
          <div className={classes.quotaContainer}>
            {!refreshingQuota ? <Typography variant="subtitle1" color={'textPrimary'}>
              Usage: {humanFileSize(account.usage)} / {humanFileSize(account.limit)}
            </Typography> : <Typography variant="subtitle1" color={'textPrimary'}>
              Refreshing...
            </Typography>
            }

            {!refreshingQuota &&
            <IconButton color={'secondary'}
                        onClick={this.refreshQuota}
            >
              <RefreshIcon/>
            </IconButton>
            }
          </div>
          <div className={classes.spacer}/>
          <LinearProgress color={'secondary'}
                          variant={'determinate'}
                          value={parseFloat(account.usage * 100 / account.limit)}
          />
          <div className={classes.spacing}/>
          <DriveFileTable files={files}
                          onRowClick={this.handleFileClick}
                          onDownloadClick={this.handleDownloadClick}
          />
        </div>
        }
      </Paper>
    );
  }
}

DriveAccountDetailsPage.PropTypes = {};

export default withStyles(styles)(DriveAccountDetailsPage);
