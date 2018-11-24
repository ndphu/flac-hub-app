class NavigationService {
  setLocation = (location) => {
    this.location = location;
  };

  setHistory = (history) => {
    this.history = history;
  };

  goToSearch(query) {
    this.history.push(`/search/q/${query}`);

  }
  
  goToArtistSearch(query) {
    if (query) {
      this.history.push(`/search/byArtist/${encodeURIComponent(query)}`);
    } else {
      this.history.push('/search/byArtist');
    }
  }

  goToPlaylist(id) {
    if (id) {
      this.history.push(`/playlist/${id}`)
    } else {
      this.history.push(`/playlist`)
    }
  }

  goToSettingsPage = () => {
    this.history.push(`/settings`)
  };

  goToAccount = (id) => {
    this.history.push(`/manage/driveAccount/${id}`)
  };

  goToManageDriveAccount() {
    this.history.push(`/manage/driveAccount`)
  }

  goToDownloadPage() {
    this.history.push(`/download`)
  }
}

const navigationService = new NavigationService();

export default navigationService;