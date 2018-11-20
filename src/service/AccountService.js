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
    return api.post(`/manage/driveAccount/${id}/key`, btoa(JSON.stringify(JSON.parse(key))), true)
  };

  getAccountFiles = (id, page, size) => {
    return api.get(`/manage/driveAccount/${id}/files?page=${page}&size=${size}`)
  };

  getDownloadLink = (id, fileId) => {
    return api.get(`/manage/driveAccount/${id}/file/${fileId}/download`)
  };
}


const accountService = new AccountService();

export default accountService;