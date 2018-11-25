import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import accountService from '../../service/AccountService';

const styles = theme => ({
  space: {
    margin: theme.spacing.unit,
  },
});

class CreateAccount extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  isFormInvalid = () => {
    return this.state.accountName !== undefined && this.isValidKeyJSON()
  };

  isValidKeyJSON = () => {
    try {
      JSON.parse(this.state.key);
      return true;
    } catch (e) {
      return false;
    }
  };

  handleSaveClick = () => {
    accountService.createAccount({
      name: this.state.accountName,
      desc: this.state.description ? this.state.description : "",
      key: btoa(JSON.stringify(JSON.parse(this.state.key))),
    }).then(() => {
      this.props.handleClose();
    })
  };

  render = () => {
    const {handleClose, classes, open} = this.props;
    return (
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Create Drive Account</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            label="Name"
            fullWidth
            value={this.state.accountName}
            onChange={this.handleChange('accountName')}
          />
          <div className={classes.space}/>
          <TextField
            required
            multiline
            rows={8}
            rowsMax={12}
            label="Key"
            fullWidth
            value={this.state.key}
            onChange={this.handleChange('key')}
          />
        </DialogContent>
        <DialogActions>
          <Button color={'primary'}
                  onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant={"contained"}
                  color={"primary"}
                  disabled={!this.isFormInvalid()}
                  onClick={this.handleSaveClick}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreateAccount.PropTypes = {};

export default withStyles(styles)(CreateAccount);
