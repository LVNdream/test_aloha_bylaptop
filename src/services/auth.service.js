import axios from "axios";

class AuthService {
  // constructor(baseUrl = "/api") {
  //     this.api = createApiClient(baseUrl);
  // }

  async getStatus() {
    return await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/status/get",
    });
  }
  async getMajoring() {
    return await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/majoring/get",
    });
  }

  async getUserByMajoring(majoring_id) {
    return await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/user/getbymajoring/${majoring_id}`,
    });
  }

  async register(data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/user/signup",
      data,
    });
  }
  async login(data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/user/login",
      data,
    });
  }
  async getProject() {
    return await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/project/get",
    });
  }
  async logout(accesstoken) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/logout",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }
  async addProject(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/project/add",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async addTask(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/project/addtask",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async addUserInTask(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/task/addworker",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async updateStatus(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/task/updatestatus",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async updateDealine(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/task/updatedealine",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async deleteWorkerInTask(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/task/deleteworker",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async deleteTaskInProject(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/task/delete",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async getTaskById(id) {
    return await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/mytask/${id}`,
    });
  }

  async updatePermission(accesstoken, data) {
    return await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/task/updatepermission",
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }

  async getUser() {
    return await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/management",
    });
  }
}

export default new AuthService();
