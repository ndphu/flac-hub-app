import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import SearchPage from './page/SearchPage';
import PlaylistPage from './page/PlaylistPage';
import PlaylistDetailsPage from './page/PlaylistDetailsPage';
import DriveAccountPage from "./page/DriveAccountPage";
import DriveAccountDetailsPage from './page/DriveAccountDetailsPage';
import DownloadPage from './page/DownloadPage';
import AlbumsPage from './page/AlbumsPage';
import AlbumDetailsPage from './page/AlbumDetailsPage';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path={'/search/q/:query'} component={SearchPage}/>
      <Route path={'/playlist/:id'} component={PlaylistDetailsPage}/>
      <Route path={'/playlist'} component={PlaylistPage}/>
      <Route path={'/manage/driveAccount/:id'} component={DriveAccountDetailsPage}/>
      <Route path={'/manage/driveAccount'} component={DriveAccountPage}/>
      <Route path={'/download'} component={DownloadPage}/>
      <Route path={'/album/:id'} component={AlbumDetailsPage}/>
      <Route path={'/albums'} component={AlbumsPage}/>
      <Redirect exact={true} from={'/'} to={'/playlist'}/>
    </Switch>
  );
};

export default AppRoutes;
