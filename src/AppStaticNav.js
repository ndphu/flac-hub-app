import {grey300} from 'material-ui/styles/colors';
import ActionSearch from 'material-ui/svg-icons/action/search';
import React from 'react';
import navigationService from './service/NavigationService';

const staticNav = [
  {text: 'Search By Artist', icon: <ActionSearch color={grey300}/>, onClick: () => {navigationService.goToArtistSearch()}},
];

export default staticNav;