import {blue800, grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeDefault = getMuiTheme({
  palette: {
    primaryColor: blue800,
    primary3Color: blue800,
    accent3Color: blue800,
  },
  appBar: {
    height: 57,
    color: blue800
  },
  drawer: {
    width: 265,
    color: grey900,
  },
  raisedButton: {
    primaryColor: blue800,
  },
  listItem: {
    backgroundColor: blue800,
  },
  textField: {
    focusColor: blue800,
  },
  menuItem: {
    selectedTextColor: blue800,
  }
});


export default themeDefault;