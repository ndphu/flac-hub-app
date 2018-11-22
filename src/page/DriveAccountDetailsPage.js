import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import accountService from '../service/AccountService';
import Typography from '@material-ui/core/Typography/Typography';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import DriveFileTable from '../component/account/DriveFileTable';
import api from '../api/Api';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  spacer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
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
      console.log(resp);
      api.fetchBlob(link).then(buffer => {
        const blob = new Blob([buffer], {type: "octet/stream"});
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        const dummyLink = document.createElement('a');
        dummyLink.href = url;
        dummyLink.download = file.name;
        dummyLink.target = "__blank";
        dummyLink.click();
      })
    })
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

  render = () => {
    const {classes} = this.props;
    const {account, files} = this.state;
    const quota = account ? account.quota : null;

    return (
      <Paper className={classes.root} elevation={1} square={true}>
        {account &&
        <div>
          <Typography variant="h5" component="h3" color={"primary"}>
            {account.name}
          </Typography>
          <div className={classes.spacer}/>
          <Typography variant="body1" color={'textPrimary'}>
            Usage: {quota.usage} / {quota.limit} ({quota.percent}%)
          </Typography>
          <div className={classes.spacer}/>
          <LinearProgress color={'secondary'}
                          variant={'determinate'}
                          value={parseFloat(account.quota.percent)}
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
