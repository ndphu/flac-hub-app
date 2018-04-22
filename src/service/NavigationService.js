class NavigationService {
  setLocation = (location) => {
    this.location = location;
  };

  setHistory = (history) => {
    this.history = history;
  };

  goToSearch(query) {
    this.history.push(`/search/q/${query}/page/1`);

  }
}

const navigationService = new NavigationService();

export default navigationService;