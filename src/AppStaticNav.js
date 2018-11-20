import SettingsIcon from '@material-ui/icons/Settings';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import React from 'react';
import navigationService from './service/NavigationService';
import StorageIcon from '@material-ui/icons/Storage'

const staticNav = [
  {text: 'Playlist', icon: <LibraryMusicIcon/>, onClick: () => {navigationService.goToPlaylist()}},
  {text: 'Settings', icon: <SettingsIcon/>, onClick: () => {navigationService.goToSettingsPage()}},
  {text: 'Storage', icon: <StorageIcon/>, onClick: () => {navigationService.goToManageDriveAccount()}},
];

export default staticNav;