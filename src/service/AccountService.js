import api from "../api/Api";


class AccountService {
    getDriveAccounts = () => {
        return api.get("/manage/driveAccount")
    };

    createAccount = (account) => {
        return api.post("/manage/driveAccount", account)
    };

    getAccountById = (id) => {
        return api.get(`/manage/driveAccount/${id}`)
    };

    submitAccountKey = (id, key) => {
      return api.post(`/manage/driveAccount/${id}/key`, btoa(key), true)
    };

}


const accountService = new AccountService();

export default accountService;