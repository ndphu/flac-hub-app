import {grey300} from 'material-ui/styles/colors';
import ActionSearch from '@material-ui/icons/Search';
import Album from '@material-ui/icons/Album';
import React from 'react';
import navigationService from './service/NavigationService';

const staticNav = [
  {text: 'Playlist', icon: <Album color={grey300}/>, onClick: () => {navigationService.goToPlaylist()}},
  {text: 'Search By Artist', icon: <ActionSearch color={grey300}/>, onClick: () => {navigationService.goToArtistSearch()}},
];

export default staticNav;