import SettingsIcon from '@material-ui/icons/Settings';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import React from 'react';
import navigationService from './service/NavigationService';

const staticNav = [
  {text: 'Playlist', icon: <LibraryMusicIcon/>, onClick: () => {navigationService.goToPlaylist()}},
  {text: 'Settings', icon: <SettingsIcon/>, onClick: () => {navigationService.goToArtistSearch()}},
];

export default staticNav;