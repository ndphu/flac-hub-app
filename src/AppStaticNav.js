import SettingsIcon from '@material-ui/icons/Settings';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import React from 'react';
import navigationService from './service/NavigationService';
import StorageIcon from '@material-ui/icons/Storage'
import DownloadIcon from '@material-ui/icons/CloudDownload'

const staticNav = [
  {text: 'Playlist', icon: <LibraryMusicIcon/>, onClick: () => {navigationService.goToPlaylist()}},
  {text: 'Settings', icon: <SettingsIcon/>, onClick: () => {navigationService.goToSettingsPage()}},
  {text: 'Storage', icon: <StorageIcon/>, onClick: () => {navigationService.goToManageDriveAccount()}},
  {text: 'Download', icon: <DownloadIcon/>, onClick: () => {navigationService.goToDownloadPage()}},
];

export default staticNav;