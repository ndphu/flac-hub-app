import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import HomePage from './page/HomePage';
import SearchPage from './page/SearchPage';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path={'/home'} component={HomePage}/>
      <Route path={'/search/q/:query/page/:page'} component={SearchPage}/>
      <Redirect exact={true} from={'/'} to={'/home'}/>
    </Switch>
  );
};

export default AppRoutes;
