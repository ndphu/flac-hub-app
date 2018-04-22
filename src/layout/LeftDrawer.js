import {List, ListItem} from 'material-ui';
import Drawer from 'material-ui/Drawer';
import {typography} from 'material-ui/styles';
import {blue300, orange800, grey300} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';


const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: typography.textFullWhite,
    fontWeight: typography.fontWeightLight,
    backgroundColor: orange800,
    paddingLeft: 40,
    paddingTop: 12,
    height: 40,
  },
  menuItem: {
    color: grey300,
    fontSize: 15
  },
};

function getListItem(menu, index, isSubmenu) {
  let childItems = [];
  if (menu.children && menu.children.length > 0) {
    menu.children.forEach((childMenu, idx) => {
      childItems.push(getListItem(childMenu, idx, true));
    });
  }
  return <ListItem
    className={'drawer-list-item'}
    key={index}
    style={styles.menuItem}
    primaryText={menu.text}
    leftIcon={isSubmenu ? null : menu.icon}
    nestedItems={childItems}
    primaryTogglesNestedList={true}
    hoverColor={blue300}
    onClick={menu.onClick}
  />;
}

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: props.navDrawerOpen,
      items: [],
    };
  }

  componentDidMount = () => {
    if (this.props.menus) {
      this.setState({
        items: this.props.menus.map((menu, index) => getListItem(menu, index))
      });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.navDrawerOpen !== this.state.navDrawerOpen) {
      this.setState({
        navDrawerOpen: nextProps.navDrawerOpen,
      });
    }
    if (nextProps.menus && this.state.items.length === 0) {
      this.setState({
        items: nextProps.menus.map((menu, index) => getListItem(menu, index))
      });
    }
  };


  render = () => {
    return (
      <Drawer
        docked={true}
        open={this.state.navDrawerOpen}>
        <div style={styles.logo}>
          FLAG Hub
        </div>
        <div style={{display: 'flex', maxHeight: 450}}>
          <List style={{width: '100%'}}>
            {this.state.items}
          </List>
        </div>
      </Drawer>
    );
  }
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
