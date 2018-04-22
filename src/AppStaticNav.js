import React from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import {grey300} from 'material-ui/styles/colors';

const staticNav = [
  {text: 'Home', icon: <ActionHome color={grey300}/>, onClick: () => {}},
  {text: 'Search', icon: <AddIcon color={grey300}/>, onClick: () => {}},
];

export default staticNav;