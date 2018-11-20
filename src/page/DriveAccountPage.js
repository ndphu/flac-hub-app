import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import AccountTable from "../component/account/AccountTable";
import accountService from "../service/AccountService";
import Button from "@material-ui/core/Button/Button";
import Divider from "@material-ui/core/Divider/Divider";
import CreateAccountDialog from "../component/account/CreateAccountDialog";
import navigationService from '../service/NavigationService';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  divider: {
    ...theme.mixins.gutters(),
    marginTop: 8,
    marginBottom: 8,
  }
});


class DriveAccountPage extends React.Component {
  state = {
    accounts: [],
    openCreateAccountDialog: false,
  };

  componentDidMount = () => {
    accountService.getDriveAccounts().then(accounts => this.setState({accounts}))
  };

  handleCreateAccountDialogClose = () => {
    this.setState({openCreateAccountDialog: false})
    accountService.getDriveAccounts().then(accounts => this.setState({accounts}))
  };

  handleRowClick = (account) => {
    navigationService.goToAccount(account._id)
  };

  render = () => {
    const {classes} = this.props;
    const {accounts, openCreateAccountDialog} = this.state;

    return (
      <Paper className={classes.root} elevation={1} square={true}>
        <Typography variant="h5" component="h3" color={"primary"}>
          Storage Account
        </Typography>
        {accounts && accounts.length > 0 &&
        <AccountTable accounts={accounts} onRowClick={this.handleRowClick}/>
        }
        <div className={classes.divider}/>
        <Button variant={"contained"}
                color={"primary"}
                onClick={() => {
                  this.setState({openCreateAccountDialog: true})
                }}>
          Add
        </Button>
        {openCreateAccountDialog &&
        <CreateAccountDialog open={openCreateAccountDialog}
                             handleClose={this.handleCreateAccountDialogClose}
        />}
      </Paper>
    )
  }
}

export default withStyles(styles)(DriveAccountPage)