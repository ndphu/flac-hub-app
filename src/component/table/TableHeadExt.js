import React from 'react';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const tableHeadStyle = theme => ({
  headerRow: {
    //backgroundColor: lighten(theme.palette.primary.light, 0.90)
  }
});

class TableHeadExt extends React.Component {
  render() {
    const {onSelectAllClick, numSelected, rowCount, columns} = this.props;
    const {classes} = this.props;
    return (
      <TableHead className={classes.headerRow}>
        <TableRow>
          <TableCell>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map((column,i) => {
            return (
              <TableCell
                key={column.id}
              >
                {column.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

TableHeadExt.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
};

export default withStyles(tableHeadStyle)(TableHeadExt);