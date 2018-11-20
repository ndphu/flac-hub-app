import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Table from "@material-ui/core/Table/Table";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
  tableRow: {
    cursor: 'pointer',
  }
});

class AccountTable extends React.Component {
  render = () => {
    const {classes, accounts, onRowClick} = this.props;


    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Client Id</TableCell>
            <TableCell>Client Email</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map(account => {
            return (
              <TableRow key={account._id}
                        hover
                        className={classes.tableRow}
                        onClick={() => {onRowClick && onRowClick(account)}}
              >
                <TableCell component="th"
                           scope="row"
                >
                  {account.name}
                </TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>{account.clientId}</TableCell>
                <TableCell>{account.clientEmail}</TableCell>
                <TableCell>{account.desc}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(AccountTable);