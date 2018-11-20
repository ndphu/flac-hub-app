import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import TextField from "@material-ui/core/TextField/TextField";


const styles = theme => ({});

class AccountDetailsForm extends React.Component {
    render = () => {
      return (
          <div>
              <TextField
                  autoFocus
                  label="Name"
                  fullWidth
              />
          </div>
      )
    };
}

export default withStyles(styles)(AccountDetailsForm);