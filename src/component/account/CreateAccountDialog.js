import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import accountService from "../../service/AccountService";
import Typography from '@material-ui/core/Typography/Typography';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

const styles = theme => ({
  space: {
    margin: theme.spacing.unit,
  }
});

class CreateAccountDialog extends React.Component {

  state = {
    activeStep: 0,
  };

  isFormInvalid = () => {
    if (this.state.activeStep === 0) {
      return !this.state.accountName
    } else if (this.state.activeStep === 1) {
      return this.isInvalidKeyJSON()
    }
    return false;
  };

  isInvalidKeyJSON = () => {
    try {
      JSON.parse(this.state.key);
      return false;
    } catch (e) {
      return true;
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleNextClick = () => {
    if (this.state.activeStep === 0) {
      this.setState({activeStep: 1});
    } else if (this.state.activeStep === 1) {
      this.setState({activeStep: 2, loading: true});
      accountService.createAccount({
        name: this.state.accountName,
        desc: this.state.description ? this.state.description : "",
        key: btoa(JSON.stringify(JSON.parse(this.state.key))),
      }).then(resp => {
          if (resp.code >= 400) {
            this.setState({account: null, loading: false, error: resp})
          } else  {
            this.setState({account: resp, loading: false, accountError: false})
          }

        }
      ).catch(err => {
        this.setState({loading: false, error: true})
      });
    }
  };

  render = () => {
    const { handleClose, classes, open } = this.props;
    const {activeStep, loading, error} = this.state;
    return (
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Create Drive Account</DialogTitle>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel optional={
              <Typography variant="caption">Name and description</Typography>
            }>
              Account Details
            </StepLabel>
          </Step>
          <Step>
            <StepLabel optional={
              <Typography variant="caption">Secret key json</Typography>
            }>Key</StepLabel>
          </Step>
          <Step>
            <StepLabel optional={
              <Typography variant="caption">Access validation</Typography>
            }>Verify Access</StepLabel>
          </Step>
        </Stepper>
        <DialogContent>
          {activeStep === 0 && (
            <div>
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
                multiline
                rows={4}
                rowsMax={8}
                label="Description"
                fullWidth
                value={this.state.description}
                onChange={this.handleChange('description')}
              />
              <div className={classes.space}/>
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <TextField
                required
                autoFocus
                multiline
                rows={8}
                rowsMax={12}
                label="Key"
                fullWidth
                value={this.state.key}
                onChange={this.handleChange('key')}
              />
              <div className={classes.space}/>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              {loading && <LinearProgress/>}
              {!loading && !error &&
              <div>
                <Typography variant={'h6'}>Account created successfully</Typography>
              </div>}
              {!loading && error &&
              <div>
                <Typography variant={'h6'}>Fail to create account</Typography>
                <Typography variant={'body1'}>{error.msg}</Typography>
                <Typography variant={'body1'}>{error.err}</Typography>
              </div>}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button color={'primary'}
                  onClick={handleClose}
          >
            Cancel
          </Button>
          {(activeStep === 0 || activeStep === 1) ? (
            <Button variant={"contained"}
                    color={"primary"}
                    disabled={this.isFormInvalid()}
                    onClick={this.handleNextClick}
            >
              Next
            </Button>
          ) : (
            <Button variant={"contained"}
                    color={"primary"}
                    disabled={loading}
                    onClick={handleClose}
            >
              Finish
            </Button>
          )}
        </DialogActions>

      </Dialog>
    )
  }
}


export default withStyles(styles)(CreateAccountDialog);