import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import staticNav from '../AppStaticNav';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '@material-ui/core/List/List';


const styles = theme => {

};

class AppDrawer extends React.Component {
  render = () => {
    return (
      <List>
        {staticNav.map((item, index) => (
          <ListItem button
                    key={`item.text-${item.text}-${index}`}
                    onClick={item.onClick}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text}/>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(AppDrawer);