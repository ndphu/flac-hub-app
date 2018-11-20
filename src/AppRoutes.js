import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import SearchPage from './page/SearchPage';
import PlaylistPage from './page/PlaylistPage';
import PlaylistDetailsPage from './page/PlaylistDetailsPage';
import AdminPage from "./page/DriveAccountPage";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path={'/search/q/:query'} component={SearchPage}/>
            <Route path={'/playlist/:id'} component={PlaylistDetailsPage}/>
            <Route path={'/playlist'} component={PlaylistPage}/>
            <Route path={'/manage/driveAccount'} component={AdminPage}/>
            <Redirect exact={true} from={'/'} to={'/playlist'}/>
        </Switch>
    );
};

export default AppRoutes;
