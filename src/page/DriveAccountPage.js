import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import AccountTable from "../component/account/AccountTable";
import accountService from "../service/AccountService";
import Button from "@material-ui/core/Button/Button";
import navigationService from '../service/NavigationService';
import CreateAccount from '../component/account/CreateAccount';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';


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
  },
  footer: {
    width: "100%"
  }
});


class DriveAccountPage extends React.Component {
  state = {
    accounts: [],
    openCreateAccountDialog: false,
    page: 0,
    rowsPerPage: 10,
    totalAccount: 0,
    loading: false,
  };

  componentDidMount = () => {
    this.setState({loading: true});
    accountService.getDriveAccounts(this.state.page + 1, this.state.rowsPerPage)
      .then(resp => this.setState(
        {
          accounts: resp.accounts,
          totalAccount: resp.total,
          page: resp.page - 1,
          rowsPerPage: resp.size,
          loading: false,
        }))
  };

  handleCreateAccountDialogClose = () => {
    this.setState({openCreateAccountDialog: false});
    accountService.getDriveAccounts().then(accounts => this.setState({accounts}))
  };

  handleRowClick = (account) => {
    navigationService.goToAccount(account._id)
  };

  handleChangePage = (e, page) => {
    this.setState({loading: true});
    accountService.getDriveAccounts(page + 1, this.state.rowsPerPage)
      .then(resp => this.setState({
        accounts: resp.accounts,
        totalAccount: resp.total,
        page: resp.page - 1,
        rowsPerPage: resp.size,
        loading: false,
      }))
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({loading: true});
    const rowsPerPage = parseInt(event.target.value);
    accountService.getDriveAccounts(1, rowsPerPage)
      .then(resp => this.setState({
        accounts: resp.accounts,
        totalAccount: resp.total,
        page: resp.page - 1,
        rowsPerPage: resp.size,
        loading: false,
      }))
  };

  render = () => {
    const {classes} = this.props;
    const {accounts, openCreateAccountDialog, rowsPerPage, page, totalAccount, loading} = this.state;

    return (
      <Paper className={classes.root} elevation={1} square={true}>
        <Typography variant="h5" component="h3" color={"primary"}>
          Storage Account
        </Typography>
        {accounts && accounts.length > 0 &&
        <AccountTable accounts={accounts}
                      onRowClick={this.handleRowClick}
        />
        }
        <TableFooter className={classes.footer}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={totalAccount}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
        {loading && <LinearProgress/>}
        <div className={classes.divider}/>
        <Button variant={"contained"}
                color={"primary"}
                onClick={() => {
                  this.setState({openCreateAccountDialog: true})
                }}>
          Add
        </Button>
        {openCreateAccountDialog &&
        <CreateAccount open={openCreateAccountDialog}
                       handleClose={this.handleCreateAccountDialogClose}
        />}
      </Paper>
    )
  }
}

export default withStyles(styles)(DriveAccountPage)