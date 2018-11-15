import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import HomePage from './page/HomePage';
import SearchPage from './page/SearchPage';
import PlaylistPage from './page/PlaylistPage';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path={'/home'} component={HomePage}/>
      <Route path={'/search/q/:query'} component={SearchPage}/>
      <Route path={'/playlist/'} component={PlaylistPage}/>
      <Redirect exact={true} from={'/'} to={'/home'}/>
    </Switch>
  );
};

export default AppRoutes;
