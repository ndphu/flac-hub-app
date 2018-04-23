import {orange800} from 'material-ui/styles/colors';
import {grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeDefault = getMuiTheme({
  palette: {
    primaryColor: orange800,
    primary3Color: orange800,
    accent3Color: orange800,
  },
  appBar: {
    height: 57,
    color: orange800
  },
  drawer: {
    width: 265,
    color: grey900,
  },
  raisedButton: {
    primaryColor: orange800,
  },
  listItem: {
    backgroundColor: orange800,
  },
  textField: {
    focusColor: orange800,
  },
  menuItem: {
    selectedTextColor: orange800,
  }
});


export default themeDefault;