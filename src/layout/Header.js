import React from 'react';
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import {white} from 'material-ui/styles/colors';
import SearchBox from './SearchBox';

class Header extends React.Component {
  
  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;
    
    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 54,
      },
      menuButton: {
        marginLeft: 16
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };
    
    return (
      <div>
        <AppBar
          style={{...styles, ...style.appBar}}
          title={
            <SearchBox searchHint={'Search by song name, singers..'}/>
          }
          iconElementLeft={
            <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
              <Menu color={white}/>
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu color={white}
                        iconButtonElement={
                          <IconButton><ViewModule color={white}/></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              </IconMenu>
            </div>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;