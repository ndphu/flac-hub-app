import SettingsIcon from '@material-ui/icons/Settings';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import React from 'react';
import navigationService from './service/NavigationService';
import StorageIcon from '@material-ui/icons/Storage'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import AlbumIcon from '@material-ui/icons/Album'
import PersonIcon from '@material-ui/icons/Person'
import SearchIcon from '@material-ui/icons/Search'

const staticNav = [
  {text: 'Playlist', icon: <LibraryMusicIcon/>, onClick: () => {navigationService.goToPlaylist()}},
  {text: 'Search', icon: <SearchIcon/>, onClick: () => {navigationService.goToLastSearch()}},
  {text: 'Albums', icon: <AlbumIcon/>, onClick: () => {navigationService.goToAlbums()}},
  {text: 'Artists', icon: <PersonIcon/>, onClick: () => {navigationService.goToArtist()}},
  {text: 'Storage', icon: <StorageIcon/>, onClick: () => {navigationService.goToManageDriveAccount()}},
  {text: 'Downloads', icon: <DownloadIcon/>, onClick: () => {navigationService.goToDownloadPage()}},
];

export default staticNav;