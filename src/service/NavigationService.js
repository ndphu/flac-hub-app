class NavigationService {

  recentSearches = []

  setLocation = (location) => {
    this.location = location;
  };

  setHistory = (history) => {
    this.history = history;
  };

  goToSearch = (query) => {
    this.recentSearches.push(query);
    this.history.push(`/search/q/${query}`);

  };

  goToPlaylist = (id) => {
    if (id) {
      this.history.push(`/playlist/${id}`)
    } else {
      this.history.push(`/playlist`)
    }
  };

  goToSettingsPage = () => {
    this.history.push(`/settings`)
  };

  goToAccount = (id) => {
    this.history.push(`/manage/driveAccount/${id}`)
  };

  goToManageDriveAccount = () => {
    this.history.push(`/manage/driveAccount`)
  };

  goToDownloadPage = () => {
    this.history.push(`/download`)
  };

  goToAlbums = () => {
    this.history.push(`/albums`)
  };

  goToArtist = () => {
    this.history.push(`/artists`)
  };

  goToLastSearch = () => {
    if (this.recentSearches.length === 0) {
      this.goToSearch("queen")
    } else {
      this.goToSearch(this.recentSearches[this.recentSearches.length - 1])
    }
  }

  goToAlbum = (id) => {
    this.history.push(`/album/${id}`)
  }
}

const navigationService = new NavigationService();

export default navigationService;