import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import AccountDetailsForm from "./AccountDetailsForm";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import accountService from "../../service/AccountService";

const styles = theme => ({
    space: {
        margin: theme.spacing.unit,
    }
});

class CreateAccountDialog extends React.Component {

    state = {
        completeAccountDetails: false,
        activeStep: 0,
    };

    isFormInvalid = () => {
        if (this.state.activeStep === 0) {
            return !this.state.accountName
        } else if (this.state.activeStep === 1) {
            return !this.state.key
        }
        return false;
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    handleNextClick = () => {
        if (this.state.activeStep === 0) {
            accountService.createAccount({
                name: this.state.accountName,
                desc: this.state.description ? this.state.description : "",
            }).then(account => {
                    this.setState({activeStep: 1, account: account})
                }
            )
        } else if (this.state.activeStep === 1) {
            accountService.submitAccountKey(this.state.account._id, this.state.key).then(account => {
                this.setState({account, activeStep: 2})
            })
        }
    };

    render = () => {
        const {handleClose, classes} = this.props;
        const open = true;
        const {activeStep, completeAccountDetails} = this.state;
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Create Drive Account</DialogTitle>
                <Stepper activeStep={activeStep}>
                    <Step completed={completeAccountDetails}>
                        <StepLabel>Account Details</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Key</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Verify Access</StepLabel>
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
                                label="Key"
                                fullWidth
                                value={this.state.key}
                                onChange={this.handleChange('key')}
                            />
                            <div className={classes.space}/>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"}
                            color={"primary"}
                            disabled={this.isFormInvalid()}
                            onClick={this.handleNextClick}
                    >
                        Next
                    </Button>
                </DialogActions>

            </Dialog>
        )
    }
}


export default withStyles(styles)(CreateAccountDialog);