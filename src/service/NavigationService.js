class NavigationService {

    recentSearches = [];

    setLocation = (location) => {
        this.location = location;
    };

    setHistory = (history) => {
        this.history = history;
    };

    goToAccount = (id) => {
        this.history.push(`/account/${id}`)
    };

    goToAccountsPage(page, rowsPerPage) {
        this.history.push(`/accounts?page=${page}&size=${rowsPerPage}`)
    }

    goToVideoView(accountId, fileId) {
        this.history.push(`/view/video?accountId=${accountId}&fileId=${fileId}`)
    }

    goTo = (path) => {
        this.history.push(path);
    };

    goToAccounts = () => {
        this.history.push('/accounts');
    };

    goToLoginPage = () => {
        this.history.push(`/user/login`);
    };

    goToRegister = () => {
        this.history.push(`/user/register`);
    };

    goToUserInfoPage = () => {
        this.history.push(`/user/info`);
    };

    goToProjects = () => {
        this.history.push(`/projects`);
    };

    goToProject = (id) => {
        this.history.push(`/project/${id}`);
    };

    goToSearch = (query, type) => {
        this.history.push(`/search?q=${query}&t=${type}`);
    }
}

const navigationService = new NavigationService();

export default navigationService;