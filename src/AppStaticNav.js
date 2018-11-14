import ActionSearch from '@material-ui/icons/Search';
import Album from '@material-ui/icons/Album';
import React from 'react';
import navigationService from './service/NavigationService';

const staticNav = [
  {text: 'Playlist', icon: <Album/>, onClick: () => {navigationService.goToPlaylist()}},
  {text: 'Search By Artist', icon: <ActionSearch/>, onClick: () => {navigationService.goToArtistSearch()}},
];

export default staticNav;