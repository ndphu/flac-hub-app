import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table/Table';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import EnhancedTableToolbar from './table/EnhancedTableToolbar';
import EnhancedTableHead from './table/EnhancedTableHead';

const styles = theme => ({
  root: {},
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const rows = [
  {id: 'title', label: 'Title'},
  {id: 'artist', label: 'Artist'},
  {id: 'duration', label: 'Duration'},
  {id: 'quality', label: 'Best Quality'},
  {id: 'download', label: 'Download'},
];


class TrackListTable extends React.Component {
  state = {
    selected: [],
    page: 0,
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({selected: this.props.tracks.map(n => n)}));
      return;
    }
    this.setState({selected: []});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render = () => {
    const {classes, tracks, tableTitle} = this.props;
    const {selected,} = this.state;
    return (
      <div className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length}
                              toolbarDefaultText={tableTitle}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={tracks.length}
              columns={rows}
              toolbarDefaultText={tableTitle}
            />
            <TableBody>
              {tracks.map((track, idx) => {
                const isSelected = this.isSelected(track);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, track)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={`key-track-in-table-${idx}`}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected}/>
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {track.title}
                    </TableCell>
                    <TableCell padding="none">{track.artist}</TableCell>
                    <TableCell padding="none">{track.duration}</TableCell>
                    <TableCell padding="none">{track.quality}</TableCell>
                    <TableCell padding="none">{track.download}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

TrackListTable.propTypes = {
  tableTitle: PropTypes.string.isRequired,
};

export default withStyles(styles)(TrackListTable);
