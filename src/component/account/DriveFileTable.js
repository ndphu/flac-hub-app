import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';

const styles = theme => ({
  tableRow: {
    cursor: 'pointer',
  }
});

class DriveFileTable extends React.Component {

  render = () => {
    const {classes, files, onRowClick} = this.props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Key</TableCell>
            <TableCell>Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map(file => {
            return (
              <TableRow key={file.id}
                        hover
                        className={classes.tableRow}
                        onClick={() => {onRowClick && onRowClick(file)}}
              >
                <TableCell component="th"
                           scope="row"
                >
                  {file.name}
                </TableCell>
                <TableCell>{file.id}</TableCell>
                <TableCell>{file.size}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

DriveFileTable.PropTypes = {};

export default withStyles(styles)(DriveFileTable);
